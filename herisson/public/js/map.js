const createMap = async function (taxon) {
    const map = L.map('map').setView([45.7, 0.3], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        minZoom: 7,
        maxZoom: 10,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    async function getCommuneData(taxon) {
        const response = await fetch('data/additionalDB.json');
        const data = await response.json();
        return data[taxon];
    }

    const communeData = await getCommuneData(taxon);
    let geojson;

    $.getJSON("https://france-geojson.gregoiredavid.fr/repo/regions/nouvelle-aquitaine/communes-nouvelle-aquitaine.geojson", function (data) {
        const geoData = data.features.map(feature => {
            const match = communeData.listCities.find(city => feature.properties.nom === city.commune);
            if (match) {
                feature.properties.nb_obs = match.nb_obs;
                return feature;
            }
        }).filter(Boolean);

        geojson = L.geoJSON(geoData, {
            style: feature => ({
                fillColor: getColor(feature.properties.nb_obs),
                weight: 1.5,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7,
            }),
            onEachFeature: (feature, layer) => {
                layer.on({
                    mouseover: highlightFeature,
                    mouseout: resetHighlight
                });
            }
        }).addTo(map);
    });

    function getColor(d) {
        return d > 500 ? '#661852' :
            d > 100 ? '#99237A' :
                d > 50 ? '#CC2FA3' :
                    d > 25 ? '#D659B5' :
                        d > 10 ? '#E082C8' :
                            d > 5 ? '#FBC5EB' :
                                d > 1 ? '#F5D5ED' :
                                    '#FFF8F1';
    }

    function highlightFeature(e) {
        const layer = e.target;
        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }

        info.update(layer.feature.properties);
    }

    function resetHighlight(e) {
        geojson.resetStyle(e.target);
        info.update();
    }
    function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
    }

    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
        });
    }

    $.getJSON("https://france-geojson.gregoiredavid.fr/repo/regions/nouvelle-aquitaine/communes-nouvelle-aquitaine.geojson", function (data) {
        const mappedData = data.features.map(feature => {
            const matchingCommune = communeData.listCities.find(city => city.commune === feature.properties.nom);
            if (matchingCommune) {
                feature.properties.nb_obs = matchingCommune.nb_obs;
                feature.style = {fillColor: getColor(feature.properties.nb_obs)};
            }
            return feature;
        });
        geojson = L.geoJson(mappedData, {
            style: function (feature) {
                return {
                    fillColor: getColor(feature.properties.nb_obs),
                    weight: 1.5,
                    opacity: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 0.7
                }
            },
            onEachFeature: onEachFeature
        }).addTo(map);
    });

    let info = L.control();

    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };

    info.update = function (props) {
        this._div.innerHTML = '<h4>Commune :</h4>' + (props ? '<b>' + props.nom + '</b><br />' + (props.nb_obs ? props.nb_obs + ' observations' : 'Aucune observation') : 'Cliquez sur une commune');
    };

    info.addTo(map);


    geojson = L.geoJson(communeData, {
        onEachFeature: onEachFeature
    }).addTo(map);


}
