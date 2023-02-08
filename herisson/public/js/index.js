'use strict';

let dataCommune = undefined;
//attendre x ms avant de lancer la recherche
let timeoutCommune;

document.querySelector("#rechercheCommune").addEventListener("keyup", async function (event) {
    const searchTerm = event.target.value;

    clearTimeout(timeoutCommune);

    timeoutCommune = setTimeout(async function () {

        if (!searchTerm) {
            document.querySelector("#autocompletionCom").innerHTML = '';
            return;
        }

        if (dataCommune === undefined) {
            dataCommune = await fetch(`http://127.0.0.1:8080/herisson/api/commune/autocomplete/${searchTerm}`)
            dataCommune = await dataCommune.json();
        }

        const autocompletionsCom = dataCommune.filteredNames.slice(0, 10);
        // Add container for autocompletion items
        document.querySelector("#autocompletionCom").innerHTML = `<div id="autoItemCom">${autocompletionsCom.map(name => `<div class="autoItemCom">${name}</div>`).join('')}</div>`;

// Set height and overflow for container
        document.querySelector("#autoItemCom").style.height = '225px';
        document.querySelector("#autoItemCom").style.overflowY = 'scroll';

// Listen for wheel or touch events on container
        document.querySelector("#autoItemCom").addEventListener("wheel", function (event) {
            this.scrollTop += event.deltaY;
        });
        const autocompletionItems = document.querySelectorAll(".autoItemCom");
        autocompletionItems.forEach(item => {
            item.addEventListener("click", function () {
                localStorage.setItem("commune", this.textContent);
                window.location.href = `commune.html`;
            });
        });
        timeoutCommune = null;
        dataCommune = undefined;
    }, 350);
});

let dataAnimaux = undefined;
let timeoutAnimaux;


document.querySelector("#rechercheAnimal").addEventListener("keyup", function (event) {
    const searchTerm = event.target.value;
    if (!searchTerm) {
        document.querySelector("#autocompletionAni").innerHTML = '';
        return;
    }
    // Make a GET request to the API endpoint
    fetch(`http://127.0.0.1:8080/herisson/api/animal/autocomplete/${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Do something with the data returned by the API
            const autocompletionsAni = data.filteredNames.slice(0, 3);
            document.querySelector("#autocompletionAni").innerHTML = autocompletionsAni.map(name => `<div class="autoItemAni">${name}</div>`).join('');
            const autocompletionItems = document.querySelectorAll(".autoItemAni");
            autocompletionItems.forEach(item => {
                item.addEventListener("click", function () {
                    localStorage.setItem("animal", this.textContent);
                    window.location.href = `animal.html`;
                });
            });
        })
        .catch(error => {
            console.error(error);
        });
});

