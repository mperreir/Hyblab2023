"use strict";

const initSlide3 = function(data, data_map){
    console.log(data.carte.name);
    document.querySelector('#map-title').innerHTML = data.carte.name.toUpperCase();

    const d = [{"Coordonnees":"48.4518691045, 3.34226623535","Production":1586106},{"Coordonnees":"46.7806739038, -1.22925967851","Production":32156970},{"Coordonnees":"49.3795673555, 0.65533275771","Production":23228425},{"Coordonnees":"49.3795673555, 0.65533275771","Production":24922513},{"Coordonnees":"48.554637282, 3.00883892893","Production":11364332},{"Coordonnees":"48.7706781866, 4.01743444039","Production":17310867},{"Coordonnees":"48.8400739001, 4.02053698314","Production":1669779},{"Coordonnees":"48.5824010998, 3.72970498559","Production":2217207},{"Coordonnees":"46.7806739038, -1.22925967851","Production":42338068},{"Coordonnees":"48.4518691045, 3.34226623535","Production":22812816},{"Coordonnees":"48.555534468, 4.1130717526","Production":35919469},{"Coordonnees":"48.8084972349, 6.60564803108","Production":38237897},{"Coordonnees":"48.4972745986, 6.6948706717","Production":26589797},{"Coordonnees":"48.4684641557, 4.02789249999","Production":18239263},{"Coordonnees":"48.7666597988, 7.26359977418","Production":7007459},{"Coordonnees":"49.0777461945, 3.12814777064","Production":13886559},{"Coordonnees":"47.8811134277, 5.2558356921","Production":2335360},{"Coordonnees":"43.2799895089, -0.705497036287","Production":7574861},{"Coordonnees":"48.4518691045, 3.34226623535","Production":18676284},{"Coordonnees":"48.555534468, 4.1130717526","Production":27279315},{"Coordonnees":"48.8084972349, 6.60564803108","Production":36616793},{"Coordonnees":"48.2241761343, 5.65159771886","Production":22884848},{"Coordonnees":"47.7699166638, 5.89160778933","Production":6493255},{"Coordonnees":"46.8985800984, 4.77433585145","Production":20710441},{"Coordonnees":"48.554637282, 3.00883892893","Production":26276836},{"Coordonnees":"48.2241761343, 5.65159771886","Production":27584915},{"Coordonnees":"48.8030599838, 4.95587124601","Production":45749678},{"Coordonnees":"49.5212028828, 2.60416999172","Production":3461968},{"Coordonnees":"49.2609818537, 2.91459037295","Production":11269297},{"Coordonnees":"48.9251200829, 6.67898076184","Production":14368294},{"Coordonnees":"46.1315030493, 1.02033947545","Production":2669782},{"Coordonnees":"48.7383348646, 3.91196281487","Production":11992013},{"Coordonnees":"44.4251092866, 0.742526167632","Production":64965848},{"Coordonnees":"44.4251092866, 0.742526167632","Production":41754954},{"Coordonnees":"46.8985800984, 4.77433585145","Production":20856451},{"Coordonnees":"46.8639718192, -0.695632067582","Production":17482245},{"Coordonnees":"48.7140643026, -0.539204262797","Production":3604928},{"Coordonnees":"49.3795673555, 0.65533275771","Production":21999795},{"Coordonnees":"48.2032973995, -4.07350636234","Production":14280590},{"Coordonnees":"46.8639718192, -0.695632067582","Production":21725306},{"Coordonnees":"48.554637282, 3.00883892893","Production":16290014},{"Coordonnees":"48.1740293909, -2.75097544378","Production":31664238},{"Coordonnees":"48.7140643026, -0.539204262797","Production":23665746},{"Coordonnees":"49.0184562539, 7.96174575912","Production":3428673},{"Coordonnees":"48.8030599838, 4.95587124601","Production":8033547},{"Coordonnees":"48.6476898388, 0.136870409048","Production":904150},{"Coordonnees":"49.5259538637, 4.18823352667","Production":2767452},{"Coordonnees":"48.2032973995, -4.07350636234","Production":19256208},{"Coordonnees":"48.6476898388, 0.136870409048","Production":9601629},{"Coordonnees":"47.7699166638, 5.89160778933","Production":21812428},{"Coordonnees":"48.8400739001, 4.02053698314","Production":30448367},{"Coordonnees":"48.3874423014, 3.65147515296","Production":5869466},{"Coordonnees":"49.2592528645, 2.06773136457","Production":21688825},{"Coordonnees":"49.8021266521, 2.98611736598","Production":9537615},{"Coordonnees":"44.4251092866, 0.742526167632","Production":43888760},{"Coordonnees":"43.2799895089, -0.705497036287","Production":8904511},{"Coordonnees":"44.4251092866, 0.742526167632","Production":44651972},{"Coordonnees":"46.7806739038, -1.22925967851","Production":2327578},{"Coordonnees":"48.4518691045, 3.34226623535","Production":16417616},{"Coordonnees":"46.8639718192, -0.695632067582","Production":2131870},{"Coordonnees":"48.7706781866, 4.01743444039","Production":13842820},{"Coordonnees":"48.555534468, 4.1130717526","Production":20581125},{"Coordonnees":"46.8985800984, 4.77433585145","Production":20881384},{"Coordonnees":"48.4518691045, 3.34226623535","Production":21832246},{"Coordonnees":"46.8639718192, -0.695632067582","Production":29272663},{"Coordonnees":"48.7140643026, -0.539204262797","Production":29133731},{"Coordonnees":"48.5824010998, 3.72970498559","Production":30962233},{"Coordonnees":"48.1127221863, 4.37880982139","Production":14296314},{"Coordonnees":"48.7924119914, 3.13372765274","Production":6868071},{"Coordonnees":"43.2799895089, -0.705497036287","Production":6699783},{"Coordonnees":"46.8985800984, 4.77433585145","Production":21391427},{"Coordonnees":"48.2032973995, -4.07350636234","Production":7854156},{"Coordonnees":"48.7706781866, 4.01743444039","Production":2660222},{"Coordonnees":"46.8985800984, 4.77433585145","Production":21200562},{"Coordonnees":"46.7806739038, -1.22925967851","Production":44645087},{"Coordonnees":"48.2032973995, -4.07350636234","Production":16783388},{"Coordonnees":"48.1740293909, -2.75097544378","Production":4963290},{"Coordonnees":"48.8084972349, 6.60564803108","Production":2437392},{"Coordonnees":"46.7806739038, -1.22925967851","Production":44040208},{"Coordonnees":"48.4972745986, 6.6948706717","Production":3767746},{"Coordonnees":"49.3795673555, 0.65533275771","Production":20973911},{"Coordonnees":"48.1740293909, -2.75097544378","Production":34242790},{"Coordonnees":"49.0184562539, 7.96174575912","Production":22286782},{"Coordonnees":"49.5259538637, 4.18823352667","Production":14968427},{"Coordonnees":"48.7047767033, 3.34596512996","Production":910898},{"Coordonnees":"48.765310444, 7.687221619","Production":""},{"Coordonnees":"45.140433428, -0.862378225","Production":""},{"Coordonnees":"44.793554609, -0.819247806","Production":""},{"Coordonnees":"45.140433428, -0.862378225","Production":""},{"Coordonnees":"45.180862572, -1.065066695","Production":""},{"Coordonnees":"48.571265, 7.767760376","Production":""},{"Coordonnees":"48.509515077, -1.94126291","Production":""},{"Coordonnees":"48.673674108, 7.515639704","Production":""},{"Coordonnees":"48.619066048, 7.505686274","Production":""},{"Coordonnees":"48.571265, 7.767760376","Production":""},{"Coordonnees":"48.765310444, 7.687221619","Production":""},{"Coordonnees":"45.140433428, -0.862378225","Production":""},{"Coordonnees":"45.180862572, -1.065066695","Production":""},{"Coordonnees":"48.673674108, 7.515639704","Production":""},{"Coordonnees":"48.673674108, 7.515639704","Production":""},{"Coordonnees":"48.509515077, -1.94126291","Production":""},{"Coordonnees":"48.619066048, 7.505686274","Production":""},{"Coordonnees":"48.571265, 7.767760376","Production":""},{"Coordonnees":"48.765310444, 7.687221619","Production":""},{"Coordonnees":"48.571265, 7.767760376","Production":""},{"Coordonnees":"48.673674108, 7.515639704","Production":""},{"Coordonnees":"46.828329637, -0.153347126","Production":""},{"Coordonnees":"48.571265, 7.767760376","Production":""},{"Coordonnees":"48.509515077, -1.94126291","Production":""},{"Coordonnees":"48.673674108, 7.515639704","Production":""}]

    const convertedData = d.map(item => {
        const [lat, lng] = item.Coordonnees.split(', ');
        return { lat: Number(lat), lng: Number(lng), count: item.Production };
    });

    var testData = {
        max: 8,
        data: convertedData
    };

    var baseLayer = L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
            attribution: '',
            maxZoom: 18
        }
    );

    var cfg = {
        "radius": 2,
        "maxOpacity": .8,
        "scaleRadius": true,
        "useLocalExtrema": true,
        latField: 'lat',
        lngField: 'lng',
        valueField: 'count'
    };

    var heatmapLayer = new HeatmapOverlay(cfg);

    var map = new L.Map('map', {
        center: new L.LatLng(46.715, 2.464),
        zoom: 5,
        layers: [baseLayer, heatmapLayer]
    });

    heatmapLayer.setData(testData);

    /*
    var map = L.map("map");

    $.getJSON('https://cdn.jsdelivr.net/gh/johan/world.geo.json@34c96bba/countries/FRA.geo.json').then(function(geoJSON) {
        var osm = new L.TileLayer.BoundaryCanvas("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            boundary: geoJSON,
            attribution: ''
        });
        map.addLayer(osm);
        var ukLayer = L.geoJSON(geoJSON);
        map.fitBounds(ukLayer.getBounds());
    });
*/
};