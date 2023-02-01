'use strict';

const express = require('express');
const { NominatimJS } = require('nominatim-js');
const app = express();
const wget = require('node-wget');

const data = require('./data/densite.json');

app.use(express.json());

// Retrieves a correct match for the address and sends it
app.get('/searchAddress', async function (req, res) {
    res.json(await getAddressFromText(req.body['searchText']));
});

// Retrieves all data regarding the input
app.get('/addressInfo', async function (req, res) {
    // Uses our parser to turn the text input into a valid address
    let location = await getAddressFromText(req.body['searchText']);

    // Retrieves the density of the town the person lives in
    let density = data.find(e => e["Libellé commune"] === location.address.town)["Degré de Densité"];

    res.json({location, 'density': density});
});


// Retrieve a legit address from text input
async function getAddressFromText(text) {
    const apiCall = await NominatimJS.search({
        q: text
    });

    let address = {
        'address': "",
        'zip_code': 0,
        'town': ""
    };

    const addressInfo = apiCall[0].display_name.split(', ');
    
    // Security to avoid problems later on
    if (addressInfo.pop() !== "France") return "Service not avaliable outside of France";

    // We need to check if the returned address starts with a number, or is just the name of the street
    if (addressInfo[0].match(/^\d/)) {
        console.log("Number detected");
        address = {
            'address': addressInfo[0] + ", " + addressInfo[1],
            'zip_code': addressInfo.pop(),
            'town': addressInfo[3]
        };
    } else {
        console.log("No number here");
        address = {
            'address': addressInfo[0],
            'zip_code': addressInfo.pop(),
            'town': addressInfo[2]
        };
    }

    const result = {
        'latitude': apiCall[0].lat,
        'longitude': apiCall[0].lon,
        'address': address
    };

    return result;
}

// TODO finir cette fonction
function getRadiationData(latitude, longitude, altitude, date_begin, date_end, time_ref, summatization) {
    const username = "supy.game@gmail.com";
    const url = `https://www.soda-is.com/service/wps?Service=WPS&Request=Execute&Identifier=get_cams_radiation&version=1.0.0&DataInputs=latitude=${latitude};longitude=${longitude};altitude=${altitude};date_begin=${date_begin};date_end=${date_end};time_ref=${time_ref};summarization=${summatization};username=${username}&RawDataOutput=irradiation`;

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
    }
);
}
//getRadiationData(44.083, 5.059, -999, "2017-01-01", "2017-01-05", "UT", "PT15M");

// Export our API
module.exports = app;
