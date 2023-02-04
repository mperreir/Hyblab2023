'use strict';

const app = require( 'express' )();
const sheet_scrapper = require('./sheet_scrapper');


/**
 * @api {get} Get all used keywords
 */
app.get('/map/keywords', function ( req, res ) {
    sheet_scrapper.readJSONFromServerFile().then(data => {
        // Filter data to only keep convenient fields
        data.values = data.values.map(row => {
            return {
                "Id": row[0],
                "Keywords": row[12]
            }
        });
        // Remove lines with no Id
        data.values = data.values.filter(row => row.Id);
        // Remove header row
        data.values.shift();
        // Remove empty rows
        data.values = data.values.filter(row => row.Keywords);
        // Trim values
        data.values = data.values.map(row => {
            row.Keywords = row.Keywords.trim();
            return row;
        });
        // Retrieve values from the "Keywords" column as a list and with no duplicates
        data.values = [...new Set(data.values.map(row => row.Keywords.split(";")).flat())];
        // Order values alphabetically
        data.values.sort();
        // Send it as a JSON object
        res.json(data.values);
    });
});


/**
 * @api {get} Get all geographical information of entrepreneurs matching the requested topics and optional keyword
 */
app.get('/map/topics/:feed/:circular_economy/:energy/:industry/:mobility/:digital/keyword/:keyword?', function ( req, res ) {
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
        // Remove lines with no Id
        data.values = data.values.filter(row => row.Id);
        // If Topic or Keywords are undefined, set an empty string
        data.values = data.values.map(row => {
            row.Topic = row.Topic ? row.Topic : " ";
            row.Keywords = row.Keywords ? row.Keywords : " ";
            return row;
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
        // Send it as a JSON object
        res.json(data.values);
    });
});


/**
 * @api {get} Get the miniature of a specific entrepreneur by its id
 */
app.get('/miniature/:id', function ( req, res ) {
    sheet_scrapper.readJSONFromServerFile().then(data => {
        // Filter data to only keep convenient fields
        data.values = data.values.map(row => {
            return {
                "Id": row[0],
                "Name": row[4],
                "Company": row[5],
                "City": row[6],
                "Age": row[7],
                "Status": row[8],
                "MiniBio": row[9],
                "Topic": row[11],
                "Keywords": row[12],
                "URLImage": row[15]
            }
        });
        // Remove lines with no Id
        data.values = data.values.filter(row => row.Id);
        // Filter data to only keep the row with the requested id
        data.values = data.values.filter(row => {
            return row.Id === req.params.id;
        });
        // If no row was found, return an empty object
        if (data.values.length === 0) {
            data.values = {};
            res.json(data.values);
        }
        else {
            res.json(data.values[0]);
        }
    });
});


/**
 * @api {get} Get all miniatures of entrepreneurs matching the requested topics
 */
app.get('/miniature/topics/:feed/:circular_economy/:energy/:industry/:mobility/:digital?', function ( req, res ) {
    sheet_scrapper.readJSONFromServerFile().then(data => {
        // Filter data to only keep convenient fields
        data.values = data.values.map(row => {
            return {
                "Id": row[0],
                "Name": row[4],
                "Company": row[5],
                "City": row[6],
                "Age": row[7],
                "Status": row[8],
                "MiniBio": row[9],
                "Topic": row[11],
                "Keywords": row[12],
                "URLImage": row[15]
            }
        });
        // Remove lines with no Id
        data.values = data.values.filter(row => row.Id);
        // If Topic or Keywords are undefined, set an empty string
        data.values = data.values.map(row => {
            row.Topic = row.Topic ? row.Topic : " ";
            row.Keywords = row.Keywords ? row.Keywords : " ";
            return row;
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
        // Send it as a JSON object
        res.json(data.values);
    });
});


/**
 * @api {get} Get the profile of a specific entrepreneur by its id
 */
app.get('/profile/:id', function ( req, res ) {
    sheet_scrapper.readJSONFromServerFile().then(data => {
        // Filter data to only keep convenient fields
        data.values = data.values.map(row => {
            return {
                "Id": row[0],
                "ExactAddress": row[1],
                "Name": row[4],
                "Company": row[5],
                "Age": row[7],
                "Status": row[8],
                "ContentBio": row[10],
                "Topic": row[11],
                "Keywords": row[12],
                "Podcast": row[13],
                "Article": row[14],
                "URLImage": row[15],
                "URLLinkedin": row[16]
            }
        });
        // Remove lines with no Id
        data.values = data.values.filter(row => row.Id);
        // Filter data to only keep the row with the requested id
        data.values = data.values.filter(row => {
            return row.Id === req.params.id;
        });
        // If no row was found, return an empty object
        if (data.values.length === 0) {
            data.values = {};
            res.json(data.values);
        }
        else {
            res.json(data.values[0]);
        }
    });
});

// Export our API
module.exports = app;
