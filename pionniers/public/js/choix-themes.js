let themeSelected = [];

function ajouteTheme(theme) {
    themeSelected.push(theme);
    window.localStorage.setItem('themes', themeSelected.toString());
}

function supprimeTheme(theme) {
    themeSelected.splice(themeSelected.indexOf(theme), 1);
    window.localStorage.setItem('themes', themeSelected.toString());
}

/**
 * Évenement déclenché lors de la selection du thème
 * @param event {Event} l'événement correspondant au cochage/décochage du thème
 */
function onCheck(event) {
    let themeBtn = event.target;

    while (themeBtn.tagName !== 'LI') {
        themeBtn = themeBtn.parentNode;
    }

    let themeName = themeBtn.querySelector("img");
    themeName = themeName.getAttribute('alt');

    if (themeBtn.classList.contains("unchecked")) {
        ajouteTheme(themeName);
        themeBtn.classList.remove("unchecked");

    } else {
        supprimeTheme(themeName);
        themeBtn.classList.add("unchecked");
    }

}


document.addEventListener("DOMContentLoaded", function() {
    const themes = document.querySelectorAll('#liste-theme ul li');

    themes.forEach((t) => {
        t.addEventListener('click', onCheck);
    });
});