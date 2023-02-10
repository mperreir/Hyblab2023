async function recupThemes(){
const response = await fetch("./api/themes");
if (response.status != 200) {
    console.log('Error theme not found');
    console.log('tkt cest normal cest en travaux ici, rien nest fini');
}
else{
    const data = await response.json();
    let initiativeTab = recupInitiatives(data);
    return initiativeTab;
}
}

async function recupInitiatives(data){

let difficulte = ["facile", "difficile"];
let initiativeTab = [];
for (let i = 0 ; i < data.length ; i ++){
    for (let j = 0 ; j < difficulte.length ; j++){
    const response = await fetch("./api/initiative/" + data[i] + "/" + difficulte[j]);
    if (response.status != 200) {
        console.log('Error initiative not found');
        console.log('tkt cest normal cest en travaux ici, rien nest fini');
    }
    else{
        const initiative = await response.json();
        initiative.theme = data[i];
        initiativeTab.push(initiative);
    }
    }
}
return initiativeTab;
}


function getInitiative(){
    let tabMarker = [];
    tabFeature
        .then(r=> {
            for (let i = 0 ; i < r.length ; i++){
                console.log(r[i]);
                tabMarker.push(r[i]);
            }
            constructHTML(tabMarker);
        });
        console.log(tabMarker)

}

function getInitiativeName(initiativeTab){
    let result = [];
    for (let i = 0 ; i < initiativeTab.length ; i ++){
        result.push(initiativeTab[i].nom);
    }
    return result;
}




function constructHTML(tabMarker){
    const ulBalise = document.querySelector("#initiativeListConteneur");
    ulBalise.style.display = "none";
    for (let i = 0 ; i < tabMarker.length ; i++){
        let liBalise = document.createElement("li");
        liBalise.innerHTML = tabMarker[i].initiative;

        //Add event listener to open 1 popup and close all other
        liBalise.addEventListener("click", () => {            
            createPopup(tabMarker[i].feature);
            tabMarker[i].open = true;
        })

        ulBalise.appendChild(liBalise);
    }
}

function openCloseList(){
    const ulBalise = document.querySelector("#initiativeListConteneur");
    if (ulBalise.style.display == "none"){
        ulBalise.style.display = "flex";
        const baliseMap = document.getElementById("map");
        baliseMap.style.height = "50%";
    }
    else{
        ulBalise.style.display = "none";
        const baliseMap = document.getElementById("map");
        baliseMap.style.height = "90%";
    }

}

function backToPrincipal(){
    window.location.href = "../tips";
}

const baliseButton = document.querySelector("#activeListe");
baliseButton.addEventListener("click", openCloseList);
getInitiative();

const baliseRetour = document.querySelector("#retourPagePrincipal");
baliseRetour.addEventListener("click", backToPrincipal);


