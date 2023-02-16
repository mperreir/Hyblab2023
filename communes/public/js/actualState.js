"use strict";
var monObjet = document.querySelectorAll('.logo');
for (var i = 0; i < monObjet.length; i++) {
    monObjet[i].data = "../img/logo.svg";
    change_svg_color(monObjet[i], "#000000");
}
// Init of the (touch friendly) Swiper slider
const swiper = new Swiper("#mySwiper", {
    direction: "horizontal",
    mousewheel: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

swiper.on("slideChange", function () {
    introSlide2();
});
const iSpeed = 50;
const iScrollAt = 20;

function typewriter() {
    sContents = ' ';
    iRow = Math.max(0, iIndex - iScrollAt);
    var destination=document.querySelector(".swiper-slide-active .bubble-text");

    while (iRow < iIndex) {
        sContents += aText[iRow++] + '<br />';
    }
    if(aText[iIndex] != null) {
        destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos);

        if (iTextPos++ === iArrLength) {
            iTextPos = 0;
            iIndex++;
            if (iIndex !== aText.length) {
                iArrLength = aText[iIndex].length;
                setTimeout("typewriter()", 500);
            }
        } else {
            setTimeout("typewriter()", iSpeed);
        }
    }
}
introSlide2();

function accueil(){
    location.href="accueil.html"
}