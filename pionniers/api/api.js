'use strict';

const app = require( 'express' )();
const path = require('path');
const sheet_scrapper = require('./sheet_scrapper');

app.get('/map/all', function ( req, res ) {
    sheet_scrapper.readJSONFromServerFile().then(data => {
        // Filter data to only keep convenient fields
        data.values = data.values.map(row => {
            return {
                "Id": row[0],
                "Long": row[2],
                "Lat": row[3],
                "Topic": row[11],
                "Keywords": row[12]
            }
        });
        // Remove header row
        data.values.shift();
        // Remove range and majorDimension fields
        delete data.range;
        delete data.majorDimension;
        // Send it as a JSON object
        res.json(data.values);
    });
});

app.get('/map/filter/topics/:feed/:circular_economy/:energy/:industry/:mobility/:digital/keyword/:keyword?', function ( req, res ) {
    sheet_scrapper.readJSONFromServerFile().then(data => {
        // Filter data to only keep convenient fields
        data.values = data.values.map(row => {
            return {
                "Id": row[0],
                "Long": row[2],
                "Lat": row[3],
                "Topic": row[11],
                "Keywords": row[12]
            }
        });
        // Filter data to only keep rows with the requested topics
        data.values = data.values.filter(row => {
            return (req.params.feed === "true" && row.Topic.includes("alimentation")) ||
                (req.params.circular_economy === "true" && row.Topic.includes("économie circulaire")) ||
                (req.params.energy === "true" && row.Topic.includes("énergie")) ||
                (req.params.industry === "true" && row.Topic.includes("industrie")) ||
                (req.params.mobility === "true" && row.Topic.includes("mobilité")) ||
                (req.params.digital === "true" && row.Topic.includes("numérique"));
        });
        // Filter data to only keep rows with the requested keyword
        if (req.params.keyword) {
            data.values = data.values.filter(row => {
                return row.Keywords.includes(req.params.keyword);
            });
        }
        // Remove header row
        data.values.shift();
        // Remove range and majorDimension fields
        delete data.range;
        delete data.majorDimension;
        // Send it as a JSON object
        res.json(data.values);
    });
});

// Sample endpoint that sends the partner's name
app.get('/topic', function ( req, res ) {
    let topic;

    // Get partner's topic from folder name
    topic = path.basename(path.join(__dirname, '/..'))
    // Send it as a JSON object
    res.json({'topic':topic});
} );

// Export our API
module.exports = app;
