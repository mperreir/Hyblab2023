let themeSelected = [];
let carrouselPointer = 0;

function generateApiParameters(themeSelected) {
    const theme = ["alimentation", "économie circulaire", "énergie", "industrie", "mobilité", "numérique"]
    let parameterString = "";
    for(let i = 0; i < 6; i++) {
        if(themeSelected.includes(theme[i])) {
            parameterString += "true";
        } else {
            parameterString += "false";
        }
        parameterString += "/";
    }

    if(parameterString === "false/false/false/false/false/false/") {
        parameterString = "true/true/true/true/true/true/"
    }

    return parameterString;
}

function removeAllChild(node) {
    while (node.firstChild) {
        node.removeChild(node.lastChild);
    }
}

function createFiche(profil, dataPos) {
    const { Age, City, Company, Id, Keywords, MiniBio, Name, Status, Topic, URLImage } = profil
    const htmlString = `<li class="carousel__item flex-column align-items-center justify-content-space-between" data-pos="${dataPos}">
                            <img alt="photo-profil" src="${URLImage}">
                            <section class="information-fiche">
                                <section class="carte-id flex-column align-items-center-flex-end">
                                    <p>${Name}</p>
                                    <p>${Age}</p>
                                </section>
                                <section class="entreprise-info">
                                    <p>${Status}</p>
                                    <p>${Company}</p>
                                    <p>${City}</p>
                                    <p>${MiniBio}</p>
                                </section>
                            </section>
                        </li>`;
    return createElementFromHTML(htmlString);
}

function recreateProfileDeck(profilTrouve) {
    const carrousel = document.querySelector('#swiper ul');
    removeAllChild(carrousel);
    for(let i = -2; i < 3; i++) {
        carrousel.append(createFiche(profilTrouve[i + 2], i));
    }
}
async function onCheck(evnt) {
    const themeImg = evnt.target;  // La cible est l'image dans la <li>
    const themeString = themeImg.getAttribute('alt');

    if (themeImg.classList.contains("unchecked")) {
        themeImg.classList.remove("unchecked");
        themeSelected.push(themeString);
    } else {
        themeImg.classList.add("unchecked");
        themeSelected.splice(themeSelected.indexOf(themeString), 1);
    }

    // TODO : Appel à l'API pour recréer un jeu de profils, suivant les nouveaux thèmes sélectionnés

    const baseURL = document.location.origin;
    const profilTrouve = await fetch(baseURL + "/pionniers/api/miniature/topics/" + generateApiParameters(themeSelected)).then(r => r.json());
    console.log(profilTrouve);
    recreateProfileDeck(profilTrouve);
}

function onClickProfilsEnregistre() {
    window.location.href = "./profils-enregistres.html";
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
    let newActive = event.target;
    // Si la target du click n'est pas la LI, on prend le parent qui sera la LI
    if(newActive.parentNode.tagName === "LI") {
        newActive = newActive.parentNode;
    }

    const isItem = newActive.closest('.carousel__item');

    if (!isItem || newActive.classList.contains('carousel__item_active')) {
        return;
    }

    update(newActive);
});

function update(newActive) {
    const newActivePos = newActive.dataset.pos;

    const first = elems.find((elem) => elem.dataset.pos === '-2');
    const prev = elems.find((elem) => elem.dataset.pos === '-1');
    const current = elems.find((elem) => elem.dataset.pos === '0');
    const next = elems.find((elem) => elem.dataset.pos === '1');
    const last = elems.find((elem) => elem.dataset.pos === '2');

    current.classList.remove('carousel__item_active');

    [current, prev, next, first, last].forEach(item => {
        let itemPos = item.dataset.pos;

        item.dataset.pos = getPos(itemPos, newActivePos)
    });
}

const getPos = function (current, active) {
    const diff = current - active;

    if (Math.abs(current - active) > 2) {
        return -current
    }

    return diff;
}