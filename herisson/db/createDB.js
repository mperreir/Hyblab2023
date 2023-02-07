const fs = require("fs");
const axios = require("axios");

const departements = [40, 24, 33, 17, 79, 86, 16, 19, 23, 87, 47, 64];

async function getData(codeINSEE) {
    const url = `https://observatoire-fauna.fr/api/sudouest_especes_menacees_autour_ma_commune?commune=${codeINSEE}`;
    const response = await axios.get(url);
    return response.data;
}

async function getAllData() {
    let allData = {};
    const promises = [];
    for (let i = 0; i < departements.length; i++) {
        for (let j = 1; j <= 999; j++) {
            let code = departements[i] * 1000 + j;
            promises.push(getData(code).then(information => {
                if (Object.keys(information).length > 0) {
                    allData[code] = information;
                }
            }).catch(error => {
                console.log(`Error for code ${code}`);
            }));
        }
    }
    await Promise.all(promises);
    const jsonData = JSON.stringify(allData);

    fs.writeFileSync("../public/data/db.json", JSON.stringify(allData));
}

getAllData();
