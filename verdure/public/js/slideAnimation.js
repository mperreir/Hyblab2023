"use strict";

// Just animate the logo
const initSlideAnimation = function(){
    const haut = document.querySelector('#haut');
    const bas = document.querySelector('#bas');
    const gauche = document.querySelector('#gauche');
    const droit = document.querySelector('#droit');

    // (Re)set initial position of img
  //haut.setAttribute('style', 'transform : translateY(-20vh);');
  haut.setAttribute('style', 'transform :scale(1);');

  // Animate it

/*****Easing elastic */
  anime({
    targets : "#img_droit",
    translateX: 2700,
    easing: 'easeInElastic(1, .5)',
    delay : 200 
  });
  anime({
    targets : "#bas",
    translateY: 2700,
    easing: 'easeInElastic(1, .5)',
    delay : 700
  });
  anime({
    targets : "#img_gauche",
    translateX: -2700,
    easing: 'easeInElastic(1, .5)',
    delay : 1200
  });
  anime({
    targets: "#haut",
    scale: 3,
    //translateY : 0,
    delay : 1300,
    easing: 'easeInOutSine',
    direction: 'normal',
    duration :2000,
    
    
  })

  /*STAGERRING*/
};