'use strict';

const fs = require("fs");
const app = require( 'express' )();
const initAnimalDB = require("../db/animalDB");
const initCommuneDB = require("../db/communeDB");
const initTipsDB = require("../db/tipsDB");

let dbAnimal;
let dbCommune;
let dbTips;

app.get('/animal/autocomplete/:name', function ( req, res ) {
    if (!dbAnimal) {
        dbAnimal = JSON.parse(fs.readFileSync('herisson/public/data/animalDB.json').toString());
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
        dbAnimal = JSON.parse(fs.readFileSync('herisson/public/data/animalDB.json').toString());
    }

    const filteredData = Object.keys(dbAnimal)
        .filter(key => key.toLowerCase() === req.params.name.toLowerCase())
        .reduce((filteredData, key) => {
            filteredData    [key] = dbAnimal[key];
            return filteredData;
        }, {});

    res.json({filteredData});
});

app.get('/commune/autocomplete/:name', function ( req, res ) {
    if (!dbCommune) {
        dbCommune = JSON.parse(fs.readFileSync('herisson/public/data/communeDB.json').toString());
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
        dbCommune = JSON.parse(fs.readFileSync('herisson/public/data/communeDB.json').toString());
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

app.get('/initdb/commune', function ( req, res ) {
    const filePath = 'herisson/public/data/communeDB.json';

    fs.stat(filePath, (err, stats) => {
        if(err){
            if(err.code === "ENOENT"){
                // file does not exist, do nothing
            }else{
                console.error(err);
            }
            return;
        }
        if (stats.isFile()) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(`File deleted: ${filePath}`);
            });
        }
    });
    initCommuneDB().then(() => {
        res.json({message: 'communeDB initialized'}
        )});
});

app.get('/initdb/tips', function ( req, res ) {
    const filePath = "herisson/public/data/tipsDB.json";

    fs.stat(filePath, (err, stats) => {
        if(err){
            if(err.code === "ENOENT"){
                // file does not exist, do nothing
            }else{
                console.error(err);
            }
            return;
        }
        if (stats.isFile()) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(`File deleted: ${filePath}`);
            });
        }
    });

    initTipsDB().then(() => {
        res.json({message: 'tipsDB initialized'}
        )});
});

app.get('/initdb/animal', function ( req, res ) {
        const filePath = 'herisson/public/data/animalDB.json';

    fs.stat(filePath, (err, stats) => {
        if(err){
            if(err.code === "ENOENT"){
                // file does not exist, do nothing
            }else{
                console.error(err);
            }
            return;
        }
        if (stats.isFile()) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(`File deleted: ${filePath}`);
            });
        }
    });

        initAnimalDB().then(() => {
            res.json({message: 'animalDB initialized'}
            )});
});

// Export our API
module.exports = app;
