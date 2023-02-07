"use strict";

const initSlideAnimationEntreeTexte = function(){
    const droit = document.querySelector('#quatre-zones .img_droit');
    const haut = document.querySelector('#quatre-zones .img_haut');
    const bas = document.querySelector('#quatre-zones .img_bas');
    const gauche = document.querySelector('#quatre-zones .img_gauche');
    const zones = document.querySelector('#quatre-zones');

    // (Re)set initial position of img
  droit.setAttribute('style', 'transform :translateX(300%);');
  gauche.setAttribute('style', 'transform :translateX(-300%);');
  haut.setAttribute('style', 'transform :translateY(-300%);');
  bas.setAttribute('style', 'transform :translateY(500%);');
  


  // Animate it

/*****Easing elastic */
  anime({
    targets : "#quatre-zones .img_haut",
    translateY: 0,
    delay : 200,
    duration:2000
  });
  anime({
    targets : "#quatre-zones .img_gauche",
    translateX: 0,
    delay : 700,
    duration:2000
  });
  anime({
    targets : "#quatre-zones .img_droit",
    translateX: 0,
    delay : 1200,
    duration:2000
  });

  anime({
    targets: "#quatre-zones .img_bas",
    translateY : 0,
    delay : 1300,
    duration :2500,
  })

//   anime({
//     targets: "#quatre-zones ",
//     scale: 1.2,
//     delay : 1400,
//     direction: 'normal',
//     duration :2000,
//   })

setTimeout(()=> {
  swiper.enable()
},5000)
  
};