function createFicheMinia(profil) {
    // Récupération des attributs de l'objet profil (par méthode destructuring)
    const { Id, Age, City, Company, Name, Status, Topic, URLImage } = profil;
    // Simplification du thème (pas d'accents et d'espace)
    const tranlatedSimpleTopic = translateThemeToSimpleChar(Topic);
    // Récupération de la classe relative à la couleur de la police du theme
    const fontClass = getFontClass(tranlatedSimpleTopic);
    const bgClass = getBackgroundClass(tranlatedSimpleTopic)
    const htmlString = `<li data-id="${Id}" class="flex-column align-items-flex-end">
                            <div class="overflow-buttons-top flex-row justify-content-flex-end">
                                <div class="indicateur-id ${bgClass} flex-row align-items-center justify-content-center">
                                    <p>${Id}</p>
                                </div>
                                <div class="croix-suppr">
                                    <img alt="X" src="../img/croix.svg">
                                </div>
                            </div>
                            <div class="fiche-minia flex-row align-items-center justify-content-space-between">
                                <section class="photo-case">
                                    <img draggable="false" alt="photo-profil" src="${URLImage}">
                                </section>
                                <section class="information-fiche flex-row align-items-center">
                                    <div class="flex-column">
                                        <section class="carte-identite flex-column align-items-center-flex-start ${fontClass}">
                                            <p class="gras">${Name}</p>
                                            <p class="gras">${Age}</p>
                                        </section>
                                        <section class="entreprise-info">
                                            <p class="gras">${Status}</p>
                                            <p class="gras">${Company}</p>
                                            <p>${City}</p>
                                        </section>
                                    </div>
                                </section>
                            </div>
                            <div class="lire-profil bouton-rond flex-row justify-content-center align-items-center">
                                <p>Lire le PROfil</p>
                            </div>
                         </li>`
    ;
    return createElementFromHTML(htmlString);
}

function onSupprProfile(event) {
    let target = event.target;
    while(target.tagName !== 'LI') {
        target = target.parentNode;
    }

    const idProfil = target.dataset.id;
    removeProfilFav(idProfil);
    target.remove();
}

document.addEventListener("DOMContentLoaded", async function () {

    const nombreProfilFavText = document.querySelector("#nombre-profil");
    const listeProfils = document.querySelector('#liste-profils');
    const idsProfilsFav = getProfilsFav();

    if(idsProfilsFav.length > 0) {
        nombreProfilFavText.innerHTML = "Voir " + idsProfilsFav.length + " favoris";
    } else {
        nombreProfilFavText.innerHTML = "Favoris vide";
    }

    let profilFav = [];

    for (const id of idsProfilsFav) {
        const profil = await fetch('/pionniers/api/profile/' + id).then(r => r.json());
        profilFav.push(profil);
    }

    profilFav.forEach((profil) => {
        const ficheMinia = createFicheMinia(profil);
        listeProfils.append(ficheMinia);
    });

    const croixSuppr = document.querySelectorAll('.croix-suppr');

    croixSuppr.forEach(croixSuppr => {
        croixSuppr.addEventListener('click', onSupprProfile);
    })

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





