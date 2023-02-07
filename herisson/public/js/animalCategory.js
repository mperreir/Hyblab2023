const animaldata = "Mammifère";
const commune = "Bordeaux";
const footercontainer = document.getElementById("footerText")
const h1container = document.getElementById("category")
const citycontainer = document.getElementById("commune")

const dataTest = ["animal1", "animal2", "animal3", "animal4", 1 , 2, 3, 4, 5, 6, 7, 8, 9];
const buttonContainer = document.getElementById("animals-buttons");

const main = document.querySelector("main.main");
const footer = document.querySelector("footer.main")

h1container.textContent = animaldata;
citycontainer.textContent = commune;
newAnimalData = animaldata.toLowerCase();
footercontainer.textContent = "Comment aider ces " + newAnimalData + "s ?";
footercontainer.style.color= "#FBC5EB";



buttonContainer.style.width = "innerWidth";
buttonContainer.style.display = "flex";
buttonContainer.style.flexDirection = "column";

dataTest.forEach(function(item){
    const button = document.createElement("button");
    button.id = item;
    button.textContent = item;
    button.style.margin = "2vw 0";
    buttonContainer.appendChild(button);
});


main.style.minHeight = `${buttonContainer.offsetHeight + footer.offsetHeight}px`;



