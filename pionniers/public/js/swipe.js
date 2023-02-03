let themeSelected = [];
let carrouselPointer = 5;

let carouselList = document.querySelector('.carousel-list');
let carouselItems = document.querySelectorAll('.carousel-item');
let elems = Array.from(carouselItems);
const swiperSection = document.querySelector('#swiper');

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

function createKeywordItem(Keyword) {
    const htmlString = `<div class="keyword-item">
                            <p>#${Keyword}</p>
                        </div>`;

    return createElementFromHTML(htmlString);
}

function tranlateThemeToSimpleChar(topic) {
    switch (topic) {
        case 'alimentation' :
            return 'alimentation';
        case 'économie circulaire' :
            return 'economie_circulaire';
        case 'énergie' :
            return 'energie';
        case 'industrie' :
            return 'industrie';
        case 'mobilité' :
            return 'mobilite';
        case 'numérique' :
            return 'numerique';
            
    }
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

function createFiche(profil, dataPos) {
    const { Id, Age, City, Company, Keywords, MiniBio, Name, Status, Topic, URLImage } = profil;
    const tranlatedSimpleTopic = tranlateThemeToSimpleChar(Topic);
    const fontClass = getFontClass(tranlatedSimpleTopic);
    const htmlString = `<li class="carousel-item flex-column align-items-center justify-content-space-between" data-pos="${dataPos}" data-id="${Id}">
                            <section class="photo-case">
                                <img alt="photo-profil" src="${URLImage}">
                            </section>
                            <section class="information-fiche flex-column justify-content-space-evenly">
                                <section class="carte-identite flex-column align-items-center-flex-start ${fontClass}">
                                    <p class="gras">${Name}</p>
                                    <p class="gras">${Age}</p>
                                </section>
                                <section class="entreprise-info">
                                    <p class="gras">${Status}</p>
                                    <p class="gras">${Company}</p>
                                    <p>${City}</p>
                                    <p>${MiniBio}</p>
                                </section>
                                <section class="keywords flex-row">
                                    <!-- Section qui va se remplir dans la suite de la fonction -->
                                </section>
                                <section class="topic flex-row align-items-center">
                                    <img src="../img/pictogrammes_themes/${tranlatedSimpleTopic}.svg" alt="${tranlatedSimpleTopic}">
                                    <p class="${fontClass} gras">${capitalizeFirstLetter(Topic)}</p>
                                </section>
                            </section>
                        </li>`;
    const ficheProfil = createElementFromHTML(htmlString);
    const keywordsSplit = Keywords.split(';');
    const keywordList = ficheProfil.querySelector(".keywords");
    keywordsSplit.forEach(k => keywordList.append(createKeywordItem(k)));
    return ficheProfil;
}

function recreateProfileDeck(profilTrouve) {
    const carrousel = document.querySelector('#swiper ul');
    removeAllChild(carrousel);
    for(let i = -2; i < 3; i++) {
        carrousel.append(createFiche(profilTrouve[i + 2], i));
    }
}

async function chercheEtAjouteProfils(themeSelected) {
    const baseURL = document.location.origin;
    const profilTrouve = await fetch(baseURL + "/pionniers/api/miniature/topics/" + generateApiParameters(themeSelected)).then(r => r.json());
    console.log(profilTrouve);
    recreateProfileDeck(profilTrouve);

    carouselList = document.querySelector('.carousel-list');
    carouselItems = document.querySelectorAll('.carousel-item');
    elems = Array.from(carouselItems);
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

    await chercheEtAjouteProfils(themeSelected);
}

function onClickProfilsEnregistre() {
    window.location.href = "./profils-enregistres.html";
}
function ajouterNouvelleFiche(posFicheASuppr) {
    const ficheA = document.querySelector('.carousel-item[data-pos="2"]');

    carouselList = document.querySelector('.carousel-list');
    carouselItems = document.querySelectorAll('.carousel-item');
    elems = Array.from(carouselItems);
}
document.addEventListener("DOMContentLoaded", async function () {

    const themesCheckboxes = document.querySelectorAll('#theme-selector ul li');
    const profilsEnregistre = document.querySelector('footer');

    themesCheckboxes.forEach(tb =>
        tb.addEventListener('click', onCheck)
    );

    profilsEnregistre.addEventListener('click', onClickProfilsEnregistre);

    await chercheEtAjouteProfils(themeSelected);
});

swiperSection.addEventListener('click', function (event) {
    let newActive;
    const wWidth = window.innerWidth;
    const xClick = event.clientX;

    if(xClick > (wWidth / 2)) {
        newActive = carouselList.querySelector('.carousel-item[data-pos="1"]');
    } else {
        newActive = carouselList.querySelector('.carousel-item[data-pos="-1"]');
    }

    update(newActive);

    //ajouterNouvelleFiche(newActive.dataset.pos);
});

function update(newActive) {
    const newActivePos = newActive.dataset.pos;

    if(newActivePos !== '0') {  // Pas de défilement si on click sur l'active (celle du milieu)

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


}
const getPos = function (current, active) {
    const diff = current - active;

    if (Math.abs(current - active) > 2) {
        return -current
    }

    return diff;
}