//TODO get the id of profil somehow ? 'Cause ↓↓↓ does not work
let url = window.location.href; // get the current URL
let id = new URL(url).searchParams.get("id"); // extract the value of the id parameter
function createFicheProfil(profil, dataPos) {
    // Récupération des attributs de l'objet profil (par méthode destructuring)
    const {Id, Name, Age, Status, Company, City, ContentBio, URLImage, Podcast, Article, URLLinkedin, Topic} = profil;
    // Simplification du thème (pas d'accents et d'espace)
    const tranlatedSimpleTopic = translateThemeToSimpleChar(Topic);
    // Récupération de la classe relative à la couleur de la police du theme
    const fontClass = getFontClass(tranlatedSimpleTopic);
    const htmlString = `<div id="profils" class="fiche-profil flex-column align-items-center justify-content-space-between" data-pos="${dataPos}" data-id="${Id}">
                            <section id="resume" class="flex-row align-items-center justify-content-space-between">
                                <section class="photo-case">
                                    <img draggable="false" alt="photo-profil" src="${URLImage}">
                                </section>
                                <section id="identity" class="flex-column justify-content-space-evenly">
                                    <section class="carte-identite flex-column align-items-center-flex-start ${fontClass}">
                                        <p class="gras">${Name}</p>
                                        <p class="gras">${Age}</p>
                                    </section>
                                    <section class="entreprise-info">
                                        <p class="gras">${Status}</p>
                                        <p class="gras">${Company}</p>
                                        <p>${City}</p>
                                    </section>
                                </section>
                            </section>
                            <section id="bio" class="">
                                <p>${ContentBio}</p>
                            </section>
                            <section class="podcast flex-row align-items-center justify-content-space-between">
                                <p>${Podcast}</p>
                            </section> 
                            <footer class="flex-row align-items-flex-start justify-content-space-around">
                                <button onclick="window.open('${Article}','_blank')" class="bouton-rond">Lire l\'article</button>
                                <button onclick="window.open('${URLLinkedin}','_blank')" class="bouton-rond">Le profil Linkedin</button>
                            </footer>
                        </div>`
    ;

    const ficheProfil = createElementFromHTML(htmlString);
    const profilDiv = document.querySelector('#container');
    profilDiv.appendChild(ficheProfil);

}

async function getProfil(Id) {
    // Fetch the data from the API
    const response = await fetch("/pionniers/api/profile/" + Id);
    // Parse the response as JSON and return it
    return await response.json();
}

getProfil(2).then(r => {
    createFicheProfil(r);
    console.log(r);
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