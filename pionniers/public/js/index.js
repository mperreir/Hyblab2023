"use strict";

/**
 * Créer un node HTML à partir d'une string
 * @param htmlString : string définition de la balise
 * @returns {ChildNode}
 */
function createElementFromHTML(htmlString) {
  let div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

/**
 * Supprime tous les element enfant d'un Node
 * @param node {Element}
 */
function removeAllChild(node) {
  while (node.firstChild) {
    node.removeChild(node.lastChild);
  }
}

function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function getFontClass(topic) {
  switch (topic) {
    case 'alimentation' :
      return 'orange-font';
    case 'economie_circulaire' :
      return 'caca-doie-font';
    case 'energie' :
      return 'vert-font';
    case 'industrie' :
      return 'turquoise-font';
    case 'mobilite' :
      return 'cyan-font';
    case 'numerique' :
      return 'bleu-clair-font';
  }
}

function getBackgroundClass(topic) {
  switch (topic) {
    case 'alimentation' :
      return 'orange-bg';
    case 'economie_circulaire' :
      return 'caca-doie-bg';
    case 'energie' :
      return 'vert-bg';
    case 'industrie' :
      return 'turquoise-bg';
    case 'mobilite' :
      return 'cyan-bg';
    case 'numerique' :
      return 'bleu-clair-bg';
  }
}

/**
 * Donne la liste des Ids des profils favoris, liste vide si pas de profils  fav
 * @returns {string[]|*[]}
 */
function getProfilsFav() {
  const profFav = window.localStorage.getItem("profilsFavoris");
  if(profFav) {
    return profFav.split(',');
  } else {
    return [];
  }
}

function pushProfilFav(id) {
  if (getProfilsFav().includes(id)) {
    return;
  }
  const profFav = getProfilsFav();
  profFav.push(id);
  window.localStorage.setItem("profilsFavoris", profFav.toString());
}

function removeProfilFav(id) {
  const profFav = getProfilsFav();
  profFav.splice(profFav.indexOf(id), 1);
  window.localStorage.setItem("profilsFavoris", profFav.toString());
}

function displayErrorModal() {
  // Display the overlay
  const overlay = document.querySelector("div#overlay");
  overlay.classList.remove("display-none");
  // Display the popup
  const popup = document.querySelector("div#popup");
  popup.classList.remove("display-none");
  document.querySelector('div#popup img#fermeture-popup').addEventListener('click', () => {
    // Undisplay the overlay
    document.querySelector('div#overlay').classList.add('display-none');
    // Undisplay the popup
    document.querySelector('div#popup').classList.add('display-none');
  });
}

/**
 * Supprime tous les objets avec un attribut ayant une valeur incluse dans un array fournis
 * @param fieldName {string} nom de l'attribut/champ à traiter
 * @param objectArray {Array} array d'objet, comportant au moins un champ de nom fieldName
 * @param array2 {Array}
 * @returns {*[]}
 */
function removeAllItemCorrespondingToField(fieldName, objectArray, array2) {
  let arrayFiltered = [];

  objectArray.forEach(item => {
    let aucuneCorrespondance = true;
    array2.forEach(value => {
      if(item[fieldName] === value) {
        aucuneCorrespondance = false;
      }
    });
    if(aucuneCorrespondance) {
      arrayFiltered.push(item);
    }
  });
  return arrayFiltered;
}