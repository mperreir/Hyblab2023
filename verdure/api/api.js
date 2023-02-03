'use strict';

const app = require('express')();
const path = require('path');


// Sample endpoint that sends the partner's name
app.get('/topic', function (req, res) {
    let topic;

    // Get partner's topic from folder name
    topic = path.basename(path.join(__dirname, '/..'))
    // Send it as a JSON object
    res.json({'topic': topic});
});

const prompts = {
    1: {
        "question": "This is the</br> first question",
        "choices": [{
            "prompt": "This is the first choice of the first question",
            "positive": ["First positive effect", "Second positive effect"],
            "negative": ["First negative effect", "Second negative effect"],
            "explication": "This is the explication"
        },
            {
                "prompt": "This is the second choice of the first question",
                "positive": ["First positive effect", "Second positive effect"],
                "negative": ["First negative effect", "Second negative effect"],
                "explication": "This is the explication"
            }],
        "nextQuestion": 2
    },
    2: {
        "question": "This is the second question",
        "choices": [{
            "prompt": "This is the first choice of the second question",
            "positive": ["First positive effect", "Second positive effect"],
            "negative": ["First negative effect", "Second negative effect"],
            "explication": "This is the explication"
        },
            {
                "prompt": "This is the second choice of the second question",
                "positive": ["First positive effect", "Second positive effect"],
                "negative": ["First negative effect", "Second negative effect"],
                "explication": "This is the explication"
            }],
        "nextQuestion": null
    }
}

app.get('/question/:questionId', function (req, res) {
    const questionId = parseInt(req?.params?.questionId, 10);
    const data = prompts[questionId];
    res.json(data);
});

// Export our API
module.exports = app;
