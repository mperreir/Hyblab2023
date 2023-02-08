"use strict";

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function () {
    output.innerHTML = this.value;
}

var slider14 = document.getElementById("myRange14");
var output14 = document.getElementById("demo14");
output14.innerHTML = slider14.value;

slider14.oninput = function () {
    output14.innerHTML = this.value;
}