'use strict';

const app = require( 'express' )();
const path = require('path');

const db = require('../db.js')(path.join(__dirname, '../db.db'))

// Get partner's topic from folder name
let topic = path.basename(path.join(__dirname, '/..'))

// Sample endpoint that sends the partner's name
app.get('/topic', function (req, res) {
    // Send it as a JSON object
    res.json({ 'topic': topic });
});

app.get('/vote', async function (req, res) {
    const votes = await db.Vote.getAll();
    res.json(votes);
});

app.post('/vote', async function (req, res) {
    await db.Vote.addVote(req.id);
});

// Export our API
module.exports = app;
