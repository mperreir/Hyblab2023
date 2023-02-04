const themeSelected = [];

function onCheck(evnt) {
    const themeImg = evnt.target;  // La cible est l'image dans la <li>
    const themeString = themeImg.getAttribute('alt');

    console.log("themeSelected :", themeSelected);

    if (themeImg.classList.contains("unchecked")) {
        themeImg.classList.remove("unchecked");
        themeSelected.add(themeString);
    } else {
        themeImg.classList.add("unchecked");
        themeSelected.remove(themeString);
    }

    // TODO : Appel à l'API pour recréer un jeu de profils, suivant les nouveaux thèmes sélectionnés
}

document.addEventListener("DOMContentLoaded", function () {
    const themesCheckboxes = document.querySelectorAll('#theme-selector ul li');

    themesCheckboxes.forEach(tb =>
        tb.addEventListener('click', onCheck)
    );
});


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
 * Get the profiles from the API
 * @returns {Promise<any>} The profiles as a JSON object
 */
async function getProfiles() {
    // Fetch the data from the API
    const response = await fetch("/pionniers/api/map/topics/true/true/true/true/true/true/keyword/");
    // Parse the response as JSON and return it
    return await response.json();
}

/**
 * Create the marker icon for a profile
 * @param p
 * @returns {*}
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
    // Get the profiles from the API
    const profiles = await getProfiles();
    // Add a marker for each profile
    profiles.forEach(p => {
        console.log("p :", p)
        L.marker([p.Lat, p.Long], {icon: createIcon(p)}).addTo(map);
    });
}

addMarkers().then(() => console.log("Markers added !"));
