'use strict';

const express = require('express');
const { NominatimJS } = require('nominatim-js');
const app = express();
const addresser = require('addresser');

const data = require('./data/densite.json');

app.use(express.json());

app.get('/searchAddress', async function (req, res) {
    let searchText = req.body['searchText'];

    let results = await NominatimJS.search({
        q: searchText
    });

    res.json(results);
});

app.get('/addressInfo', async function (req, res) {
    let city = req.body["city"];

    let density = data.find(e => e["Libellé commune"] === city)["Degré de Densité"];

    let address = await NominatimJS.search({
        street: req.body['street'],
        city: req.body['city'],
        county: req.body['county'],
        state: req.body['state'],
        country: req.body['country'],
        postalcode: req.body['postalcode']
    });

    res.json({address, 'density': density});
});

// Export our API
module.exports = app;
