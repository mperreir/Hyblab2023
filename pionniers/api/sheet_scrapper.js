const fs = require('fs');

const {google} = require('googleapis');

async function retrieveSheetJSON () {
    // Create a new JWT client using the key file downloaded from the Google Developers Console
    const auth = new google.auth.GoogleAuth({
        keyFile: "./pionniers/api/credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    })
    // Create a client instance for auth
    const client = await auth.getClient();
    // Create an instance of Google Sheets API
    const googleSheets = google.sheets({version: 'v4', auth: client});
    // Declare spreadsheet ID
    const spreadsheetId = "118QtiG4eghOpB2-SPFNLjMyZj-tJoBW4_5MPU7FOlpg";
    // Read rows from spreadsheet and return as JSON object (or undefined if error)
    try {
        const getRows = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: "database"
        });
        return getRows.data;
    } catch (error) {
        console.error(`An error occurred: ${error}`);
        return;
    }
}

async function exportSheetJSON () {
    // Retrieve data from Google Sheets
    const data = await retrieveSheetJSON();
    // Do nothing if no data
    if (!data){
        return;
    }
    // Write data to JSON file
    const data_json = JSON.stringify(data, null, 2);
    fs.writeFile('./pionniers/public/data/data.json', data_json, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
}

async function readJSONFromServerFile () {
    // Read data from JSON file and return as JSON object
    const data = await fs.readFileSync('./pionniers/public/data/data.json');
    return JSON.parse(data.toString());
}

setInterval(() => {
    exportSheetJSON().then(r => console.log("Data updated"));
}, 1000 * 10);