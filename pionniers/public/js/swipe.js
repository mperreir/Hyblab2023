let themeSelected = [];
let profilsTrouves;

let carouselList = document.querySelector('.carousel-list');
let carouselItems = document.querySelectorAll('.carousel-item');
let elems = Array.from(carouselItems);
const swiperSection = document.querySelector('#swiper');


/*  --------------------------------------------------------
    ------------------ CREATION DOM FICHE ------------------
    --------------------------------------------------------
 */

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

/*  ----------------------------------------------------------------
    ------------------ MANIPULATION LOCAL STORAGE ------------------
    ----------------------------------------------------------------
 */

function ajouteTheme(theme) {
    themeSelected.push(theme);
}

function supprimeTheme(theme) {
    themeSelected.splice(themeSelected.indexOf(theme), 1);
}

/**
 * Supprime tous les objets avec un attribut ayant une valeur incluse dans un array fournis
 * @param fieldName {string} nom de l'attribut/champ à traiter
 * @param objectArray {Array} array d'objet, comportant au moins un champ de nom fieldName
 * @param array2 {Array}
 * @returns {*[]}
 */
function removeAllItemCorrespondingToField(fieldName, objectArray, array2) {
    let arrayFiltered = [];

    objectArray.forEach(item => {
        let aucuneCorrespondance = true;
        array2.forEach(value => {
            if(item[fieldName] === value) {
                aucuneCorrespondance = false;
            }
        });
        if(aucuneCorrespondance) {
            arrayFiltered.push(item);
        }
    });
    return arrayFiltered;
}

function filterProfilsTrouves() {
    let idsProfilsFav = getProfilsFav();
    if(idsProfilsFav.length > 0) {
        profilsTrouves = removeAllItemCorrespondingToField("Id", profilsTrouves, idsProfilsFav);
    }
}

/*  ------------------------------------------------------------------
    ------------------ MISE À JOUR DES ELEMENTS DOM ------------------
    ------------------------------------------------------------------
 */

/**
 * Met à jour les nodes relatifs au carrousel, utilisés pour le calcul du mouvement de rotation
 */
function miseAJourEtatCarousel() {
    carouselList = document.querySelector('.carousel-list');
    carouselItems = document.querySelectorAll('.carousel-item');
    elems = Array.from(carouselItems);

    const cur = elems.find(elem => elem.getAttribute("data-pos") === '0');
    updateDownSwipeListener(cur);
}

/**
 * Recrée le contenu du carousel avec les profils trouvés
 * Seuls les 5 premiers élements de l'array profilsTrouves seront comptabilisés
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

    carouselItems.forEach(f => {
        if (f.dataset.pos === '-2' || f.dataset.pos === '2') {
            f.classList.remove('recreate-deck-animation-1');
        }

        if (f.dataset.pos === '-1' || f.dataset.pos === '1') {
            f.classList.remove('recreate-deck-animation-2');
        }

        if (f.dataset.pos === '0') {
            f.classList.remove('recreate-deck-animation-3');
        }
    });


    // Appel API
    profilsTrouves = await fetch(baseURL + "/pionniers/api/miniature/topics/" + generateApiParameters(themeSelected)).then(r => r.json());

    if (shuffleResults) {    // Tri aléatoire si souhaité
        profilsTrouves = profilsTrouves.sort(() => 0.5 - Math.random());
    }

    filterProfilsTrouves();

    // Recrée le contenu du carousel avec les fiches des profils trouvés
    // (seules les 5 premières sont nécessaires pour avoir un carrousel complet)
    recreeCarouselDeck(profilsTrouves.slice(0, 5));

    // Met à jour l'état du carrousel
    miseAJourEtatCarousel();

    carouselItems.forEach(f => {
        if (f.dataset.pos === '-2' || f.dataset.pos === '2') {
            f.classList.add('recreate-deck-animation-1');
        }

        if (f.dataset.pos === '-1' || f.dataset.pos === '1') {
            f.classList.add('recreate-deck-animation-2');
        }

        if (f.dataset.pos === '0') {
            f.classList.add('recreate-deck-animation-3');
        }
    });
}

function updateFolder() {
    const nombreProfilsFavText = document.querySelector('footer#folder #nombre-profil');
    const idsProfilsEnregistres = getProfilsFav();
    let nombreProfilFav = idsProfilsEnregistres.length;

    nombreProfilsFavText.innerHTML = nombreProfilFav > 0 ? nombreProfilFav.toString() : "";
}

/*  -------------------------------------------------
    ------------------ ÉVÉNEMENTS  ------------------
    -------------------------------------------------
 */


