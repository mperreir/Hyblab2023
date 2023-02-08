const animalCategory = "Oiseaux";
const commune = "Bordeaux";
const db = "data/db.json";
const dbAdd = "data/additionalDB.json";

async function animalCategoryJS() {
    /*function to create a dictionary of the wanted animals*/
    async function getAllAnimals(dbPath) {
        const response = await fetch(dbPath);
        const data1 = await response.json();
        return data1[commune][animalCategory];
    }

    /*call it*/
    const animalsData = await getAllAnimals(db);

    /*  main page */
    const footercontainer = document.getElementById("footerText")
    const h1container = document.getElementById("category")
    const citycontainer = document.getElementById("commune")
    const buttonContainer = document.getElementById("animals-buttons");

    const main = document.querySelector("main.main");
    const footer = document.querySelector("footer.main")

    h1container.textContent = animalCategory.split(" ").shift();
    citycontainer.textContent = commune;
    footercontainer.textContent = "Comment aider ces " + animalCategory.toLowerCase() + " ?";
    footercontainer.style.color = "#FBC5EB";

    buttonContainer.style.width = "innerWidth";
    buttonContainer.style.display = "flex";
    buttonContainer.style.flexDirection = "column";

    /*create each animal's buttons */
    for (const key in animalsData) {
        const button = document.createElement("button");
        button.className = "animalButton";
        if(animalsData[key]["nom_vern"] == null){
            name = animalsData[key]["lb_nom"];
        } else {
            name = animalsData[key]["nom_vern"];
        }
        button.id = name;
        button.textContent = name;
        button.style.margin = "2vw 0";
        buttonContainer.appendChild(button);
    }

    /* manage the main height */
    if(buttonContainer.offsetHeight > 1760) {
        main.style.minHeight = `${buttonContainer.offsetHeight + footer.offsetHeight}px`;
    }
    else{
        main.style.minHeight = '71.7vh';
    }


    /* pop-up */

    async function getInfoPage(animal, commune) {
        async function getAnimalData(dbPath) {
            const response = await fetch(dbPath);
            const data1 = await response.json();
            return data1[animal];
        }

        /*call it*/
        const animalData = await getAnimalData(dbAdd);

        const animalName = document.getElementById("animal-name");
        const desc = document.getElementById("desc");
        const menace = document.getElementById("menace-level");
        const vus = document.getElementById("nb");
        const map = document.getElementById("map");
        const tips = document.getElementById("tips-text");
        const imgDiv = document.getElementById("picture-div")
        const img = document.getElementById("animal-picture");
        const copyright = document.getElementById("copyright");

        if (animal.length > 22) {
            animalName.style.fontSize = '4vh';
        } else if (animal.length > 27) {
            animalName.style.fontSize = '3.5vh';
        }
        animalName.textContent = animal.toUpperCase();
        desc.textContent = "Les " + animalData["listCities"][0]["categorie"].toLowerCase() + " de " + commune;
        if (animalData["listCities"][0]["enjeu_conservation"] == null){
            menace.textContent = "INCONNU"
        } else {
            menace.textContent = animalData["listCities"][0]["enjeu_conservation"].toUpperCase();
        }
        map.textContent = "Carte";
        tips.textContent = "Découvrez comment vous pouvez aider les " + animalData["listCities"][0]["categorie"].toLowerCase() + " ?";
        vus.textContent = animalData["listCities"][0]["nb_obs"];
        img.src = "img/animals/" + animalData["id"] + ".jpg";
        imgDiv.style.minHeight = '41vh';
        imgDiv.style.maxHeight = '41vh';
        imgDiv.style.maxWidth = '100vw';
        imgDiv.style.width = "auto";
        imgDiv.style.zIndex = "200";
        copyright.textContent = animalData["copyright"];
    }


    /* quit the pop-up */
    async function quitPopUp(){
        const mainDiv = document.getElementById("main");
        const popDiv = document.getElementById("pop-up");
        const quitButton = document.getElementById("quit");
        quitButton.addEventListener("click", function(){
            mainDiv.style.display = "block";
            popDiv.style.display = "none";
        })
    }
    /* put the pop-up visible */
    async function selectAnimal(){
        const mainDiv = document.getElementById("main");
        const popDiv = document.getElementById("pop-up");
        const buttons = document.getElementsByClassName("animalButton");
        for (let i = 0; i < buttons.length; i++) {
            buttons.item(i).addEventListener("click", function(){
                mainDiv.style.display = "none";
                popDiv.style.display = "block";
                getInfoPage(buttons.item(i).id, commune);
            });
        }
    }

    await selectAnimal();
    await quitPopUp();
}

animalCategoryJS();
