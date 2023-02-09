'use strict';

let dataCommune = undefined;

document.querySelector("#rechercheCommune").addEventListener("keyup", async function (event) {
    const searchTermCom = event.target.value;

    if (!searchTermCom) {
        document.querySelector("#autocompletionCom").innerHTML = '';
        document.querySelector("#autocompletionCom").style.display = `none`;
        document.querySelector("#searchAnimal").style.display = `block`;
        return;
    }

    if (dataCommune === undefined) {
        dataCommune = await fetch(`https://hyblab.polytech.univ-nantes.fr/herisson/api/commune/autocomplete/${searchTermCom}`)
        dataCommune = await dataCommune.json();
    }

    let autocompletionsCom = [];
    if (dataCommune && dataCommune.filteredNames) {
        autocompletionsCom = dataCommune.filteredNames.slice(0, 10);
    }
    let nbElemCom = autocompletionsCom.length;
    if (nbElemCom > 3) {
        nbElemCom = 3;
    }

    if (nbElemCom === 0) {
        document.querySelector("#autocompletionCom").innerHTML = '';
        document.querySelector("#autocompletionCom").style.display = `none`;
        document.querySelector("#searchAnimal").style.display = `block`;
    }
    else {
        document.querySelector("#searchAnimal").style.display = `none`;

        document.querySelector("#autocompletionCom").style.height = `${nbElemCom * 5}vh`;
        document.querySelector("#autocompletionCom").style.display = 'block';
        document.querySelector("#autocompletionCom").innerHTML = `<div id="autoItemCom">${autocompletionsCom.map(name => `<div class="autoItemCom">${name}</div>`).join('')}</div>`;

        document.querySelector("#autoItemCom").style.height = `${nbElemCom * 5}vh`;
        document.querySelector("#autoItemCom").style.overflowY = 'scroll';

        document.querySelector("#autoItemCom").addEventListener("wheel", function (event) {
            this.scrollTop += event.deltaY;
        });
        const autocompletionItems = document.querySelectorAll(".autoItemCom");
        autocompletionItems.forEach(item => {
            item.addEventListener("click", function () {
                document.querySelector("#rechercheCommune").value = this.textContent;
                document.querySelector("#autocompletionCom").innerHTML = '';
                document.querySelector("#searchCommune").submit();
                document.querySelector("#rechercheCommune").value = '';
            });
        });
    }
    dataCommune = undefined;
});


let dataAnimaux = undefined;

document.querySelector("#rechercheAnimal").addEventListener("keyup", async function (event) {
    const searchTermAni = event.target.value;

    if (!searchTermAni) {
        document.querySelector("#autocompletionAni").innerHTML = '';
        document.querySelector("#autocompletionAni").style.display = `none`;
        return;
    }

    if (dataAnimaux === undefined) {
        dataAnimaux = await fetch(`https://hyblab.polytech.univ-nantes.fr/herisson/api/animal/autocomplete/${searchTermAni}`)
        dataAnimaux = await dataAnimaux.json();
    }

    let autocompletionsAni = [];
    if (dataAnimaux && dataAnimaux.filteredNames) {
        autocompletionsAni = dataAnimaux.filteredNames.slice(0, 10);
    }
    let nbElemAni = autocompletionsAni.length;
    if (nbElemAni > 3) {
        nbElemAni = 3;
    }

    if (nbElemAni === 0) {
        document.querySelector("#autocompletionAni").innerHTML = '';
        document.querySelector("#autocompletionAni").style.display = `none`;
    }
    else {
        document.querySelector("#autocompletionAni").style.height = `${nbElemAni * 5}vh`;
        document.querySelector("#autocompletionAni").style.display = 'block';
        document.querySelector("#autocompletionAni").innerHTML = `<div id="autoItemAni">${autocompletionsAni.map(name => `<div class="autoItemAni">${name}</div>`).join('')}</div>`;

        document.querySelector("#autoItemAni").style.height = `${nbElemAni * 5}vh`;
        document.querySelector("#autoItemAni").style.overflowY = 'scroll';

        document.querySelector("#autoItemAni").addEventListener("wheel", function (event) {
            this.scrollTop += event.deltaY;
        });
        const autocompletionItems = document.querySelectorAll(".autoItemAni");
        autocompletionItems.forEach(item => {
            item.addEventListener("click", function () {
                document.querySelector("#rechercheAnimal").value = this.textContent;
                document.querySelector("#autocompletionAni").innerHTML = '';
                document.querySelector("#searchAnimal").submit();
                document.querySelector("#rechercheAnimal").value = '';
            });
        });
    }
    dataAnimaux = undefined;
});
