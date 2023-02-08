'use strict';

const fs = require("fs");
const app = require( 'express' )();
const path = require('path');
const {flatten} = require("express/lib/utils");

let database;

// Sample endpoint that sends the partner's name
app.get('/topic', function ( req, res ) {
    let topic;

    // Get partner's topic from folder name
    topic = path.basename(path.join(__dirname, '/..'))
    // Send it as a JSON object
    res.json({'topic':topic});
} );
app.get('/animal/autocomplete/:name', function ( req, res ) {
    if (!database) {
        database = JSON.parse(fs.readFileSync('herisson/public/data/additionalDB.json').toString());
    }
    const filteredNames = Object.keys(database)
        .filter(key => key.toLowerCase().startsWith(req.params.name.toLowerCase()));
    console.log(filteredNames);
    res.json({filteredNames});
});

app.get('/animal/:name', function ( req, res ) {
    const database = JSON.parse(fs.readFileSync('herisson/public/data/additionalDB.json').toString());
    const filteredData = Object.keys(database)
        .filter(key => key.toLowerCase().startsWith(req.params.name.toLowerCase()))
        .reduce((filteredData, key) => {
            filteredData[key] = database[key];
            return filteredData;
        }, {});

    res.json({filteredData});
});

app.get('/commune/autocomplete/:name', function ( req, res ) {
    //Time the request
    if (!database) {
        database = JSON.parse(fs.readFileSync('herisson/public/data/db.json').toString());
    }
    let count = 0;
    const filteredNames = Object.keys(database)
        .filter(key => {
            if (count < 10 && key.toLowerCase().startsWith(req.params.name.toLowerCase())) {
                count++;
                return true;
            }else{
                return false;
            }
        });
    res.json({filteredNames});

});

app.get('/commune/:name', function ( req, res ) {
    const database = JSON.parse(fs.readFileSync('herisson/public/data/db.json').toString());
    const filteredData = Object.keys(database)
        .filter(key => key.toLowerCase().startsWith(req.params.name.toLowerCase()))
        .reduce((filteredData, key) => {
            filteredData[key] = database[key];
            return filteredData;
        }, {});

    res.json({filteredData});
});
// Export our API
module.exports = app;
