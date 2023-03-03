'use strict';

const express = require('express');
const { NominatimJS } = require('nominatim-js');
const app = express();
const wget = require('node-wget');
const CsvReadableStream = require('csv-reader');
const fs = require('fs');
const https = require('https');

const data = require('./data/densite.json');
const { setTimeout } = require('timers/promises');

app.use(express.json());

// Retrieves multiple matches for the address and sends it
app.get('/searchAddresses/:address', async function (req, res) {
    const apiCall = await NominatimJS.search({
        q: req.params.address
    });

    console.log(apiCall);

    const results = [];

    apiCall.slice(0, 4).forEach(apiElement => {
        let address = {
            'street_number': 0,
            'street': "",
            'zip_code': 0,
            'town': ""
        };

        const addressInfo = apiElement.display_name.split(', ');

        // Securities to avoid problems later on
        if (addressInfo.length < 5) return;
        if (addressInfo.pop() !== "France") return;

        // We need to check if the returned address starts with a number, or is just the name of the street
        address = addressInfo[0].match(/^\d/) ? {
            'street_number': addressInfo[0],
            'street': addressInfo[1],
            'zip_code': addressInfo.pop(),
            'town': addressInfo[3]
        } : {
            'street_number': 0,
            'street': addressInfo[0],
            'zip_code': addressInfo.pop(),
            'town': addressInfo[2]
        };

        results.push({
            'latitude': apiElement.lat,
            'longitude': apiElement.lon,
            'full_address': address,
            'address_text': address.street_number + " " + address.street + ", " + address.zip_code + " " + address.town.toUpperCase()
        });
    });
    console.log(results);

    res.json(results);
});

// Retrieves the density of the town the person lives in
app.get('/density/:town', async function (req, res) {
    let density = data.find(e => e["Libellé commune"] === req.params.town)["Degré de Densité"];

    res.json({ 'town': req.params.town, 'density': density });
});

app.get('/energy/:latitude/:longitude/:orientation/:inclination', async function (req, res) {
    const solarData = await getRadiationData(req.params.latitude, req.params.longitude);
    
    const totalEnergy = readRadiationData(solarData, req.params.orientation, req.params.inclination, req.params.latitude);

    console.log(totalEnergy);

    res.json({ "total energy": totalEnergy });
});

function getRadiationData(latitude, longitude) {
    const username = "supy.game%2540gmail.com";
    const url = `https://www.soda-is.com/service/wps?Service=WPS&Request=Execute&Identifier=get_cams_radiation&version=1.0.0&DataInputs=latitude=${latitude};longitude=${longitude};altitude=-999;date_begin=2022-01-01;date_end=2022-12-31;time_ref=TST;summarization=PT15M;username=${username}&RawDataOutput=irradiation`;

    return new Promise((res, rej) => {
        https.get(url, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            res(data);
        });

        }).on("error", (err) => {
            rej(err.message);
        });
    });
}

function readRadiationData(solarData, orientation, inclinationAngle, latitude) {
    let totalEnergy = 0;

    for (const line of solarData.split("\n").map(e => e.trim())) {
        if (!line.startsWith('#') && line) {
            const row = line.split(';');
            const date = new Date(row[0].split('/')[0]);
            const day = Math.floor((date - new Date(date.getFullYear(), 0, 1)) / 1000 / 60 / 60 / 24) + 1;
            const time = Math.floor((date - new Date(date.getFullYear(), date.getMonth(), date.getDate())) / 1000 / 60 / 15) + 1;
            totalEnergy += computeEnergy(time, day, parseFloat(row[6]), parseFloat(row[8]), parseFloat(row[9]), orientation, inclinationAngle, latitude);
        }
    }
    return totalEnergy
}

/**
 * Compute irradiation of the roof at a time given
 * @param {int} time between 1 and 96 (number of 1/4 hours in a day)
 * @param {int} day between 1 and 365 (for the day of the year)
 * @param {float} ghi Global Horizontal Irradiation between time and time - dt (where dt = 1/4 hour)
 * @param {float} dhi Diffuse Horizontal Irradiation between time and time - dt (where dt = 1/4 hour)
 * @param {float} bni Beam Normal Irradiation between time and time - dt (where dt = 1/4 hour)
 * @param {string} orientation could be N, W, E, S, NW, NE, SW, SE
 * @param {float} inclinationAngle the angle of inclination of the roof (in rad)
 * @param {float} latitude the latitude of the roof
 * @returns {float} total energy AC at this moment
 */
function computeEnergy(time, day, ghi, dhi, bni, orientation, inclinationAngle, latitude) {
    // solarAzimuthAngle based on latitude, time, day
    const sunDeclination = Math.asin(0.398 * Math.sin((0.985 * day - 80) * Math.PI / 180));
    const hourAngle = Math.PI * (((time + 0.5) / 4) / 12 - 1);
    const sunElevationAngle = Math.asin(Math.sin(latitude * Math.PI / 180) * Math.sin(sunDeclination) + Math.cos(latitude * Math.PI / 180) * Math.cos(sunDeclination) * Math.cos(hourAngle));
    const solarAzimuthAngle = Math.asin((Math.cos(sunDeclination) * Math.sin(hourAngle)) / Math.cos(sunElevationAngle));

    // azimuthAngle computed with the orientation (in rad)
    let azimuthAngle = -1;

    switch (orientation) {
        case 'N':
            azimuthAngle = Math.PI;
            break;

        case 'W':
            azimuthAngle = Math.PI / 2;
            break;

        case 'E':
            azimuthAngle = 3 * Math.PI / 2;
            break;

        case 'S':
            azimuthAngle = 0;
            break;

        case 'NW':
            azimuthAngle = 3 * Math.PI / 4;
            break;

        case 'NE':
            azimuthAngle = 5 * Math.PI / 4;
            break;

        case 'SW':
            azimuthAngle = Math.PI / 4;
            break;

        case 'SE':
            azimuthAngle = 7 * Math.PI / 4;
            break;
    }

    // DTI -> Diffuse Tilted Irradiation between time and time - dt (where dt = 1/4 hour)
    const dti = (1 + Math.cos(inclinationAngle)) * dhi / 2;

    // RTI -> Reflected Tilted Irradiation between time and time - dt (where dt = 1/4 hour)
    const rti = 0.2 * (1 - Math.cos(inclinationAngle)) * ghi / 2; // taking 20% for the albedo

    // cosine of the angle of incidence of the direct radiation on the roof
    const incidenceAngleCosine = Math.cos(inclinationAngle) * Math.sin(sunElevationAngle) + Math.sin(inclinationAngle) * Math.cos(sunElevationAngle) * Math.cos(azimuthAngle - solarAzimuthAngle);

    // BTI -> Beam Tilted Irradiation
    const bti = incidenceAngleCosine <= 0 ? 0 : incidenceAngleCosine * bni;

    // Total irradiation : sum of dti, rti, bti -> energy returned with this calculus
    return Math.min(160, 0.2 * 0.85 * (dti + rti + bti));
}

// Export our API
module.exports = app;