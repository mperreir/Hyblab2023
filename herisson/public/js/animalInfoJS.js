const db = "data/additionalDB.json";
const animal = "Sonneur à ventre jaune (Le)";

async function animalInfoJS() {
    /*function to get the datas of a given animal */
    async function getData(dbPath) {
        const response = await fetch(dbPath);
        const data1 = await response.json();
        return data1[animal];
    }

    /*call it*/
    const dataTest = await getData(db);
    console.log(dataTest);

    const animalName = document.getElementById("animal-name");
    const desc = document.getElementById("desc");
    const menace = document.getElementById("menace-level");
    const map = document.getElementById("map");
    const tips = document.getElementById("tips-text");
    const imgDiv = document.getElementById("picture-div")
    const img = document.getElementById("animal-picture");
    const copyright = document.getElementById("copyright");

    if(animal.length > 22){
        animalName.style.fontSize = '4vh';
    } else if(animal.length > 27){
        animalName.style.fontSize = '3.5vh';
    }
    animalName.textContent = animal;
    desc.textContent = "Les " + dataTest["listCities"][0]["categorie"].toLowerCase();
    menace.textContent = dataTest["listCities"][0]["enjeu_conservation"].toUpperCase();
    map.textContent = "Carte";
    tips.textContent += dataTest["listCities"][0]["categorie"].toLowerCase() + " ?";
    img.src = "img/animals/" + dataTest["id"] + ".jpg";
    imgDiv.style.minHeight = '41vh';
    imgDiv.style.maxHeight = '41vh';
    imgDiv.style.maxWidth = '100vw';
    imgDiv.style.width = "auto";
    imgDiv.style.zIndex = "200";
    copyright.textContent = dataTest["copyright"];

}

animalInfoJS();