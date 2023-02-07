"use strict";

let IndicThermo = 85;
let IndicMoney = 80;
let IndicHappy = 50;

let next_Question = 1


// Init of the (touch friendly) Swiper slider
let swiper = new Swiper("#mySwiper", {
  direction: "vertical",
  mousewheel: true,
  allowSlidePrev : false,
  enabled : true,
});

swiper.on("slideChange", function () {
  console.log(swiper.activeIndex);
  switch( swiper.activeIndex ) {
   
    case 0:
      
      initSlideVideo();
      break;

    case 1:
     
      initSlideAccueil();
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
      initSlideAnimationBas();
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
      swiper.disable();
      initSlideAnimationHaut();
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

    case 12: 
       initSlideAnimationEntree2();
    break;

    case 13: 
        swiper.disable();
        initSlideAnimationDroit();
    break;

    case 14: 
    if(next_Question == 7){
      swiper.disable();
      initSlideQuestion7(next_Question);
      }
      else(swiper.slideTo(15,1))
    break;

    case 15: 
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
  initSlideVideo();
}, 1);


let selectedZone = ["b&w_boulevard", "b&w_parking", "b&w_place", "b&w_friche"]; // the value of which image to take for each Zone
