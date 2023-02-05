'use strict';


/*
  ----------------------------------------------------------------------------------------------------------------------
  | Leaflet map management                                                                                             |
  ----------------------------------------------------------------------------------------------------------------------
 */
// Init of the TileLayer (Stamen Toner Lite)
const layer = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
});
// Init of the map (centered on France)
const map = new L.Map("map", {
    center: new L.LatLng(47.081012, 2.398782),
    zoom: 6,
    zoomControl: false
});
// Add the TileLayer to the map
map.addLayer(layer);


/**
 * Create the marker icon for a profile
 * @param p The profile object
 * @returns {*} The marker icon
 */
function createIcon(p) {
    switch (p.Topic) {
        case 'énergie':
            return L.icon({
                iconUrl: '../img/pictogrammes_carte/point_energie.svg',
                iconSize: [26, 26],
                iconAnchor: [13, 13]
            });
        case 'alimentation':
            return L.icon({
                iconUrl: '../img/pictogrammes_carte/point_alimentation.svg',
                iconSize: [26, 26],
                iconAnchor: [13, 13]
            });
        case 'industrie':
            return L.icon({
                iconUrl: '../img/pictogrammes_carte/point_industrie.svg',
                iconSize: [26, 26],
                iconAnchor: [13, 13]
            });
        case 'économie circulaire':
            return L.icon({
                iconUrl: '../img/pictogrammes_carte/point_economie_circulaire.svg',
                iconSize: [26, 26],
                iconAnchor: [13, 13]
            });
        case 'mobilité':
            return L.icon({
                iconUrl: '../img/pictogrammes_carte/point_mobilite.svg',
                iconSize: [26, 26],
                iconAnchor: [13, 13]
            });
        case 'numérique':
            return L.icon({
                iconUrl: '../img/pictogrammes_carte/point_numerique.svg',
                iconSize: [26, 26],
                iconAnchor: [13, 13]
            });

    }
}


/**
 * Add markers on the map for each profile
 * @returns {Promise<void>} Nothing
 */
async function addMarkers() {
    // Add a marker for each profile
    geographicalProfiles.forEach(p => {
        p.marker = L.marker([p.Lat, p.Long], {icon: createIcon(p)}).addTo(map);
    });
}



/*
  ----------------------------------------------------------------------------------------------------------------------
  | Topics selection management                                                                                        |
  ----------------------------------------------------------------------------------------------------------------------
 */

let selectedTopics = [];
let geographicalProfiles = [];


/**
 * Get the profiles from the API
 * @returns {Promise<any>} The profiles as a JSON object
 */
async function getProfiles(apiTopicParameters) {
    // Fetch the data from the API
    const response = await fetch("/pionniers/api/map/topics/" + apiTopicParameters + "keyword/");
    // Parse the response as JSON and return it
    return await response.json();
}


/**
 * Generate the API parameters string from the selected topics
 * @param topics {string[]} List of selected topics
 * @returns {string} API parameters string
 */
function generateApiParameters(topics) {
    const topic = ["alimentation", "economie_circulaire", "energie", "industrie", "mobilite", "numerique"]
    let parameterString = "";
    // For each topic, add "true" if the topic is selected, "false" otherwise
    for(let i = 0; i < 6; i++) {
        parameterString += topics.includes(topic[i]) ? "true" : "false";
        parameterString += "/";
    }
    return parameterString;
}


/**
 * Event handler for the topics checkboxes
 * @param event The event object
 */
function onCheck(event) {
    // Retrieve the image element (HTML tag) from the event
    const topicImg = event.target;
    // Retrieve the topic string from the alt attribute of the image
    const topicString = topicImg.getAttribute('alt');

    // Alter the list of selected topics depending on the state of the checkboxes and add/remove the "unchecked" class
    if (topicImg.classList.contains("unchecked")) {
        topicImg.classList.remove("unchecked");
        selectedTopics.push(topicString);
    } else {
        topicImg.classList.add("unchecked");
        // Splice the array to remove the item (only if the item is found)
        const indexToRemove = selectedTopics.indexOf(topicString);
        if (indexToRemove > -1) {
            selectedTopics.splice(indexToRemove, 1);
        }
    }

    getProfiles(generateApiParameters(selectedTopics)).then(r => {
        // Markers of previous geographical profiles removal
        geographicalProfiles.forEach(gp => {
            gp.marker.remove();
        });
        // Update the geographical profiles
        geographicalProfiles = r;
        addMarkers().then(() => console.log("Markers added !"));
    });
}

/**
 * Add the event listener to manage interaction (click) with the topics checkboxes
 */
document.addEventListener("DOMContentLoaded", function () {
    const topicCheckboxes = document.querySelectorAll('#theme-selector ul li');

    topicCheckboxes.forEach(tc =>
        tc.addEventListener('click', onCheck)
    );
});