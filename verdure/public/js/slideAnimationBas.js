"use strict";

const initSlideAnimationBas = function(){
  const droit = document.querySelector('#animationSlideBas .img_droit');

    // (Re)set initial position of img
  droit.setAttribute('style', 'transform :scale(1);');

  // Animate it

/*****Easing elastic */
  anime({
    targets : "#animationSlideBas .img_haut",
    translateY: -2700,
    easing: 'easeInElastic(1, .5)',
    delay : 200 
  });
  anime({
    targets : "#animationSlideBas .img_gauche",
    translateY: 2700,
    easing: 'easeInElastic(1, .5)',
    delay : 700
  });
  anime({
    targets : "#animationSlideBas .img_droit",
    translateX: -2700,
    easing: 'easeInElastic(1, .5)',
    delay : 1200
  });

  //animation finale
  anime({
    targets: "#animationSlideBas .img_bas",
    scale: 3,
    translateY : -15,
    delay : 1300,
    easing: 'easeInOutSine',
    direction: 'normal',
    duration :2000,
  })
};