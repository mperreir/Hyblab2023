"use strict";

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
  switch( swiper.activeIndex ) {
    case 0:
      //document.querySelector(".swiper-pagination-bullet-active").style.backgroundColor = data.color.main[0];
      break;
    case 1:
      //initSlide2();
      break;
    case 2:
      //initSlide3();
      break;
    case 3:
      initText1();
      break;
    case 4:
      initText2();
      break;
  }
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
  initSlide1();
}, 1000);

var aText = new Array(
    "erreur de chargement"
);
var iIndex = 0; // start printing array at this posision
var iArrLength = aText[0].length; // the length of the text array

var iTextPos = 0; // initialise text position
var sContents = ''; // initialise contents variable
var iRow; // initialise current row
const iSpeed = 50;
const iScrollAt = 20;

function initText1() {
  aText = new Array("Vous voulez savoir qui est derrière ce magnifique projet ?")
  iIndex = 0;
  iArrLength = aText[0].length;
  iTextPos = 0;
  sContents = '';
  iRow = 0;

  typewriter();
}
function initText2() {
  aText = new Array("Nous remercions nos partenaires sans qui rien n'aurait été possible ")
  iIndex = 0;
  iArrLength = aText[0].length;
  iTextPos = 0;
  sContents = '';
  iRow = 0;

  typewriter();
}
function typewriter() {
  sContents = ' ';
  iRow = Math.max(0, iIndex - iScrollAt);
  let value = swiper.activeIndex-2
  var destination=document.querySelector("#textEluConclusion"+value);
  console.log(destination)
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
function accueil(){
  sessionStorage.clear()
  location.href = "../index.html"
}