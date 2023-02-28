"use strict";

// Init of the (touch friendly) Swiper slider
const swiper = new Swiper("#mySwiper", {
  direction: "vertical",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

swiper.on("slideChange", function () {
  switch (swiper.activeIndex) {
    case 0:
      initSlide1();
      break;
    case 1:
      initSlide2();
      break;
    case 2:
      initSlide3();
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
    'z-index': -1,
    easing: 'easeOutQuad',
  });
  // Init first slide
  initSlide1();
}, 1000);

// switch on-off du son des id='audio'
// les interactions sont repercutés sur tous les boutons 'unlock_audio'
const aud = document.getElementById('audio');
let ubtn = document.querySelectorAll("#unlock_audio");

ubtn.forEach(element => {
  element.addEventListener('click', () => {
    if (aud.muted) {
      aud.muted = false;
      ubtn.forEach(e => {
        e.setAttribute('src', 'img/ux_kit/Son.svg')
      });

    } else {
      aud.muted = true;
      ubtn.forEach(e => {
        e.setAttribute('src', 'img/ux_kit/Son_off.svg')
      });
    }
  });
});

function init_storage() {
  window.localStorage.setItem('compt', "");
  window.localStorage.setItem('heure', " 8:00 ");
  window.localStorage.setItem("popup", "false");
  window.localStorage.setItem("first-acquis", "false");
  window.localStorage.setItem("is_end", "false");
  window.localStorage.setItem('started', 0);
  window.localStorage.setItem('steps', 0);
  window.localStorage.setItem('manger', "false");
  window.localStorage.setItem('pipi', "false");
  window.localStorage.setItem('_8', "false");
  window.localStorage.setItem('_9', "false");
  window.localStorage.setItem('_10', "false");
  window.localStorage.setItem('_11', "false");
  window.localStorage.setItem('_12', "false");
  window.localStorage.setItem('_13', "false");
  window.localStorage.setItem('_14', "false");
  window.localStorage.setItem('_16', "false");
  window.localStorage.setItem('achievement1', "true");
  window.localStorage.setItem('achievement2', "false");
  window.localStorage.setItem('achievement3', "false");
  window.localStorage.setItem('achievement4', "false");
  window.localStorage.setItem('achievement5', "false");
  window.localStorage.setItem('achievement6', "false");
  window.localStorage.setItem('achievement7', "false");
  window.localStorage.setItem('achievement8', "false");
  window.location = "./map.html"
}