"use strict";

// Just animate the logo
const initSlideAnimationDroit = function(){
  const droit = document.querySelector('#animationSlideDroit .img_droit');

    // (Re)set initial position of img
  droit.setAttribute('style', 'transform :scale(1);');

  // Animate it

/*****Easing elastic */
  anime({
    targets : "#animationSlideDroit .img_haut",
    translateY: -2700,
    easing: 'easeInElastic(1, .5)',
    delay : 200 
  });
  anime({
    targets : "#animationSlideDroit .img_bas",
    translateY: 2700,
    easing: 'easeInElastic(1, .5)',
    delay : 700
  });
  anime({
    targets : "#animationSlideDroit .img_gauche",
    translateX: -2700,
    easing: 'easeInElastic(1, .5)',
    delay : 1200
  });

  //animation finale
  anime({
    targets: "#animationSlideDroit .img_droit",
    scale: 3,
    translateX : -20,
    delay : 1300,
    easing: 'easeInOutSine',
    direction: 'normal',
    duration :2000,
  })
};