const fs = require("fs");
const axios = require("axios");

async function getData(codeINSEE) {
    const url = `https://observatoire-fauna.fr/api/sudouest_especes_menacees_autour_ma_commune?commune=${codeINSEE}`;
    const response = await axios.get(url);
    return response.data;
}

async function getInseeCode(departement, callback) {
    const url = `https://geo.api.gouv.fr/departements/${departement}/communes?fields=code`;
    return await axios.get(url);
}
async function getInseeName() {
    const departements = [40, 24, 33, 17, 79, 86, 16, 19, 23, 87, 47, 64];
    let allInseeCode = {};
    for (let i = 0; i < departements.length; i++) {
        const response = await getInseeCode(departements[i]);
        allInseeCode[departements[i]] = response.data;
    }
    return allInseeCode;
}

// create a db.json file with all the data necessary for the app
async function createDB() {
    let allData = {};
    const inseeCodes = await getInseeName();
    for (const key in inseeCodes) {
        const value = inseeCodes[key];
        for (let i = 0; i < value.length; i++) {
            const code = value[i].code;
            try {
                allData[value[i].nom] = await getData(code);
            }
            catch (e) {
                console.log(`Error for code ${code}`);
            }
        }
    }
    const categories = ['Mammifères (non volant)', 'Amphibiens', 'Reptiles', 'Odonates', 'Oiseaux', 'Rhopalocères', 'Chiroptères'];
    for (const key in allData) {
        const value = allData[key];
        for (const category in value) {
            if (!categories.includes(category)) {
                delete value[category];
            }
            if (category === 'Mammifères (non volant)') {
                value['Mammifères'] = value[category];
                delete value[category];
            }
        }
    }
    fs.writeFileSync("../public/data/db.json", JSON.stringify(allData));
}

createDB();
