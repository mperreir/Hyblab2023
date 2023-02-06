"use strict";


let next_Question = 1
// Init of the (touch friendly) Swiper slider
let swiper = new Swiper("#mySwiper", {
  direction: "vertical",
  mousewheel: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: false,
  },
  allowSlidePrev : true,
  enabled : true
});

swiper.on("slideChange", function () {
  switch( swiper.activeIndex ) {
    case 0:
      initSlideAccueil();
      break;
    case 1:
      initSlideVideo();
      break;
    case 2:
      swiper.disable();
      initSlideQuestion1(next_Question);
      break;
    case 3:
      initSlideAnimationEntreeTexte();
      break;
    case 4: 
    swiper.disable();
      initSlideAnimationDroit();
      break;
    case 5: 
      swiper.disable();
      initSlideQuestion2(next_Question);
      break;
    case 6: 
      swiper.disable();
      initSlideQuestion3(next_Question);
      break;
    case 7: 
      initSlideAnimationEntree();
      break;
    case 8: 
      initSlideAnimationBas();
    break;
    case 9: 
      initEndSlide();
      break;
    default:
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


let selectedZone = ["boulevard0", "parking0", "place0", "friche0"]; // the value of which image to take for each Zone
