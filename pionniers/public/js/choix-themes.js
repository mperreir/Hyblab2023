function createThemeButton(nomTheme) {
    const htmlString = `<li class="theme flex-row justify-content-center">
                             <input type="checkbox" id="cb-${nomTheme}"><label for="cb-${nomTheme}">${nomTheme}</label>
                        </li>
                        `;
    return createElementFromHTML(htmlString);
}


/**
 * Évement déclenché lors de la selection du thème
 * @param evnt : event l'évenement correspondant au cochage/décochage du thème
 */
function onCheck(evnt) {
    const checkbox = evnt.target;
    const currentLi = checkbox.parentNode;
    const themeLabel = currentLi.querySelector("label");

    // TODO : Évenements d'animation à choisir + ajout dans la liste de filtre
    if(checkbox.checked) {
        console.log("Je suis checked");
        themeLabel.classList.add("checked-theme");
    } else {
        console.log("Je suis unchecked");
        themeLabel.classList.remove("checked-theme");
    }
}


document.addEventListener("DOMContentLoaded", function() {
    // TODO : Thèmes à récupérer depuis l'API de Marin (fonction fetch)
    const themesTest = ["écologie", "truc", "machin"];

    const listeThemes = document.querySelector('#liste-theme');

    themesTest.forEach((theme) => {
        console.log("Le thème est", theme);
        const customButton = createThemeButton(theme);
        customButton.addEventListener('change', onCheck);
        listeThemes.append(customButton);
    })
});