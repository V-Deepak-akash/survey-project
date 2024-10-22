const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// In-memory storage for vote counts (you can replace this with a database in a real application)
let voteCounts = { true: 0, false: 0 };

app.use(bodyParser.json());
app.use(express.static('public')); // Serve the HTML/CSS/JS files from 'public' directory

// Handle vote submission
app.post('/submit-vote', (req, res) => {
    const vote = req.body.vote;

    if (vote === 'true') {
        voteCounts.true++;
    } else if (vote === 'false') {
        voteCounts.false++;
    }

    // Send back the updated vote counts
    res.json(voteCounts);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
