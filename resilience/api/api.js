'use strict';

const app = require('express')();
const path = require('path');

const db = require('../db.js')(path.join(__dirname, '../db.db'))

// Get partner's topic from folder name
let topic = path.basename(path.join(__dirname, '/..'))

// Sample endpoint that sends the partner's name
app.get('/topic', function (req, res) {
    // Send it as a JSON object
    res.json({ 'topic': topic });
});

// Get all votes
app.get('/vote', async function (req, res) {
    const votes = await db.Vote.getAll();
    res.json(votes);
});

// Add votes
app.post('/vote', async function (req, res) {
    try {
        const data = req.data;
        console.log(req.data, data);
        await Promise.all(data.map(async (vote) => {
            await db.Vote.addVote(vote.id, vote.note);
        }));
        res.status(200).send('Votes enregistrés avec succès');
    } catch (err) {
        console.error(err);
        res.status(500).send('Une erreur s\'est produite lors de l\'enregistrement des votes');
    }
});


// Export our API
module.exports = app;
