"use strict";

// Just animate the logo
const initSlideFin = function(){
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