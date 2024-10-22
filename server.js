const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// In-memory storage for vote counts (you can replace this with a database in a real application)
let voteCounts = { true: 0, false: 0 };

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from 'public' directory

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html')); // Serve the home page
});

app.get('/survey1', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'survey1.html')); // Serve Survey 1
});

app.get('/survey2', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'survey2.html')); // Serve Survey 2
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html')); // Serve Contact Us page
});

// Handle vote submission
app.post('/submit-vote', (req, res) => {
    const { vote, amount } = req.body;

    if (vote === 'true') {
        voteCounts.true++;
    } else if (vote === 'false') {
        voteCounts.false++;
    }

    const totalVotes = voteCounts.true + voteCounts.false;
    const truePercentage = totalVotes ? ((voteCounts.true / totalVotes) * 100).toFixed(2) : 0;
    const falsePercentage = totalVotes ? ((voteCounts.false / totalVotes) * 100).toFixed(2) : 0;

    // Send back the updated vote counts and percentages
    res.json({
        trueVotes: voteCounts.true,
        falseVotes: voteCounts.false,
        truePercentage,
        falsePercentage
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
