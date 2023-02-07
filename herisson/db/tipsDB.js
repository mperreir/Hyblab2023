const fs = require('fs');
const axios = require('axios');
const db = JSON.parse(fs.readFileSync('../public/data/db.json'));

const tipsMammiferes = {
    conseil1: 'Évitez les pelouses en moquette rase : réglez la tonte le plus haut possible. L\'idéal est de laisser fleurir dans votre pelouse les fleurs typiques des prairies. Une multitude d’animaux viendra y vivre, pour le plus grand bonheur des hérissons.',
    conseil2: 'Pour borner le jardin et construire une intimité, rien ne vaut une haie mais choisissez des espèces variées, et de préférence locales car elles attirent un plus grand nombre d’animaux. Planter de l’aubépine est un bon compromis.',
    conseil3: 'Rejoignez les campagnes de sciences participatives pour aider les chercheurs. Depuis chez vous ou en excursion, vous pouvez enrichir leurs données et vos connaissances, le tout de manière ludique.',
    conseil4: 'Si vous devez élaguer, abattre ou nettoyer votre jardin, laissez les branchages en tas sous la haie ou dans un endroit tranquille. Cet ensemble de tiges, de feuilles et de branches servira de lieu d’hivernage et de refuge aux rongeurs et aux hérissons.'
}

const tipsAmphibiens = {
    conseil1 : 'Pour borner le jardin et construire une intimité, rien ne vaut une haie mais choisissez des espèces variées, et de préférence locales. Planter de l’aubépine est un bon compromis. À condition d’avoir de l’humidité, les grenouilles viendront en quête de nourriture : insectes de toutes sortes, vers ou chenilles.',
    conseil2 : 'Évitez les pelouses en moquette rase : réglez la tonte le plus haut possible. L\'idéal est de laisser fleurir dans votre pelouse les fleurs typiques des prairies. Les grenouilles apprécient les hautes herbes, à condition d’avoir de l’humidité et un point d’eau pas loin.',
    conseil3 : 'Pas besoin d’un grand jardin, un petit bassin suffit. Les premiers locataires ne tarderont pas à arriver et y pondre leurs œufs. Pour augmenter leurs chances de survie, évitez d’y mettre des poissons.',
    conseil4 : 'Rejoignez les campagnes de sciences participatives pour aider les chercheurs. Depuis chez vous ou en excursion, vous pouvez enrichir leurs données et vos connaissances, le tout de manière ludique.',
    conseil5 : 'Si vous devez élaguer, abattre ou nettoyer votre jardin, laissez les branchages en tas sous la haie ou dans un endroit tranquille. Dans les interstices se réfugiera un crapaud, hiverneront de nombreux insectes.'
}



async function getListCategories() {
    const jsonData = db;
    let categories = [];
    for (const outerKey in jsonData) {
        const outerValue = jsonData[outerKey];
        for (const innerKey in outerValue) {
            if (!categories.includes(innerKey)) {
                categories.push(innerKey);
            }
        }
    }
    return categories;
}

async function getNameFromAutres() {
    const jsonData = db;
    let name = [];
    for (const outerKey in jsonData) {
        const outerValue = jsonData[outerKey];
        for (const innerKey in outerValue) {
            if (innerKey === 'Autres') {
                // add the lb_nom to the name array if it is not already in it
                for (const subKey in outerValue[innerKey]) {
                    const subValue = outerValue[innerKey][subKey];
                    if (!name.includes(subValue.lb_nom)) {
                        name.push(subValue.lb_nom);
                    }
                }
            }
        }

    }
    console.log(name);
    return name;
}

// create {'mammiferes': mammiferes, 'oiseaux': oiseaux, ...} avec mammiferes = {conseil1: description, conseil2: description, ...}
async function createTipsDB() {
    const categories = await getListCategories();
    console.log(categories);
    let tipsDB = {};
    for (let i = 0; i < categories.length; i++) {
        tipsDB[categories[i]] = {};
    }
    // for each category, get the conseil and description
    for (const i in categories) {

    }

    fs.writeFileSync('../public/data/tipsDB.json', JSON.stringify(tipsDB));
}

createTipsDB();
