"use strict";

// Just animate the logo
const initSlideAnimationHaut = function(){
  const haut = document.querySelector('.img_haut');
    

    // (Re)set initial position of img
  haut.setAttribute('style', 'transform :scale(1);');

  // Animate it

/*****Easing elastic */
  anime({
    targets : " #animationSlideHaut .img_droit",
    translateX: 2700,
    easing: 'easeInElastic(1, 2)',
    delay : 200 
  });
  anime({
    targets : '#animationSlideHaut .img_bas',
    translateY: 2700,
    easing: 'easeInElastic(1, 2)',
    delay : 700
  });
  anime({
    targets : " #animationSlideHaut .img_gauche",
    translateX: -2700,
    easing: 'easeInElastic(1, 2)',
    delay : 1200
  });

  //animation finale
  anime({
    targets: "#animationSlideHaut .img_haut",
    scale: 3,
    delay : 1300,
    easing: 'easeInOutSine',
    direction: 'normal',
    duration :2000,
  })
};