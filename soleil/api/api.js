'use strict';

const express = require('express');
const app = express();
const addresser = require('addresser');

const data = require('./data/densite.json');

app.use(express.json())

app.get('/addressInfo', function (req, res) {
    let address = req.body['address'];

    let city = address["city"];

    let density = data.find(e => e["Libellé commune"] === city)["Degré de Densité"];

    res.json({address, 'density': density});
});

// Export our API
module.exports = app;
