'use strict';

const express = require('express');
const { NominatimJS } = require('nominatim-js');
const app = express();
const wget = require('node-wget');

const data = require('./data/densite.json');

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

        // Security to avoid problems later on
        if (addressInfo.pop() !== "France") return "Service not available outside of France";

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

    res.json({'town': req.params.town, 'density': density});
});

// TODO finir cette fonction
function getRadiationData(latitude, longitude) {
    const username = "supy.game@gmail.com";
    const url = `https://www.soda-is.com/service/wps?Service=WPS&Request=Execute&Identifier=get_cams_radiation&version=1.0.0&DataInputs=latitude=${latitude};longitude=${longitude};altitude=-999;date_begin=2022-01-01;date_end=2022-12-31;time_ref=UT;summarization=P01D;username=${username}&RawDataOutput=irradiation`;

    wget({
        url:  url,
        dest: './data/temp/',
        timeout: 2000
    },
    function (error, response, body) {
        if (error) {
            console.log('--- error:');
            console.log(error);            // error encountered
        } else {
            console.log('--- headers:');
            console.log(response.headers); // response headers
            console.log('--- body:');
            console.log(body);             // content of package
        }
    });
}
//getRadiationData(44.083, 5.059, -999, "2017-01-01", "2017-01-05", "UT", "PT15M");

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
 * @returns {float} total irradiation on the roof
 */
function computeIrradiation(time, day, ghi, dhi, bni, orientation, inclinationAngle, latitude) {
    // solarAzimutAngle based on latitude, longitude, time, day
    const sunDeclination = Math.asin(0.398 * Math.sin(0.985 * day - 80));
    const hourAngle = 86 < day < 300 ? 180 * (((time - 0.5) / 4 - 2) / 12 - 1) : 180 * (((time - 0.5) / 4 - 1) / 12 - 1);
    const sunElevationAngle = Math.asin(Math.sin(latitude) * Math.sin(sunDeclination) + Math.cos(latitude) * Math.cos(sunDeclination) * Math.cos(hourAngle));
    const solarAzimutAngle = Math.asin((Math.cos(sunDeclination) * Math.sin(hourAngle)) / Math.cos(sunElevationAngle));

    // azimutAngle computed with the orientation (in rad)
    let azimutAngle = -1;

    switch (orientation) {
        case 'N':
            azimutAngle = 0;
            break;

        case 'W':
            azimutAngle = 3 * Math.PI / 2;
            break;

        case 'E':
            azimutAngle = Math.PI / 2;
            break;

        case 'S':
            azimutAngle = Math.PI;
            break;

        case 'NW':
            azimutAngle = 7 * Math.PI / 4;
            break;

        case 'NE':
            azimutAngle = Math.PI / 4;
            break;

        case 'SW':
            azimutAngle = 5 * Math.PI / 4;
            break;

        case 'SE':
            azimutAngle = 3 * Math.PI / 4;
            break;
    }

    // DTI -> Diffuse Tilted Irradiation between time and time - dt (where dt = 1/4 hour)
    const dti = (1 + Math.cos(inclinationAngle)) * dhi / 2;

    // RTI -> Reflected Tilted Irradiation between time and time - dt (where dt = 1/4 hour)
    const rti = 0.2 * (1 - Math.cos(inclinationAngle)) * ghi / 2; // taking 20% for the albedo

    // cosine of the angle of incidence of the direct radiation on the roof
    const incidenceAngleCosine = Math.cos(inclinationAngle) * Math.sin(sunElevationAngle) + Math.sin(inclinationAngle) * Math.cos(sunElevationAngle) * Math.cos(azimutAngle - solarAzimutAngle);

    // BTI -> Beam Tilted Irradiation
    const bti = incidenceAngleCosine <= 0 ? 0 : incidenceAngleCosine * bni;

    // Total irradiation : sum of dti, rti, bti
    return (dti + rti + bti);
}

// Export our API
module.exports = app;
