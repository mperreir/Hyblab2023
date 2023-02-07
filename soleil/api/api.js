'use strict';

const express = require('express');
const { NominatimJS } = require('nominatim-js');
const app = express();
const wget = require('node-wget');

const data = require('./data/densite.json');

app.use(express.json());

// Retrieves multiple matches for the address and sends it
app.get('/searchAddresses', async function (req, res) {
    const apiCall = await NominatimJS.search({
        q: req.body['searchText']
    });

    const results = [];

    apiCall.slice(0, req.body['resultsCount']).forEach(apiElement => {
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

    res.json(await getAddressesFromText(results));
});

// Retrieves all data regarding the input
app.get('/addressInfo', async function (req, res) {
    // Uses our parser to turn the text input into a valid address
    let address = req.body;

    // Retrieves the density of the town the person lives in
    let density = data.find(e => e["Libellé commune"] === address.full_address.town)["Degré de Densité"];

    res.json({location, 'density': density});
});

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
