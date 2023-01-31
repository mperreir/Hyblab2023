function onCheck(evnt) {
    const checkbox = evnt.target;
    const currentLi = checkbox.parentNode;

    // TODO : Évenements d'animation à choisir + ajout dans la liste de filtre
    if(checkbox.checked) {
        currentLi.classList.add("checked-theme");
    } else {
        currentLi.classList.remove("checked-theme");
    }
}

function onClickProfilsEnregistre(evt) {
    window.location
}

document.addEventListener("DOMContentLoaded", function() {
    const themesCheckboxes = document.querySelectorAll('#theme-selector ul li');
    const btnProfilsEnregistre = document.querySelector('#profils-enr');

    themesCheckboxes.forEach(tb => {
        tb.addEventListener('change', onCheck);
    });

    btnProfilsEnregistre.addEventListener('click', onClickProfilsEnregistre)
});