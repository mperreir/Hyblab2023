const nombreProfilFavText = document.querySelector("#nombre-profil");

function createFicheMinia(profil) {
    // Récupération des attributs de l'objet profil (par méthode destructuring)
    const { Id, Age, City, Company, Name, Status, Topic, Keywords, URLImage } = profil;
    // Simplification du thème (pas d'accents et d'espace)
    const tranlatedSimpleTopic = translateThemeToSimpleChar(Topic);
    // Récupération de la classe relative à la couleur de la police du theme
    const fontClass = getFontClass(tranlatedSimpleTopic);
    const bgClass = getBackgroundClass(tranlatedSimpleTopic)
    const htmlString = `<li data-id="${Id}" class="flex-column align-items-flex-end">
                            <div class="overflow-buttons-top flex-row justify-content-flex-end">
                                <div class="croix-suppr">
                                    <img alt="X" src="../img/croix.svg">
                                </div>
                            </div>
                            <div class="fiche-minia flex-row align-items-center justify-content-space-between">
                                <section class="photo-case">
                                    <img draggable="false" alt="photo-profil" src="${URLImage}">
                                </section>
                                <section class="information-fiche flex-row align-items-center">
                                    <div class="flex-column right-content">
                                        <section class="carte-identite flex-column align-items-center-flex-start ${fontClass}">
                                            <p class="gras">${Name}</p>
                                            <p class="gras">${Age}</p>
                                        </section>
                                        <section class="entreprise-info">
                                            <p class="gras">${Status}</p>
                                            <p class="gras">${Company}</p>
                                            <p>${City}</p>
                                        </section>
                                        <section class="keywords flex-row align-items-center">
                                            <!-- Section qui va se remplir dans la suite de la fonction -->
                                        </section>
                                        <section class="topic flex-row align-items-center">
                                            <img src="../img/pictogrammes_themes/${translateThemeToSimpleChar(Topic)}.svg" alt="${Topic}">
                                            <p class="${fontClass} gras">${capitalizeFirstLetter(Topic)}</p>
                                        </section>
                                    </div>
                                </section>
                            </div>
                            <div class="lire-profil bouton flex-row justify-content-center align-items-center">
                                <p>Voir le PROfil</p>
                            </div>
                         </li>`
    ;
    const ficheMinia = createElementFromHTML(htmlString);
    // Retrieve the keywords section
    const keywordSection = ficheMinia.querySelector("section.keywords");
    // Add the keywords (if any non empty keyword is present)
    Keywords.split(';').forEach(k => {
        if(k.trim() === '') {
            return;
        }
        keywordSection.append(createKeywordItem(k));
    });
    return ficheMinia;
}

function onSupprProfile(event) {
    let target = event.target;
    while(target.tagName !== 'LI') {
        target = target.parentNode;
    }

    const idProfil = target.dataset.id;
    removeProfilFav(idProfil);
    target.remove();
    updateNombreProfil(getProfilsFav());
}

function updateNombreProfil(idsProfilsFav) {
    if(idsProfilsFav.length > 0) {
        nombreProfilFavText.innerHTML = "Voir " + idsProfilsFav.length + " favoris";
    } else {
        nombreProfilFavText.innerHTML = "Favoris vide";
    }
}

document.addEventListener("DOMContentLoaded", async function () {

    const listeProfils = document.querySelector('#liste-profils');
    const idsProfilsFav = getProfilsFav();
    const retourBtn = document.querySelector('#retour');
    const apropos = document.querySelector('#petit-rond');

    apropos.addEventListener('click', () => {
        window.location.href = './apropos.html';
    });

    retourBtn.addEventListener('click', () => {
        window.location.href = window.localStorage.getItem('pagePrecedente') + ".html";
    });

    updateNombreProfil(idsProfilsFav);

    let profilFav = [];

    for (const id of idsProfilsFav) {
        const profil = await fetch('/pionniers/api/miniature/' + id).then(r => r.json());
        profilFav.push(profil);
        const ficheMinia = createFicheMinia(profil);
        const boutonLire = ficheMinia.querySelector('.lire-profil');
        const idProfil = ficheMinia.dataset.id;
        boutonLire.addEventListener('click', () => {
            window.localStorage.setItem('idProfil', idProfil);
            window.location.href = './profils.html';
        });
        listeProfils.append(ficheMinia);
    }

    const croixSuppr = document.querySelectorAll('.croix-suppr');

    croixSuppr.forEach(croixSuppr => {
        croixSuppr.addEventListener('click', onSupprProfile);
    });
});



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

function createKeywordItem(Keyword) {
    const htmlString = `<div class="keyword-item flex-row align-items-center">
                            <p>#${Keyword.toLowerCase()}</p>
                        </div>`;
    return createElementFromHTML(htmlString);
}


