"use strict";

const initSlide3 = function(data, data_map){
    console.log(data.carte.name);
    document.querySelector('#map-title').innerHTML = data.carte.name.toUpperCase();

};