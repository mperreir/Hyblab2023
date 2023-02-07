function createFicheMinia(profil, dataPos) {
    // Récupération des attributs de l'objet profil (par méthode destructuring)
    const { Id, Age, City, Company, MiniBio, Name, Status, Topic, URLImage } = profil;
    // Simplification du thème (pas d'accents et d'espace)
    const tranlatedSimpleTopic = translateThemeToSimpleChar(Topic);
    // Récupération de la classe relative à la couleur de la police du theme
    const fontClass = getFontClass(tranlatedSimpleTopic);
    const htmlString = `<li class="fiche-minia flex-row align-items-center justify-content-space-between" data-pos="${dataPos}" data-id="${Id}">
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
                                </section>
                            </div> 
                         </li>          `
    ;
    return createElementFromHTML(htmlString);
}

document.addEventListener("DOMContentLoaded", function() {
    // TODO : À récupérer depuis la sélection faite dans le swipe
    const profilsTest = [   {  Name: "Michel Dubois",
        Company: "Axitek",
        Age: "10",
        Status: "Président",
        City: "Nantes",
        MiniBio: "Une entreprise bien spéciale",
        Topic: "alimentation",
        URLImage: "https://media.licdn.com/dms/image/C5603AQEknKFZXX9tRg/profile-displayphoto-shrink_800_800/0/1517475397492?e=1680739200&v=beta&t=I4ONcua83gAQuyEqPc6tfPxjQ-kkGN_R7NbVuBc0OiA"},
        {  Name: "Patrice Ficom",
            Age: "10",
            Status: "Président",
            Company: "Protifloup",
            City: "Marseille",
            MiniBio: "Production de floup",
            Topic: "alimentation",
            URLImage: "https://media.licdn.com/dms/image/C4E03AQG3FBjwWyrt-A/profile-displayphoto-shrink_800_800/0/1660056537761?e=1680739200&v=beta&t=BUeVBE-15OJLowSRehWL2Tyv189StPslur_8-oylpW0"},
        {  Name: "Omar Ranfou",
            Age: "10",
            Company: "Virt'ai",
            City: "Paris",
            MiniBio: "Très très intéressant",
            Status: "Président",
            Topic: "industrie",
            URLImage: "https://media.licdn.com/dms/image/D4E35AQFsBrWlMhuvDw/profile-framedphoto-shrink_800_800/0/1672674431307?e=1675782000&v=beta&t=JPYSrjRxq0e9iup7K2H-dM_vJJTk7N8hOPkR8sJkMEQ"}];

    const listeProfils = document.querySelector('#liste-profils');

    profilsTest.forEach((profil) => {
        const ficheMinia = createFicheMinia(profil);
        console.log(ficheMinia)
        listeProfils.append(ficheMinia);
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




