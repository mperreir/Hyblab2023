const fs = require("fs");
const axios = require("axios");

const departements = [40, 24, 33, 17, 79, 86, 16, 19, 23, 87, 47, 64];

async function getData(codeINSEE) {
    const url = `https://observatoire-fauna.fr/api/sudouest_especes_menacees_autour_ma_commune?commune=${codeINSEE}`;
    const response = await axios.get(url);
    return response.data;
}

function len(information) {
    let count = 0;
    for (let i in information) {
        count++;
    }
    return count;
}

async function getAllData() {
    let allData = {};
    for (let i = 0; i < departements.length; i++) {
        for (let j = 1; j <= 999; j++) {
            let code = departements[i] * 1000 + j;
            try {
                let information = await getData(code);
                if (len(information) > 0) {
                    allData[code] = information;
                }
            } catch (e) {
                console.log(`Error for code ${code}`);
            }
        }
        console.log("département finit");
    }
    const jsonData = JSON.stringify(allData);

    fs.writeFileSync("DB.json", jsonData);
}

getAllData();
