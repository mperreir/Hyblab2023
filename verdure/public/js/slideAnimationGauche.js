"use strict";

const initSlideAnimationGauche = function(){
    const droit = document.querySelector('#animationSlideGauche .img_droit');

    // (Re)set initial position of img
  droit.setAttribute('style', 'transform :scale(1);');

  // Animate it

/*****Easing elastic */
  anime({
    targets : "#animationSlideGauche .img_haut",
    translateY: -2700,
    easing: 'easeInElastic(1, .5)',
    delay : 200 
  });
  anime({
    targets : "#animationSlideGauche .img_bas",
    translateY: 2700,
    easing: 'easeInElastic(1, .5)',
    delay : 700
  });
  anime({
    targets : "#animationSlideGauche .img_droit",
    translateX: -2700,
    easing: 'easeInElastic(1, .5)',
    delay : 1200
  });

  //animation finale
  anime({
    targets: "#animationSlideGauche .img_gauche",
    scale: 3,
    translateX : 25,
    delay : 1300,
    easing: 'easeInOutSine',
    direction: 'normal',
    duration :2000,
  })
};