/**
 * Ajout d'une nouvelle fiche suite à un Swipe bas (enregistrement profil dans les fav)
 * @param idFicheSuppr {string} id de la fiche supprimée du carrousel (fiche enregistrée dans les fav)
 */
function ajouterNouvelleFicheSwipeBas(idFicheSuppr) {
    // Recherche dans la liste de résultats (profilsTrouves) la position du profil supprimé juste avant
    const indexProfilSuppr = profilsTrouves.findIndex(pr => pr.Id === idFicheSuppr);
    // Suppresion du profil dans la liste des prochains résultats
    profilsTrouves.splice(indexProfilSuppr, 1);

    const indexNouveauProfil = (indexProfilSuppr + 2) % profilsTrouves.length;

    // Ajout du nouveau la fiche du nouveau profil
    const newProfil = profilsTrouves[indexNouveauProfil];
    carouselList.append(createFiche(newProfil, '2'));

    miseAJourEtatCarousel();
}

/**
 * Ajout d'une fiche unique au carrousel, suite à un mouvement gauche ou droite
 * @param posNewActive {string} true si le click provocant l'appel de cette fonction a été effectué sur la partie droite du swiper, false sinon
 */
function ajouterNouvelleFiche(posNewActive) {

    /*  - Si click à droite, la fiche à supprimer est celle à l'extreme gauche,
        qui passe alors à l'extrème droite suite à la rotation, donc la position 2
        - Même logique à l'inverse pour le click à gauche
       */
    let posFicheASuppr = parseInt(posNewActive) * 2;
    const ficheASuppr = document.querySelector(`.carousel-item[data-pos="${posFicheASuppr}"]`);
    const idFicheASuppr = ficheASuppr.dataset.id;

    // Suppression de la fiche à supprimer dans le carrousel
    ficheASuppr.remove();

    // Recherche dans la liste de résultats (profilsTrouves) la position du profil supprimé juste avant
    const indexProfilSuppr = profilsTrouves.findIndex(pr => pr.Id === idFicheASuppr);
    // L'index du nouveau profil à ajouter est celui supprimé + ou - 5 (nombre de fiches dans le carrousel) suivant le mouvement, de manière cyclique
    const indexNouveauProfil = posNewActive === '1' ? (indexProfilSuppr + 5) % profilsTrouves.length : (indexProfilSuppr - 5 + profilsTrouves.length) % profilsTrouves.length;


    // Ajout du nouveau la fiche du nouveau profil
    const newProfil = profilsTrouves[indexNouveauProfil];
    carouselList.append(createFiche(newProfil, posFicheASuppr));

    miseAJourEtatCarousel();
}

