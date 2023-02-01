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
  switch( swiper.activeIndex ) {
    case 0:
      initSlide1();
      break;
    case 1:
      initSlide2();
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

// switch on-off du son des id='audio'
// les interactions sont repercutés sur tous les boutons 'unlock_audio'
const aud = document.getElementById('audio');
let ubtn = document.querySelectorAll("#unlock_audio");

ubtn.forEach(element => {
  element.addEventListener('click', () => {
    if(aud.muted){
      aud.muted = false;
      ubtn.forEach(e => {
        e.setAttribute('src', 'img/unmute.png')
      });
      
    }else{
      aud.muted = true;
      ubtn.forEach(e => {
        e.setAttribute('src', 'img/mute.png')
      });
    }
  });
});
