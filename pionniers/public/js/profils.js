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
        Topic,
        Keywords
    } = profile;
    // Simplification du thème (pas d'accents et d'espace)
    const tranlatedSimpleTopic = translateThemeToSimpleChar(Topic);
    // Récupération de la classe relative à la couleur de la police du theme
    const fontClass = getFontClass(tranlatedSimpleTopic);
    // Création src pour l'iframe Ausha podcast avec  l'id podcast du profile
    const Podcast = "https://player.ausha.co/index.html?podcastId=" + PodcastId + "&display=horizontal&playlist=false&color=%23006982&v=3&playerId=ausha-HePz";
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
                                    <section class="keywords flex-row align-items-center">
                                        <!-- Section qui va se remplir dans la suite de la fonction -->
                                    </section>
                                    <section class="topic flex-row align-items-center">
                                        <img src="../img/pictogrammes_themes/${translateThemeToSimpleChar(Topic)}.svg" alt="${Topic}">
                                        <p class="${fontClass} gras">${capitalizeFirstLetter(Topic)}</p>
                                    </section>
                                </section>
                            </section>
                            <section class="scrollable">
                                <section id="bio" class="align-items-center">
                                    <p>${ContentBio}</p>
                                </section>
                                <iframe id="podcast" name="Ausha Podcast Player" loading="lazy" id="ausha-HePz" height="200px" style="border: none; width:100%; height: 200px; overflow: scroll;  " src="${Podcast}"></iframe><script src="https://player.ausha.co/ausha-player.js"></script>                            
                            </section>
                            <section id="links" class="flex-row align-items-center justify-content-space-between">
                                <button id="Artcicle" onclick="window.open('${Article}','_blank')" class="bouton-rond">Lire l\'article</button>
                                <button id="Linkedin" onclick="window.open('${URLLinkedin}','_blank')" class="bouton-rond">Le profil Linkedin</button>
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
        const bio = document.querySelector('#bio');
        bio.style.fontSize = "1.17em";
    }

    if (Article === "") {
        //Remove the article button if the profile doesn't have an Article link
        const articleButton = document.querySelector('#Artcicle');
        articleButton.remove();
    }

    if (URLLinkedin === "") {
        //Remove the Linkedin button if the profile doesn't have a Linkedin link
        const linkedinButton = document.querySelector('#Linkedin');
        linkedinButton.remove();
    }

    // Retrieve the keywords section
    const keywordSection = ficheprofile.querySelector("section.keywords");
    // Add the keywords (if any non empty keyword is present)
    Keywords.split(';').forEach(k => {
        if(k.trim() === '') {
            return;
        }
        keywordSection.append(createKeywordItem(k));
    });
}

/**
 * Création du profile à partir de l'id stocké dans le local storage
 * @param Id
 * @returns {Promise<any>}
 */
async function getprofile(Id) {
    // Fetch the data from the API
    const response = await fetch("../api/profile/" + Id);
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

/**
 * Récupération id du profile dans le local storage
 */
const Id = window.localStorage.getItem("idProfil");
getprofile(Id).then(r => {
    createFicheprofile(r);
    console.log(r);
});


function createKeywordItem(Keyword) {
    const htmlString = `<div class="keyword-item flex-row align-items-center">
                            <p>#${Keyword.toLowerCase()}</p>
                        </div>`;
    return createElementFromHTML(htmlString);
}