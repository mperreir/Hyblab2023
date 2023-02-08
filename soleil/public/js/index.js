"use strict";


// Init of the (touch friendly) Swiper slider
const swiper = new Swiper("#mySwiper", {
  direction: "vertical",
  observer: true,
  //mousewheel: true,
});

swiper.on("slideChange", function () {
  console.log(swiper.activeIndex);
  switch( swiper.activeIndex ) {
    case 0:
      initSlide0();
      break;
    case 1:
      initSlide1();
      break;
    case 2:
      initSlide2();
      break;
    case 3:
      initSlide3();
      break;
    case 4:
      initSlide4();
      break;
    case 5:
      initSlide5();
      break;
    case 6:
      initSlide6();
      break;
    case 7:
      initSlide7();
      break;
    case 8:
      initSlide8();
      break;
    case 9:
      initSlide9();
      break;
    case 10:
      initSlideInfo1();
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
  initSlide0();
}, 1000);

$(".retour").click(function(){
  swiper.slidePrev();
})