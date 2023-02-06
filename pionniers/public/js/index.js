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