// create an additionnalDB.json file with the following content:
// the key is the animal name in french if exwisting or scientific name

const fs = require('fs');
const axios = require('axios');
const db = JSON.parse(fs.readFileSync('../public/data/db.json'));

async function getTaxon(id) {
    const response = await axios.get(`https://taxref.mnhn.fr/api/taxa/${id}`);
    // inside the response, we want the media inside th _links object
    const linkMedia = response.data._links.media.href;


    // get the first occurence of the media._embedded.media array
    let media = null;
    let copyright = null;
    try {
        const mediaData = (await axios.get(linkMedia)).data._embedded.media[0];
        copyright = mediaData.copyright;
        const downloadLink = mediaData._links.file.href;
        // download the image
        await downloadImage(downloadLink, `../public/img/animals/${id}.jpg`);
        media = id + '.jpg';
    } catch (e) {
        console.log(await getNames(id));
    }
    // get the habitat name and description from the api /habitat/{id}
    const habitatNumber = response.data.habitat;
    const habitatData = (await axios.get(`https://taxref.mnhn.fr/api/habitats/${habitatNumber}`)).data;
    const habitat = { name: habitatData.name, description: habitatData.definition}

    const listCities = await getINSEE(id);

    // select only the fields we need
    const { scientificName, frenchVernacularName } = response.data;
    return { id, scientificName, frenchVernacularName, habitat, media, copyright, listCities };
}

function getCDRef(jsonData) {
    let cdRefs = [];
    for (const outerKey in jsonData) {
        const outerValue = jsonData[outerKey];
        for (const innerKey in outerValue) {
            const innerValue = outerValue[innerKey];
            for (const subKey in innerValue) {
                const subValue = innerValue[subKey];
                if (!cdRefs.includes(subValue.cd_ref)) {
                    cdRefs.push(subValue.cd_ref);
                }
            }
        }
    }
    return cdRefs;
}
const cdRefs = getCDRef(db);

async function getAllTaxon() {
    let allTaxon = {};
    // for each cd_ref, get the frenchVernacularName if it exists and the scientificName if not
    for (let i = 0; i < cdRefs.length; i++) {
        // create a list of frenchVernacularNam as key with , as separator if not null, else scientificName
        const { taxon, scientificName, frenchVernacularName } = await getNames(cdRefs[i]);
        let animalName = frenchVernacularName;
        if (frenchVernacularName === null) {
            animalName = scientificName;
        }
        // check if the animalName as , in it
        if (animalName.includes(',')) {
            // apply allTaxon[animalName] = await getTaxon(taxon); to each animalName
            const animalNames = animalName.split(', ');
            for (let j = 0; j < animalNames.length; j++) {
                allTaxon[animalNames[j]] = await getTaxon(taxon);
            }
        }
        else {
            allTaxon[animalName] = await getTaxon(taxon);
        }
    }

    fs.writeFileSync("../public/data/additionalDB.json", JSON.stringify(allTaxon));
}

async function getNames(taxon) {
    const response = await axios.get(`https://taxref.mnhn.fr/api/taxa/${taxon}`);
    const { scientificName, frenchVernacularName } = response.data;
    return { taxon, scientificName, frenchVernacularName };
}

// download the image from the url and save it to the path public/img/animals
async function downloadImage(url, path) {
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });

    response.data.pipe(fs.createWriteStream(path));
}

async function getINSEE(taxon) {
// get the list of cities where the taxon is present and the number of species present using the DB.json file
    const jsonData = db;
    const cityData = [];
    for (const outerKey in jsonData) {
        const outerValue = jsonData[outerKey];
        for (const innerKey in outerValue) {
            const innerValue = outerValue[innerKey];
            for (const subKey in innerValue) {
                const subValue = innerValue[subKey];
                if (subValue.cd_ref === taxon) {
                    cityData.push({ commune: outerKey, nb_obs: subValue.nb_obs, enjeu_conservation: subValue.enjeu_conservation, categorie: innerKey});
                }
            }
        }
    }
    return cityData;
}
getAllTaxon();

