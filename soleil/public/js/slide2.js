"use strict";

// Just animate the logo
const initSlide2 = function(){
  $("#adresse footer button").click(function(){
    swiper.slideNext()
    initSlide3();
  });
  $("#adresse header button").click(function(){
    swiper.slidePrev();
  })
  // Get img element
  const img = document.querySelector('#img-fini');

  // (Re)set initial position of img
  img.setAttribute('style', 'transform : translateY(-50vh);');

  // Animate it
  anime({
    targets: '#img-fini',
    translateY: 0,
    easing: 'easeOutBounce'  
  });
};