"use strict";
sessionStorage.setItem("alreadyVisited","")
sessionStorage.setItem("Score","0")
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
    introSlide();
});
const swiper2 = new Swiper("#mySecondSwiper", {
    direction: "horizontal",
    mousewheel: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

swiper2.on("slideChange", function () {
    introSlide2();
});

// Wait for the content to preload and display 1st slide
// Here we simulate a loading time of one second
setTimeout(() => {
    // fade out the loader "slide"
    // and send it to the back (z-index = -1)
    anime({
        delay: 1000,
        targets: '#loader',
        opacity: '0',
        'z-index' : -1,
        easing: 'easeOutQuad',
    });
    // Init first slide
    introSlide();
}, 1000);
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
document.querySelector(".skip").addEventListener("click", function () {
    swiper.slideTo(4);
});

function submitPostal(){
    let codePostal = document.querySelector("#name").value;

    fetch('../api/score/' + codePostal).then(
        function(response) {
            // if reponse status === 500
            if (response.status === 500) {
                alert("code postal non valide")
            } else {
                sessionStorage.setItem("Score",toString(response));
                location.href="actualstate.html";
                console.log(codePostal);
            }
        }
    )

}