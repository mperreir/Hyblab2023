'use strict';

const fs = require("fs");
const app = require( 'express' )();
const path = require('path');

let dbAnimal;
let dbCommune;
let dbTips;

// Sample endpoint that sends the partner's name
app.get('/topic', function ( req, res ) {
    let topic;

    // Get partner's topic from folder name
    topic = path.basename(path.join(__dirname, '/..'))
    // Send it as a JSON object
    res.json({'topic':topic});
} );
app.get('/animal/autocomplete/:name', function ( req, res ) {
    if (!dbAnimal) {
        dbAnimal = JSON.parse(fs.readFileSync('herisson/public/data/additionalDB.json').toString());
    }
    let count = 0;
    const filteredNames = Object.keys(dbAnimal).filter(key => {
        if (count >= 10) {
            return false;
        }
        if (key.toLowerCase().startsWith(req.params.name.toLowerCase())) {
            count++;
            return true;
        }
        return false;
    });
    res.json({filteredNames});
});

app.get('/animal/:name', function ( req, res ) {
    if (!dbAnimal) {
        dbAnimal = JSON.parse(fs.readFileSync('herisson/public/data/additionalDB.json').toString());
    }
    const filteredData = Object.keys(dbAnimal)
        .filter(key => key.toLowerCase() === req.params.name.toLowerCase())
        .reduce((filteredData, key) => {
            filteredData[key] = dbAnimal[key];
            return filteredData;
        }, {});

    res.json({filteredData});
});

app.get('/commune/autocomplete/:name', function ( req, res ) {
    if (!dbCommune) {
        dbCommune = JSON.parse(fs.readFileSync('herisson/public/data/db.json').toString());
    }
    let count = 0;
    const filteredNames = Object.keys(dbCommune).filter(key => {
        if (count >= 10) {
            return false;
        }
        if (key.toLowerCase().startsWith(req.params.name.toLowerCase())) {
            count++;
            return true;
        }
        return false;
    });
    res.json({filteredNames});
});

app.get('/commune/:name', function ( req, res ) {
    if (!dbCommune) {
        dbCommune = JSON.parse(fs.readFileSync('herisson/public/data/db.json').toString());
    }
    const filteredData = Object.keys(dbCommune)
        .filter(key => key.toLowerCase() === req.params.name.toLowerCase())
        .reduce((filteredData, key) => {
            filteredData[key] = dbCommune[key];
            return filteredData;
        }, {});

    res.json({filteredData});
});

app.get('/tips/:name', function ( req, res ) {
    if (!dbTips) {
        dbTips = JSON.parse(fs.readFileSync('herisson/public/data/tipsDB.json').toString());
    }
    const filteredData = Object.keys(dbTips)
        .filter(key => key.toLowerCase() === req.params.name.toLowerCase())
        .reduce((filteredData, key) => {
            filteredData[key] = dbTips[key];
            return filteredData;
        }, {});

    res.json({filteredData});
});

// Export our API
module.exports = app;