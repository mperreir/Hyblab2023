"use strict";


let next_Question = 1
// Init of the (touch friendly) Swiper slider
let swiper = new Swiper("#mySwiper", {
  direction: "vertical",
  mousewheel: true,
  
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
      if(next_Question == 2){
      swiper.disable();
      initSlideQuestion2(next_Question);
      }
      else(swiper.slideTo(7,1))
      break;
    case 6: 
    if(next_Question == 3){
      swiper.disable();
      initSlideQuestion3(next_Question);
      }
      else(swiper.slideTo(7,1))
      break;
    case 7: 
      initSlideAnimationEntree();
      break;
    case 8: 
      initSlideAnimationBas();
      break;

    case 9: 
      if(next_Question == 4){
      swiper.disable();
      initSlideQuestion4(next_Question);
      }
      else(swiper.slideTo(12,1))
      break;

    case 10: 
    if(next_Question == 5){
      swiper.disable();
      initSlideQuestion5(next_Question);
      }
      else(swiper.slideTo(11,1))
      break;

    case 11: 
    if(next_Question == 6){
      swiper.disable();
      initSlideQuestion6(next_Question);
      }
      else(swiper.slideTo(12,1))
      break;

    //case 12: 
      // initSlideAnimationEntree();
    //break;

    case 12: 
        initSlideAnimationGauche();
    break;

    case 13: 
    if(next_Question == 7){
      swiper.disable();
      initSlideQuestion7(next_Question);
      }
      else(swiper.slideTo(14,1))
    break;

    case 14: 
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
