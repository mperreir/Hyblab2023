// extract the value of the id parameter
//const id = window.localStorage.getItem(Id)

function createFicheprofile(profile) {
    // Récupération des attributs de l'objet profile (par méthode destructuring)
    const {
        Id,
        Name,
        Age,
        Status,
        Company,
        City,
        ContentBio,
        URLImage,
        PodcastId,
        Article,
        URLLinkedin,
        Topic
    } = profile;
    // Simplification du thème (pas d'accents et d'espace)
    const tranlatedSimpleTopic = translateThemeToSimpleChar(Topic);
    // Récupération de la classe relative à la couleur de la police du theme
    const fontClass = getFontClass(tranlatedSimpleTopic);
    // Création src pour l'iframe Ausha podcast avec  l'id podcast du profile
    const Podcast = "https://player.ausha.co/index.html?podcastId=" + PodcastId + "&display=horizontal&playlist=false&color=%23006982&v=3&playerId=ausha-WTg9";
    // Création de la fiche profile
    const htmlString = `<div id="profile" class="fiche-profile flex-column align-items-center justify-content-space-between" data-id="${Id}">
                            <section id="resume" class="flex-row align-items-center">
                                <section class="photo-case">
                                    <img draggable="false" alt="photo-profile" src="${URLImage}">
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
                            <section class="scrollable">
                                <section id="bio" class="align-items-center">
                                    <p>${ContentBio}</p>
                                </section>
                                <iframe id="podcast" name="Ausha Podcast Player" loading="lazy" id="ausha-WTg9" height="220px" style="border: none; width:100%; height:220px; padding: 0;" src="${Podcast}"></iframe><script src="https://player.ausha.co/ausha-player.js"></script>
                            </section>
                            <section id="links" class="flex-row align-items-center justify-content-space-between">
                                <button onclick="window.open('${Article}','_blank')" class="bouton-rond">Lire l\'article</button>
                                <button onclick="window.open('${URLLinkedin}','_blank')" class="bouton-rond">Le profile Linkedin</button>
                            </section>
                        </div>`
    ;

    const ficheprofile = createElementFromHTML(htmlString);
    const profileDiv = document.querySelector('#container');
    profileDiv.appendChild(ficheprofile);

    if (PodcastId === "") {
        //Remove the podcast iframe if the profile doesn't have a podcast
        const podcastDiv = document.querySelector('#podcast');
        podcastDiv.remove();
        //Increase the font size of the bio if profile doesn't have a podcast
        document.querySelector('#bio').style.fontsize = "0.95em";
    }
}

/**
 * Création du profile à partir de l'id stocké dans le local storage
 * @param Id
 * @returns {Promise<any>}
 */
async function getprofile(Id) {
    // Fetch the data from the API
    const response = await fetch("/pionniers/api/profile/" + Id);
    // Parse the response as JSON and return it
    return await response.json();
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

min = Math.ceil(1);
max = Math.floor(84);
//random number between 1 and 84 for the id of the profile test
getprofile(Math.floor(Math.random() * (max - min + 1) + min)).then(r => {
    createFicheprofile(r);
    console.log(r);
});