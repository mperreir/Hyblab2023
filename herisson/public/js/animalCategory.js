const animaldata = "Oiseaux";
const commune = "16007";
const db = "data/db.json";
const dbAdd = "data/additionalDB.json";
const currentURL = window.location.href;
console.log(currentURL);
async function animalCategory() {
    /*function to create a dictionary of the wanted animals*/
    async function getData(dbPath) {
        const response = await fetch(dbPath);
        const data1 = await response.json();
        return data1[commune][animaldata];
    }

    /*call it*/
    const dataTest = await getData(db);
    console.log(dataTest);

    const footercontainer = document.getElementById("footerText")
    const h1container = document.getElementById("category")
    const citycontainer = document.getElementById("commune")
    const buttonContainer = document.getElementById("animals-buttons");

    const main = document.querySelector("main.main");
    const footer = document.querySelector("footer.main")

    h1container.textContent = animaldata.split(" ").shift();
    citycontainer.textContent = commune;
    footercontainer.textContent = "Comment aider ces " + animaldata.toLowerCase() + " ?";
    footercontainer.style.color = "#FBC5EB";

    buttonContainer.style.width = "innerWidth";
    buttonContainer.style.display = "flex";
    buttonContainer.style.flexDirection = "column";

    /*create each animal's buttons */
    for (const key in dataTest) {
        const button = document.createElement("button");
        button.className = "animalButton";
        if(dataTest[key]["nom_vern"] == null){
            animalName = dataTest[key]["lb_nom"];
        } else {
            animalName = dataTest[key]["nom_vern"];
        }
        button.id = animalName;
        button.textContent = animalName;
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

    /* put the pop-up visible */
    async function selectAnimal(){
        const mainDiv = document.getElementById("main");
        const popDiv = document.getElementById("pop-up");
        const buttons = document.getElementsByClassName("animalButton");
        for (let i = 0; i < buttons.length; i++) {
            buttons.item(i).addEventListener("click", function(){
                mainDiv.style.display = "none";
                popDiv.style.display = "block";
            });
        }
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

    await selectAnimal();
    await quitPopUp();
}

animalCategory();