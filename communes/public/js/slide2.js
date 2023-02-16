"use strict";

// Just animate the logo
const initSlide2 = function(data){
    //console.log(data.exemple.ville);
    document.querySelector('#exemple-title').innerHTML = data.exemple.ville.toUpperCase();
    document.querySelector('#exemple-text').innerHTML = data.exemple.description;
    document.querySelector('#video').src = data.exemple.video;

};