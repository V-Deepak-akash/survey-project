const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

// In-memory storage for vote counts
let voteCounts = { true: 0, false: 0 };

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the 'public' folder

// Serve the index.html file on the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle vote submission
app.post('/submit-vote', (req, res) => {
    const vote = req.body.vote;

    if (vote === 'true') {
        voteCounts.true++;
    } else if (vote === 'false') {
        voteCounts.false++;
    }

    // Send back the updated vote counts, with keys the frontend expects
    res.json({
        trueVotes: voteCounts.true,
        falseVotes: voteCounts.false
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
