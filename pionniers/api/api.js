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
                "Id": row[0].toString().trim(),
                "Keywords": row[12].toString().trim()
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
        // Transform values to a list using ";" as separator
        data.values = data.values.map(row => {
            row.Keywords = row.Keywords.split(";");
            // Trim values
            row.Keywords = row.Keywords.map(str => str.trim().toLowerCase());
            return row;
        });
        // Create a set of all values
        data.values = [...new Set(data.values.map(row => row.Keywords).flat())];
        // If "" is in the list, remove it
        if (data.values.includes("")) {
            data.values.splice(data.values.indexOf(""), 1);
        }
        // Order values alphabetically
        data.values.sort();
        console.log(data.values)
        // Send it as a JSON object
        res.json(data.values);
    });
});


/**
 * @api {get} Get all geographical information of entrepreneurs matching the requested topics
 */
app.get('/map/topics/:feed/:circular_economy/:energy/:industry/:mobility/:digital', function ( req, res ) {
    sheet_scrapper.readJSONFromServerFile().then(data => {
        // Filter data to only keep convenient fields
        data.values = data.values.map(row => {
            return {
                "Id": row[0].toString().trim(),
                "Long": row[2].toString().trim(),
                "Lat": row[3].toString().trim(),
                "Topic": row[11].toString().trim(),
                "Keywords": row[12].toString().trim()
            }
        });
        // Remove lines with no Id
        data.values = data.values.filter(row => row.Id);
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
 * @api {get} Get the miniature of a specific entrepreneur by its id
 */
app.get('/miniature/:id', function ( req, res ) {
    sheet_scrapper.readJSONFromServerFile().then(data => {
        // Filter data to only keep convenient fields
        data.values = data.values.map(row => {
            return {
                "Id": row[0].toString().trim(),
                "Name": row[4].toString().trim(),
                "Company": row[5].toString().trim(),
                "City": row[6].toString().trim(),
                "Age": row[7].toString().trim(),
                "Status": row[8].toString().trim(),
                "MiniBio": row[9].toString().trim(),
                "Topic": row[11].toString().trim(),
                "Keywords": row[12].toString().trim(),
                "URLImage": row[15].toString().trim()
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
app.get('/miniature/topics/:feed/:circular_economy/:energy/:industry/:mobility/:digital', function ( req, res ) {
    sheet_scrapper.readJSONFromServerFile().then(data => {
        // Filter data to only keep convenient fields
        data.values = data.values.map(row => {
            return {
                "Id": row[0].toString().trim(),
                "Name": row[4].toString().trim(),
                "Company": row[5].toString().trim(),
                "City": row[6].toString().trim(),
                "Age": row[7].toString().trim(),
                "Status": row[8].toString().trim(),
                "MiniBio": row[9].toString().trim(),
                "Topic": row[11].toString().trim(),
                "Keywords": row[12].toString().trim(),
                "URLImage": row[15] !== undefined ? row[15].toString().trim() : row[15]
            }
        });
        // Remove lines with no Id
        data.values = data.values.filter(row => row.Id);
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
                "Id": row[0].toString().trim(),
                "ExactAddress": row[1].toString().trim(),
                "Name": row[4].toString().trim(),
                "Company": row[5].toString().trim(),
                "Age": row[7].toString().trim(),
                "Status": row[8].toString().trim(),
                "ContentBio": row[10].toString().trim(),
                "Topic": row[11].toString().trim(),
                "Keywords": row[12].toString().trim(),
                "Podcast": row[13].toString().trim(),
                "Article": row[14].toString().trim(),
                "URLImage": row[15].toString().trim(),
                "URLLinkedin": row[16].toString().trim()
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
