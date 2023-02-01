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

const state = {};
const carouselList = document.querySelector('.carousel__list');
const carouselItems = document.querySelectorAll('.carousel__item');
const elems = Array.from(carouselItems);

carouselList.addEventListener('click', function (event) {
    var newActive = event.target;
    var isItem = newActive.closest('.carousel__item');

    if (!isItem || newActive.classList.contains('carousel__item_active')) {
        return;
    };

    update(newActive);
});

const update = function(newActive) {
    const newActivePos = newActive.dataset.pos;

    const current = elems.find((elem) => elem.dataset.pos == 0);
    const prev = elems.find((elem) => elem.dataset.pos == -1);
    const next = elems.find((elem) => elem.dataset.pos == 1);
    const first = elems.find((elem) => elem.dataset.pos == -2);
    const last = elems.find((elem) => elem.dataset.pos == 2);

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