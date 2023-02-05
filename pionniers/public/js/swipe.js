let themeSelected = [];
let profilsTrouves;

let carouselList = document.querySelector('.carousel-list');
let carouselItems = document.querySelectorAll('.carousel-item');
let elems = Array.from(carouselItems);
const swiperSection = document.querySelector('#swiper');

function ajouteTheme(theme) {
    themeSelected.push(theme);
    //window.localStorage.setItem('themes', themeSelected.toString());
}

function supprimeTheme(theme) {
    themeSelected.splice(themeSelected.indexOf(theme), 1);
    //window.localStorage.setItem('themes', themeSelected.toString());
}

/**
 * Créer une string traduisant les choix de thème pour l'API
 * @param themeSelected {Array} thèmes choisis
 * @returns {string}
 */
function generateApiParameters(themeSelected) {
    const theme = ["alimentation", "economie_circulaire", "energie", "industrie", "mobilite", "numerique"]
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

/**
 * Créer un element représentant un mot clé de profil
 * @param Keyword {string} le mot clé
 * @returns {ChildNode} Node HTML
 */
function createKeywordItem(Keyword) {
    const htmlString = `<div class="keyword-item flex-row align-items-center">
                            <p>#${Keyword}</p>
                        </div>`;

    return createElementFromHTML(htmlString);
}

/**
 * Simplifie l'écriture litérale d'un thème (supprime les accents et espace)
 * @param topic
 * @returns {string}
 */
function translateThemeToSimpleChar(topic) {
    topic = topic.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    topic = topic.replace(/\s/g, '_');
    return topic;
}

/**
 * Donne la bonne classe de police d'écriture suivant le thème donné
 * @param topic {string} thème
 * @returns {string} classe correspondant au thème
 */
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

/**
 * Créer une fiche (balise <li>), utilisé comme élements dans le carrousel
 * @param profil {Object} le profil, avec Id, Age, City, Company, Keywords, MiniBio, Name, Status, Topic, URLImage comme attributs
 * @param dataPos {number} la position de la fiche dans le carrousel
 * @returns {ChildNode} node HTML
 */
function createFiche(profil, dataPos) {
    // Récupération des attributs de l'objet profil (par méthode destructuring)
    const { Id, Age, City, Company, Keywords, MiniBio, Name, Status, Topic, URLImage } = profil;
    // Simplification du thème (pas d'accents et d'espace)
    const tranlatedSimpleTopic = translateThemeToSimpleChar(Topic);
    // Récupération de la classe relative à la couleur de la police du theme
    const fontClass = getFontClass(tranlatedSimpleTopic);
    // Node HTML
    const htmlString = `<li class="carousel-item flex-column align-items-center justify-content-space-between" data-pos="${dataPos}" data-id="${Id}">
                            <section class="photo-case">
                                <img draggable="false" alt="photo-profil" src="${URLImage}">
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
    // Ajout des éléments relatifs aux mots clés dans la fiche précédente, dans la section prévue
    const keywordsSplit = Keywords.split(';');
    const keywordList = ficheProfil.querySelector(".keywords");
    keywordsSplit.forEach(k => {
        if(k.trim() !== '') {   // Pour éviter bug mots clés vides
            keywordList.append(createKeywordItem(k));
        }
    });
    return ficheProfil;
}

/**
 * Recrée le contenu du carousel avec les profils trouvés
 * Seuls les 5 premiers élement de l'array profilsTrouves seront comptabilisés
 * @param profilsTrouves {Array}
 */
function recreeCarouselDeck(profilsTrouves) {
    const carousel = document.querySelector('#swiper ul');

    // Remise à 0 du contenu du carousel (utile dans le cas où il y avait déjà des fiches avant)
    removeAllChild(carousel);

    // Remplissage du carrousel de 5 fiches
    for(let i = -2; i < 3; i++) {
        carousel.append(createFiche(profilsTrouves[i + 2], i));
    }
}

/**
 * Rempli le carousel avec les fiches des profils trouvé suivant les thèmes choisis
 * @param themeSelected {Array} thèmes sélectionnés
 * @param shuffleResults {boolean} résultats mélangés aléatoirement
 * @returns {Promise<void>}
 */
async function chercheEtAjouteProfilsCarousel(themeSelected, shuffleResults) {
    const baseURL = document.location.origin;

    // Appel API
    profilsTrouves = await fetch(baseURL + "/pionniers/api/miniature/topics/" + generateApiParameters(themeSelected)).then(r => r.json());

    if(shuffleResults) {    // Tri aléatoire si souhaité
        profilsTrouves = profilsTrouves.sort(() => 0.5 - Math.random());
    }

    // Recrée le contenu du carousel avec les fiches des profils trouvés
    // (seules les 5 premières sont nécessaires pour avoir un carrousel complet)
    recreeCarouselDeck(profilsTrouves.slice(0, 5));

    // Met à jour l'état du carrousel
    miseAJourEtatCarousel();
}

/**
 *
 * @param evnt {Event}
 * @returns {Promise<void>}
 */
async function onCheck(evnt) {
    let themeLi = evnt.target;
    // Remonte jusqu'à la <li> dans le cas où la cible est l'image
    while (themeLi.tagName !== 'LI') {
        themeLi = themeLi.parentNode;
    }
    let themeString = themeLi.querySelector('img');
    themeString = themeString.getAttribute('alt');

    if (themeLi.classList.contains("unchecked")) {
        themeLi.classList.remove("unchecked");
        ajouteTheme(themeString);
    } else {
        themeLi.classList.add("unchecked");
        supprimeTheme(themeString);
    }

    await chercheEtAjouteProfilsCarousel(themeSelected, true);

}

/**
 * Ajout d'une fiche unique au carrousel, suite à un mouvement gauche ou droite
 * @param clicADroite {boolean} true si le click provocant l'appel de cette fonction a été effectué sur la partie droite du swiper, false sinon
 */
function ajouterNouvelleFiche(clicADroite) {

    /*  - Si click à droite, la fiche à supprimer est celle à l'extreme gauche,
        qui passe alors à l'extrème droite suite à la rotation, donc la position 2
        - Même logique à l'inverse pour le click à gauche
       */
    let posFicheASuppr = clicADroite ? 2 : -2;
    const ficheASuppr = document.querySelector(`.carousel-item[data-pos="${posFicheASuppr}"]`);
    const idFicheASuppr = ficheASuppr.dataset.id;

    // Suppression de la fiche à supprimer dans le carrousel
    carouselList.removeChild(ficheASuppr);

    // Recherche dans la liste de résultats (profilsTrouves) la position du profil supprimé juste avant
    const indexProfilSuppr = profilsTrouves.findIndex(pr => pr.Id === idFicheASuppr);
    // L'index du nouveau profil à ajouter est celui supprimé + ou - 5 (nombre de fiche dans le carrousel) suivant le mouvement, de manière cyclique
    const indexNouveauProfil = clicADroite ? (indexProfilSuppr + 5) % profilsTrouves.length : (indexProfilSuppr - 5 + profilsTrouves.length) % profilsTrouves.length;

    // Ajout du nouveau la fiche du nouveau profil
    const newProfil = profilsTrouves[indexNouveauProfil];
    carouselList.append(createFiche(newProfil, posFicheASuppr));

    miseAJourEtatCarousel();

}

/**
 * Met à jour les nodes relatifs au carousel, utilisés pour le calcul du mouvement de rotation
 */
function miseAJourEtatCarousel() {
    carouselList = document.querySelector('.carousel-list');
    carouselItems = document.querySelectorAll('.carousel-item');
    elems = Array.from(carouselItems);
}


// -----------------------------------------------------
// ------ FONCTION RELATIVES AU CAROUSEL / SWIPER ------
// -----------------------------------------------------

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

        item.dataset.pos = getNewPos(itemPos, newActivePos)
    });


}
const getNewPos = function (current, active) {
    const diff = current - active;
    if (Math.abs(diff) > 2) {
        return -current
    }
    return diff;
}

swiperSection.addEventListener('click', function (event) {
    let newActive;
    const wWidth = window.innerWidth;
    const xClick = event.clientX;
    const clicADroite = xClick > (wWidth / 2);

    if(clicADroite) {
        newActive = carouselList.querySelector('.carousel-item[data-pos="1"]');
    } else {
        newActive = carouselList.querySelector('.carousel-item[data-pos="-1"]');
    }

    update(newActive);

    ajouterNouvelleFiche(clicADroite);
});

// -----------------------------------------------------

// AU CHARGEMENT DE LA PAGE
document.addEventListener("DOMContentLoaded", async function () {

    const themesCheckboxes = document.querySelectorAll('#theme-selector ul li');
    const profilsEnregistresFolder = document.querySelector('footer#folder');
    const nombreProfilsEnregistres = profilsEnregistresFolder.querySelector('#nombre-profil');
    const nombreProfilsEnregistresText = profilsEnregistresFolder.querySelector('#nombre-profil p');

    // Listener de click pour chaque filtre-theme

    // Récupération des thèmes déjà choisis dans la page précédente
    let themeSelected = window.localStorage.getItem('themes');
    themeSelected = themeSelected ? themeSelected.split(',') : [];

    themesCheckboxes.forEach(tc =>
        tc.addEventListener('click', onCheck)
    );

    themesCheckboxes.forEach(tc => {
            const img = tc.querySelector('img');
            const themeName = img.getAttribute('alt');
            if(themeSelected.includes(themeName)) {
                tc.classList.remove('unchecked');
            }
        }
    );

    // Vers page profils enregistre
    profilsEnregistresFolder.addEventListener('click', () => window.location.href = "./profils-enregistres.html");

    // Remplissage du carousel/swiper avec les données de l'API, suivant les themes choisis
    await chercheEtAjouteProfilsCarousel(themeSelected, true);


    //const idsProfilsEnregistres = window.localStorage.getItem('truc');
    const idsProfilsEnregistres = [2]; // Test
    if(idsProfilsEnregistres.length > 0) {
        nombreProfilsEnregistresText.innerHTML = idsProfilsEnregistres.length.toString();
    } else {
        nombreProfilsEnregistres.classList.add('display-none');
        nombreProfilsEnregistres.classList.remove('flex-row');
    }



});