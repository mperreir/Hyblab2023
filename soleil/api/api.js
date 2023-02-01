'use strict';

const express = require('express');
const app = express();
const addresser = require('addresser');

app.use(express.json())

// Sample endpoint that sends the partner's name
app.get('/topic', function (req, res) {
    let topic;

    // Get partner's topic from folder name
    topic = path.basename(path.join(__dirname, '/..'))
    // Send it as a JSON object
    res.json({ 'topic': topic });
});

app.get('/addressInfo', function (req, res) {
    let address = req.body['address'];

    density = 0;

    res.json({address, 'density': density});
});

// Export our API
module.exports = app;
