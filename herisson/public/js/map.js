const createMap = async function (taxon) {
    const map = L.map('map').setView([45, 0.3], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        minZoom: 8,
        maxZoom: 11,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    async function getAnimalData(taxon) {
        return await
            fetch(`/herisson/api/animal/${taxon}`)
                .then(response => response.json())
                .then(data => {
                        return data.filteredData[taxon];
                    }
                );
    }

    const animalData = await getAnimalData(taxon);

    function getColor(d) {
        return d > 500 ? '#661852' :
            d > 200 ? '#99237A' :
                d > 100 ? '#CC2FA3' :
                    d > 50 ? '#D659B5' :
                        d > 25 ? '#E082C8' :
                            d > 10 ? '#FBC5EB' :
                                d > 5 ? '#F5D5ED' :
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
            const matchingCommune = animalData.listCities.find(city => city.commune === feature.properties.nom);
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
        this._div.innerHTML = (props ? '<h4>' + props.nom + '</h4>' + (props.nb_obs ? props.nb_obs + ' observations' : 'Aucune observation') : 'Cliquez sur une commune');
    };

    info.addTo(map);

    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 5, 10, 25, 50, 100, 200, 500],
            labels = [];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }

        return div;
    };

    legend.addTo(map);


    geojson = L.geoJson(animalData, {
        onEachFeature: onEachFeature
    }).addTo(map);


}
