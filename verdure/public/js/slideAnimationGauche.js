"use strict";

const initSlideAnimationGauche = function(){

    UpdateSrcImage('#animationSlideGauche');
    const droit = document.querySelector('#animationSlideGauche .img_droit');
    let route = document.getElementById('#route');
    route.style.opacity = 0;

  // (Re)set initial position of img
  droit.setAttribute('style', 'transform :scale(1);');
  var logo2 = document.querySelector('#logoSlideGauche');

  // (Re)set initial scale of logo
  logo2.setAttribute('style', 'transform : translateY(-50vh);');
  logo2.setAttribute('style', 'transform : scale(1);');
  
//Animations sortie des zones 

  anime({
    targets : "#animationSlideGauche .img_haut",
    translateY: -2700,
    easing: 'easeInElastic(1, 2)',
    delay : 200 
  });
  anime({
    targets : "#animationSlideGauche .img_bas",
    translateY: 2700,
    easing: 'easeInElastic(1, 2)',
    delay : 700
  });
  anime({
    targets : "#animationSlideGauche .img_droit",
    translateX: -2700,
    easing: 'easeInElastic(1, 2)',
    delay : 1200
  });

  //Animation zoom sur zone restante

  anime({
    targets: "#animationSlideGauche .img_gauche",
    scale: 3,
    translateX : 30,
    delay : 1300,
    easing: 'easeInOutSine',
    direction: 'normal',
    duration :2000,
  })

  setTimeout(()=> {
    swiper.enable()
    swiper.slideTo(13,1)
 },5000)

};