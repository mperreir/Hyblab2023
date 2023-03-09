async function animalInfo(animal) {
    /*function to get the datas of a given animal */
    async function getData(taxon) {
        return await
            fetch(`/herisson/api/animal/${taxon}`)
                .then(response => response.json())
                .then(data => {
                        return data.filteredData[taxon];
                    }
                );
    }

    /*call it*/
    const dataTest = await getData(animal);

    const animalName = document.getElementById("animal-name");
    const desc = document.getElementById("desc");
    const menace = document.getElementById("menace-level");
    const map = document.getElementById("map");
    const tips = document.getElementById("tips-text");
    const imgDiv = document.getElementById("picture-div")
    const img = document.getElementById("animal-picture");
    const copyright = document.getElementById("copyright");
    const tipsButton = document.getElementById("fleche2");
    const quit = document.getElementById("quit");

    animalName.textContent = animal.toUpperCase();
    desc.textContent = "Les " + dataTest["listCities"][0]["categorie"].toLowerCase();
    if (dataTest["listCities"][0]["enjeu_conservation"] == null){
        menace.textContent = "INCONNU"
    } else {
        menace.textContent = dataTest["listCities"][0]["enjeu_conservation"].toUpperCase();
    }

    // add an image as a background of the map button
    map.style.backgroundImage = "url('./img/map.png')";
    map.style.backgroundSize = "cover";
    map.textContent = "Voir la carte";
    map.classList.add("btn", "btn-primary", "btn-lg", "btn-block");
    map.onclick = function () {
        // save the animal name in the local storage
        localStorage.setItem("animal", animal);
        window.location.href = "map.html";
    };


    tips.textContent += dataTest["listCities"][0]["categorie"].toLowerCase() + " ?";
    img.src = "img/animals/" + dataTest["id"] + ".jpg";
    imgDiv.style.minHeight = '41vh';
    imgDiv.style.maxHeight = '41vh';
    imgDiv.style.maxWidth = '100vw';
    imgDiv.style.width = "auto";
    imgDiv.style.zIndex = "200";
    copyright.textContent = dataTest["copyright"];

    tipsButton.classList.add("btn", "btn-primary", "btn-lg", "btn-block");
    tipsButton.onclick = function () {
        localStorage.setItem("category", dataTest["listCities"][0]["categorie"])
        window.location.href = "commentAider.html"
    }

    async function quitPage(){
        quit.addEventListener("click", function(){
            window.history.back();
        })
    }
    await quitPage();
}
