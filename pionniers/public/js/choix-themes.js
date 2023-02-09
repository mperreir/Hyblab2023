let themeSelected = [];

function ajouteTheme(theme) {
    themeSelected.push(theme);
    window.localStorage.setItem('themes', themeSelected.toString());
}

function supprimeTheme(theme) {
        themeSelected.splice(themeSelected.indexOf(theme), 1);
        window.localStorage.setItem('themes', themeSelected.toString());

}

/**
 * Évenement déclenché lors de la selection du thème
 * @param event {Event} l'événement correspondant au cochage/décochage du thème
 */
function onCheck(event) {
    let themeBtn = event.target;

    while (themeBtn.tagName !== 'LI') {
        themeBtn = themeBtn.parentNode;
    }

    let themeName = themeBtn.querySelector("img");
    themeName = themeName.getAttribute('alt');

    if (themeBtn.classList.contains("unchecked")) {
        ajouteTheme(themeName);
        themeBtn.classList.remove("unchecked");
    } else {

        if (themeSelected.length === 1) {
            // Display the overlay
            const overlay = document.querySelector("div#overlay");
            overlay.classList.remove("display-none");
            // Display the popup
            const popup = document.querySelector("div#popup");
            popup.classList.remove("display-none");
            document.querySelector('div#popup img#fermeture-popup').addEventListener('click', function (e) {
                // Undisplay the overlay
                document.querySelector('div#overlay').classList.add('display-none');
                // Undisplay the popup
                document.querySelector('div#popup').classList.add('display-none');
            });
        } else {
            supprimeTheme(themeName);
            themeBtn.classList.add("unchecked");
        }
    }
    updateCount();

}
document.addEventListener("DOMContentLoaded", function() {
    const themes = document.querySelectorAll('#liste-theme ul li');
    console.log(window.localStorage.getItem("themes"));
    if (window.localStorage.getItem("themes") === null){
        themes.forEach((t) => {
            const theme = t.querySelector('img');
            let nomtheme = theme.getAttribute('alt');
            ajouteTheme(nomtheme);
            t.addEventListener('click', onCheck);
        });
    } else {
        themeSelected = localStorage.getItem('themes').split(',');

        themes.forEach((t) => {
            const theme = t.querySelector('img');
            let nomtheme = theme.getAttribute('alt');
            if (!themeSelected.includes(nomtheme)){
                t.classList.add('unchecked');
            }
            t.addEventListener('click', onCheck);

        });




        themes.forEach(tc => {
            const img = tc.querySelector('img');
            const themeName = img.getAttribute('alt');
            if (themeSelected.includes(themeName)) {
                tc.classList.remove('unchecked');
            }
        });
    }
    // Update the count of profiles
    updateCount();
});


function updateCount() {
    // Retrieve the selected topics
    getProfiles(buildApiParameters()).then(r => {
        // Update the count in the HTML
        document.querySelector("footer span#profile_counter").innerHTML = r.length;
    });
}


/**
 * Build the API parameters from the selected topics
 * @returns {string} The API parameters
 */
function buildApiParameters() {
    const topics = ["alimentation", "economie_circulaire", "energie", "industrie", "mobilite", "numerique"]
    let apiString = "";
    topics.forEach(t => {
        apiString += themeSelected.includes(t) ? "true" : "false";
        apiString += "/";
    });
    return apiString;
}

/**
 * Get the profiles from the API
 * @param apiParameters The parameters to send to the API
 * @returns {Promise<any>} The profiles as a JSON object
 */
async function getProfiles(apiParameters) {
    // Fetch the data from the API
    const response = await fetch("/pionniers/api/map/topics/" + apiParameters);
    // Parse the response as JSON and return it
    return await response.json();
}