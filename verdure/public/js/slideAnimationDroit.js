"use strict";

// Just animate the logo
const initSlideAnimationDroit = function(){

  UpdateSrcImage('#animationSlideDroit');
  const droit = document.querySelector('#animationSlideDroit .img_droit');
  let route = document.getElementById('route3');
  route.style.opacity = 0;

    // (Re)set initial position of img
  droit.setAttribute('style', 'transform :scale(1);');

  var logo2 = document.querySelector('#logoSlideDroit');

  // (Re)set initial scale of logo
  logo2.setAttribute('style', 'transform : translateY(-50vh);');
  logo2.setAttribute('style', 'transform : scale(1);');
  
//Animations sortie des zones 

  anime({
    targets : "#animationSlideDroit .img_haut",
    translateY: -2700,
    easing: 'easeInElastic(1, 2)',
    delay : 200 
  });
  anime({
    targets : "#animationSlideDroit .img_bas",
    translateY: 2700,
    easing: 'easeInElastic(1, 2)',
    delay : 700
  });
  anime({
    targets : "#animationSlideDroit .img_gauche",
    translateX: -2700,
    easing: 'easeInElastic(1, 2)',
    delay : 1200
  });

  //Animation zoom sur zone restante
  anime({
    targets: "#animationSlideDroit .img_droit",
    scale: 3,
    translateX : -30,
    delay : 1300,
    easing: 'easeInOutSine',
    direction: 'normal',
    duration :2000,
  })

  setTimeout(()=> {
    swiper.enable()
    swiper.slideTo(14,1)
 },5000)
  
};