function premiereVisite() {
    const popupTuto = document.querySelector("#tuto");
    popupTuto.classList.add('flex-column');
    popupTuto.classList.remove('display-none');
    const popupTutoASwipe = popupTuto.querySelector('#tuto-explication');
    const flecheGif = popupTuto.querySelector('img');

    const hammer = new Hammer(popupTutoASwipe)
    hammer.add(new Hammer.Pan({
        position: Hammer.position_ALL,
        threshold: 0
    }));

    hammer.on('pan', e => onPan(e));

    function onPan(e) {

        // remove transition properties
        popupTutoASwipe.style.transition = null

        // get top card coordinates in pixels
        let style = window.getComputedStyle(popupTutoASwipe);
        let mx = style.transform.match(/^matrix\((.+)\)$/);
        let startPosX = mx ? parseFloat(mx[1].split(', ')[4]) : 0;
        let startPosY = mx ? parseFloat(mx[1].split(', ')[5]) : 0;

        let bounds = popupTutoASwipe.getBoundingClientRect();

        // get finger position on top card, top (1) or bottom (-1)
        let isDraggingFrom = (e.center.y - bounds.top) > popupTutoASwipe.clientHeight / 2 ? -1 : 1

        // get new coordinates
        let posX = e.deltaX + startPosX
        let posY = e.deltaY + startPosY

        // get ratio between swiped pixels and the axes
        let propX = e.deltaX / popupTuto.clientWidth;
        let propY = e.deltaY / popupTuto.clientHeight;

        // get swipe direction, left (-1) or right (1)
        let dirX = e.deltaX < 0 ? -1 : 1;

        // get degrees of rotation, between 0 and +/- 45
        let deg = isDraggingFrom * dirX * Math.abs(propX) * 45

        if (e.isFinal) {
            let successful = false
            // check threshold and movement direction

            if (propY < 30 && e.direction === Hammer.DIRECTION_DOWN) {
                successful = true
                // get top border position
                posY = +(popupTuto.clientHeight + popupTutoASwipe.clientHeight)
            }

            if (successful) {
                popupTutoASwipe.style.transform = 'translateX(' + posX + 'px) translateY(' + (posY - 300) + 'px) rotate(' + deg + 'deg)';
                const folderBody = document.querySelector("footer#folder #folder-front-body");
                folderBody.classList.add("open-folder-animation");
                setTimeout(() => {

                    popupTuto.classList.remove('flex-column');
                    popupTuto.classList.add('display-none');
                    popupTutoASwipe.remove();
                    flecheGif.remove();
                }, 200);
                setTimeout(() => {
                    folderBody.classList.remove("open-folder-animation");
                }, 1000);
            }
        }
    }
}

/*  ----------------------------------------------
    ------------------ LISTENER ------------------
    ----------------------------------------------
 */

