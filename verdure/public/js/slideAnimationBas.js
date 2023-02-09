"use strict";

const initSlideAnimationBas = function(){

  UpdateSrcImage('#animationSlideBas');
  const droit = document.querySelector('#animationSlideBas .img_droit');
  var route = document.getElementById('route1');
  route.style.opacity = "0";

    // (Re)set initial position of img
  droit.setAttribute('style', 'transform :scale(1);');

  var logo2 = document.querySelector('#logoSlideBas');

  // (Re)set initial scale of logo
  logo2.setAttribute('style', 'transform : translateY(-50vh);');
  logo2.setAttribute('style', 'transform : scale(1);');
  
//Animations sortie des zones 

  anime({
    targets : "#animationSlideBas .img_haut",
    translateY: -2700,
    easing: 'easeInElastic(1, 2)',
    delay : 200 
  });
  anime({
    targets : "#animationSlideBas .img_gauche",
    translateY: 2700,
    easing: 'easeInElastic(1, 2)',
    delay : 700
  });
  anime({
    targets : "#animationSlideBas .img_droit",
    translateX: 2700,
    easing: 'easeInElastic(1, 2)',
    delay : 1200
  });

  //Animation zoom sur zone restante
  anime({
    targets: "#animationSlideBas .img_bas",
    scale: 2.5,
    translateY : -24.55,
    translateX :-3.45,
    delay : 1300,
    easing: 'easeInOutSine',
    direction: 'normal',
    duration :2000,
  })

  setTimeout(()=> {
    swiper.enable()
    swiper.slideTo(5,1)
 },5000)
};