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
                    const codeToNameUrl = `https://geo.api.gouv.fr/communes/${code}?fields=nom`;
                    axios.get(codeToNameUrl).then(response => {
                        allData[response.data.nom] = information;
                    }).catch(error => {
                        console.log(`Error for code ${code}`);
                    });
                }
            }).catch(error => {
                console.log(`Error for code ${code}`);
            }));
        }
    }
    await Promise.all(promises);
    // only keep the data with the category ['Mammifères', 'Amphibiens', 'Reptiles', 'Odonates', 'Oiseaux', 'Rhopalocères', 'Chiroptères'];
    // the Mammifères category is named 'Mammifères (non volant)' in the API so change the name
    const categories = ['Mammifères (non volant)', 'Amphibiens', 'Reptiles', 'Odonates', 'Oiseaux', 'Rhopalocères', 'Chiroptères'];
    for (const key in allData) {
        const value = allData[key];
        for (const category in value) {
            if (!categories.includes(category)) {
                delete value[category];
            }
            else if (category === 'Mammifères (non volant)') {
                value['Mammifères'] = value[category];
                delete value[category];
            }
        }
    }

    fs.writeFileSync("../public/data/db.json", JSON.stringify(allData));
}

getAllData();
