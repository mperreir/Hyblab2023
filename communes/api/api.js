'use strict';

const app = require( 'express' )();
const path = require('path');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./communes/api/communes.db', sqlite3.OPEN_READWRITE, function (err) {
    if (err) {
        console.error(err + '\n' + 'run "npm run createDB" to create a database file');
        // Pas de problème pour faire un appel synchrone ici : on est dans la phase
        // d'initialisation du serveur et pas dans le traitement de requêtes.
        require('process').exit(-1);
    }
});

// Sample endpoint that sends the partner's name
app.get('/topic', function ( req, res ) {
    let topic;

    // Get partner's topic from folder name
    topic = path.basename(path.join(__dirname, '/..'))
    // Send it as a JSON object
    res.json({'topic':topic});
} );

app.get('/energy/:name', function ( req, res ) {
    let energy = req.params.name;

    console.log(energy);

    db.all('SELECT * FROM Utilisateur', function (err, rows) {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
        else {
            console.log(rows);
            res.json(rows);
        }
    });
});

// Export our API
module.exports = app;
