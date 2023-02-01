"use strict";

// Init of the (touch friendly) Swiper slider
let swiper = new Swiper("#mySwiper", {
  direction: "vertical",
  mousewheel: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

swiper.on("slideChange", function () {
  switch( swiper.activeIndex ) {
    case 0:
      initSlideAccueil();
      break;
    case 1:
      initSlideQuestion();
      break;
    case 2: 
      initSlideFin();
      break;
  }
});

// Wait for the content to preload and display 1st slide
// Here we simulate a loading time of one second
setTimeout(() => { 
  // fade out the loader "slide"
  // and send it to the back (z-index = -1)
  anime({
    delay: 1,
    targets: '#loader',
    opacity: '0',
    'z-index' : -1,
    easing: 'easeOutQuad',
  });
  // Init first slide
  initSlideAccueil();
}, 1);