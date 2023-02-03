const themeSelected = [];
function onCheck(evnt) {
    const themeImg = evnt.target;  // La cible est l'image dans la <li>
    const themeString = themeImg.getAttribute('alt');

    console.log("themeSelected :", themeSelected);

    if(themeImg.classList.contains("unchecked")) {
        themeImg.classList.remove("unchecked");
        themeSelected.add(themeString);
    } else {
        themeImg.classList.add("unchecked");
        themeSelected.remove(themeString);
    }

    // TODO : Appel à l'API pour recréer un jeu de profils, suivant les nouveaux thèmes sélectionnés
}

document.addEventListener("DOMContentLoaded", function() {
    const themesCheckboxes = document.querySelectorAll('#theme-selector ul li');

    themesCheckboxes.forEach(tb =>
        tb.addEventListener('click', onCheck)
    );
});