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

function onClickProfilsEnregistre() {
    window.location.href = "./profils-enregistres.html"
}

document.addEventListener("DOMContentLoaded", function() {

    const themesCheckboxes = document.querySelectorAll('#theme-selector ul li');
    const profilsEnregistre = document.querySelector('footer');

    themesCheckboxes.forEach(tb =>
        tb.addEventListener('click', onCheck)
    );

    profilsEnregistre.addEventListener('click', onClickProfilsEnregistre)
});

const state = {};
const carouselList = document.querySelector('.carousel__list');
const carouselItems = document.querySelectorAll('.carousel__item');
const elems = Array.from(carouselItems);

carouselList.addEventListener('click', function (event) {
    var newActive = event.target;
    var isItem = newActive.closest('.carousel__item');

    if (!isItem || newActive.classList.contains('carousel__item_active')) {
        return;
    }

    update(newActive);
});

const update = function(newActive) {
    const newActivePos = newActive.dataset.pos;

    const current = elems.find((elem) => elem.dataset.pos === 0);
    const prev = elems.find((elem) => elem.dataset.pos === -1);
    const next = elems.find((elem) => elem.dataset.pos === 1);
    const first = elems.find((elem) => elem.dataset.pos === -2);
    const last = elems.find((elem) => elem.dataset.pos === 2);

    current.classList.remove('carousel__item_active');

    [current, prev, next, first, last].forEach(item => {
        var itemPos = item.dataset.pos;

        item.dataset.pos = getPos(itemPos, newActivePos)
    });
};

const getPos = function (current, active) {
    const diff = current - active;

    if (Math.abs(current - active) > 2) {
        return -current
    }

    return diff;
}