/**
 * Au cochage d'un thème/catégorie
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

swiperSection.addEventListener('click', function (event) {
    let newActive;
    let target = event.target;

    // Le click est possible si la target est la section d'ID swiper,
    // c-a-d dans la zone à droite ou a gauche de la fiche mise en avant
    let clickPossible = target.tagName === "SECTION" && target.getAttribute('id') === "swiper";
    // Dans le cas où la target ne se place pas dans ce cas-là,
    // il faut vérifier que la fiche correspondante n'est pas celle à la position 0
    if(!clickPossible) {    // On remonte jusqu'au parent <li> pour accéder à data-pos
        while(target.tagName !== "LI") {
            target = target.parentNode;
        }
        if(target.dataset.pos !== '0') {
            clickPossible = true;
        }
    }

    if(clickPossible) {
        const wWidth = window.innerWidth;
        const xClick = event.clientX;
        const clicADroite = xClick > (wWidth / 2);

        if (clicADroite) {
            newActive = carouselList.querySelector('.carousel-item[data-pos="1"]');
        } else {
            newActive = carouselList.querySelector('.carousel-item[data-pos="-1"]');
        }

        const newActivePos = newActive.dataset.pos;

        // Mise à jour des positions suivant la nouvelle active
        updatePos(newActivePos, true);

        // Ajout
        ajouterNouvelleFiche(newActivePos);
    }
});

// -----------------------------------------------------

// AU CHARGEMENT DE LA PAGE, RECUPERATION DES VALEUR POUR REMPLIR LES DIFFERENTES COMPOSANTES DE LA PAGE
document.addEventListener("DOMContentLoaded", async function () {

    const themesCheckboxes = document.querySelectorAll('#theme-selector ul li');

    // ------------ THEMES ------------

    // Récupération des thèmes déjà choisis dans la page précédente
    let themeSelected = window.localStorage.getItem('themes');
    themeSelected = themeSelected ? themeSelected.split(',') : [];

    // Listener de click pour chaque filtre-theme
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

    // ------------ SWIPER ------------

    // Remplissage du carousel/swiper avec les données de l'API, suivant les themes choisis
    await chercheEtAjouteProfilsCarousel(themeSelected, true);

    if(getProfilsFav().length === 0) {
        premiereVisite();
    }

    // ------------ FOLDER ------------
    updateFolder();
});

function updateDownSwipeListener(current) {
    const topcard = current;

    const hammer = new Hammer(topcard)
    hammer.add(new Hammer.Tap({ event: 'singletap' }))
    hammer.add(new Hammer.Pan({
        position: Hammer.position_ALL,
        threshold: 0
    }))

    hammer.on('pan', (e) => {
        onPan(e)
    });

    hammer.on('tap', (e) => {console.log("tap");});

    function onTap(e) {

    }

    function onPan(e) {
        const swiper = document.querySelector('#swiper');

        // remove transition properties
        topcard.style.transition = null

        // get top card coordinates in pixels
        let style = window.getComputedStyle(topcard);
        let mx = style.transform.match(/^matrix\((.+)\)$/);
        let startPosX = mx ? parseFloat(mx[1].split(', ')[4]) : 0;
        let startPosY = mx ? parseFloat(mx[1].split(', ')[5]) : 0;

        // get top card bounds
        let bounds = topcard.getBoundingClientRect()

        // get finger position on top card, top (1) or bottom (-1)
        let isDraggingFrom = (e.center.y - bounds.top) > topcard.clientHeight / 2 ? -1 : 1

        // get new coordinates
        let posX = e.deltaX + startPosX
        let posY = e.deltaY + startPosY

        // get ratio between swiped pixels and the axes
        let propX = e.deltaX / swiper.clientWidth;
        let propY = e.deltaY / swiper.clientHeight;

        // get swipe direction, left (-1) or right (1)
        let dirX = e.deltaX < 0 ? -1 : 1

        // get degrees of rotation, between 0 and +/- 45
        let deg = isDraggingFrom * dirX * Math.abs(propX) * 45

        // get scale ratio, between .95 and 1
        let scale = (95 + (5 * Math.abs(propX))) / 100


        if (e.isFinal) {
            let successful = false

            // check threshold and movement direction
            if (e.direction === Hammer.DIRECTION_RIGHT) {

            } else if (e.direction === Hammer.DIRECTION_LEFT) {

            } else if (propY < 30 && e.direction === Hammer.DIRECTION_DOWN) {

                successful = true
                // get top border position
                posY = +(swiper.clientHeight + topcard.clientHeight)

            }

            if (successful) {
                // animation de la carte qui va vers le bas
                topcard.style.transform = 'translateX(' + posX + 'px) translateY(' + posY + 'px) rotate(' + deg + 'deg)'

                // quand la transition est finie, on stock l'id de la carte et on passe a la suivante
                setTimeout(() => {
                    // Décalage des positions
                    updatePos('1');

                    const idFicheFav = topcard.getAttribute('data-id');
                    ajouterNouvelleFicheSwipeBas(idFicheFav);

                    // stock la carte et on affiche la prochain
                    pushProfilFav(idFicheFav);

                    // enleve la carte swipe
                    topcard.remove();
                    miseAJourEtatCarousel();
                    updateFolder();
                }, 200);
            }
        }
    }
}



function updatePos(newActivePos, swipeHorinzontal) {
    const first = elems.find((elem) => elem.dataset.pos === '-2');
    const prev = elems.find((elem) => elem.dataset.pos === '-1');
    const current = elems.find((elem) => elem.dataset.pos === '0');
    const next = elems.find((elem) => elem.dataset.pos === '1');
    const last = elems.find((elem) => elem.dataset.pos === '2');

    if(swipeHorinzontal) {
        [current, prev, next, first, last].forEach(item => {
            let itemPos = item.dataset.pos;
            item.dataset.pos = getNewPos(itemPos, newActivePos)
        });
    } else {
        next.setAttribute("data-pos", "0");
        last.setAttribute("data-pos", "1");
    }

}
function getNewPos(current, active) {
    const diff = current - active;
    if (Math.abs(diff) > 2) {
        return -current
    }
    return diff;
}

