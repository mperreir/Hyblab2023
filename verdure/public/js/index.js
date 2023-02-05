"use strict";

// Init of the (touch friendly) Swiper slider
let swiper = new Swiper("#mySwiper", {
  direction: "vertical",
  mousewheel: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
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
      swiper.disable()
      initSlideQuestion(currentZoneNumber);
      break;
    case 2 :
      initSlideAnimationHaut();
      break;
    case 3: 
      initSlideAnimationDroit();
      break;
    case 4: 
      initSlideAnimationGauche();
      break;
    case 5: 
      initSlideAnimationBas();
      break;
    case 6: 
      initSlideAnimationEntree();
      break;
    case 7: 
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
