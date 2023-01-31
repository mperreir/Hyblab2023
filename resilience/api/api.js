'use strict';

const app = require('express');
const { json } = require('express');
const path = require('path');

const routeur = app.Router();
const db = require('../db.js')

module.export = () => {
    // Get partner's topic from folder name
    let topic = path.basename(path.join(__dirname, '/..'))

    // Sample endpoint that sends the partner's name
    routeur.get('/topic', function (req, res) {
        // Send it as a JSON object
        res.json({ 'topic': topic });
    });

    routeur.get('/vote', async function (req, res) {
        const votes = await db.Vote.getAll();
        res.json(votes);
    });

    routeur.post('/vote', async function (req, res) {
        await db.Vote.addVote(req.id);
    });

    // Export our API
    return routeur;
}