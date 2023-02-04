const themeSelected = [];
function onCheck(evnt) {
    const themeImg = evnt.target;  // La cible est l'image dans la <li>
    const themeString = themeImg.getAttribute('alt');

    console.log("themeSelected :", themeSelected);

    if(themeImg.classList.contains("unchecked")) {
        themeImg.classList.remove("unchecked");
        themeSelected.add(themeString);
    } else {
        themeImg.classList.add("unchecked");
        themeSelected.remove(themeString);
    }

    // TODO : Appel à l'API pour recréer un jeu de profils, suivant les nouveaux thèmes sélectionnés
}

document.addEventListener("DOMContentLoaded", function() {
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
    zoom: 6.25
});
// Add the TileLayer to the map
map.addLayer(layer);
