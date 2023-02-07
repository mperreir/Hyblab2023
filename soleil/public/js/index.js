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
      initSlide1();
      break;
    case 1:
      initSlide2();
      break;
    case 2:
      initSlide3();
      break;
    case 3:
      initSlide4();
      break;
    case 4:
      initSlide5();
      break;
    case 5:
      initSlide6();
      break;
    case 6:
      initSlide7();
      break;
    case 7:
      initSlide8();
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

$(".retour").click(function(){
  swiper.slidePrev();
})