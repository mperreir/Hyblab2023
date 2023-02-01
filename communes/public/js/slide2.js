"use strict";

// Just animate the logo
const initSlide2 = function(data){
    console.log(data.carte.name);
    document.querySelector('#map-title').innerHTML = data.carte.name;

    /*
    var map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);*/

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
};