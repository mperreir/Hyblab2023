const createMap = async function (taxon) {
    const map = L.map('map').setView([45.7, 0.3], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 10,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    $.getJSON("https://france-geojson.gregoiredavid.fr/repo/regions/nouvelle-aquitaine/communes-nouvelle-aquitaine.geojson", function (data) {
        L.geoJSON(data).addTo(map);
    });

    // get the data from the additionalDB.json in the ../../db folder
    async function getCommuneData(taxon) {
        const response = await fetch('data/additionalDB.json');
        const data = await response.json();
        return data[taxon];
    }

    const communeData = await getCommuneData(taxon);

    // modify the geojson file to add the commune observation data from communeData.listCities.nb_obs
    $.getJSON("https://france-geojson.gregoiredavid.fr/repo/regions/nouvelle-aquitaine/communes-nouvelle-aquitaine.geojson", function (data) {
        for (let i = 0; i < data.features.length; i++) {
            for (let j = 0; j < communeData.listCities.length; j++) {
                if (data.features[i].properties.code === communeData.listCities[j].insee) {
                    data.features[i].properties.nb_obs = communeData.listCities[j].nb_obs;
                    data.features[i].style = {fillColor: getColor(data.features[i].properties.nb_obs)};
                }
            }
        }

        L.geoJSON(data, {
            style: function (feature) {
                return {
                    fillColor: getColor(feature.properties.nb_obs),
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 0.7
                }
            }
        }).addTo(map);
    });



    function getColor(d) {
        return d > 100 ? '#800026' :
            d > 50 ? '#BD0026' :
                d > 20 ? '#E31A1C' :
                    d > 10 ? '#FC4E2A' :
                        d > 5 ? '#FD8D3C' :
                            d > 2 ? '#FEB24C' :
                                d > 1 ? '#FED976' :
                                    '#FFFFFF';
    }

    function highlightFeature(e) {
        const layer = e.target;

        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });

        layer.bringToFront();
    }

    function resetHighlight(e) {
        geojson.resetStyle(e.target);
    }

}
