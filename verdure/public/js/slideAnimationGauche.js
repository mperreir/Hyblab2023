"use strict";

const initSlideAnimationGauche = function(){

  UpdateSrcImage('#animationSlideGauche');
    const droit = document.querySelector('#animationSlideGauche .img_droit');

    // (Re)set initial position of img
  droit.setAttribute('style', 'transform :scale(1);');

  // Animate it


  /*******
   * GREEN TON friche
   */

  var logo2 = document.querySelector('#logoSlideGauche');

  // (Re)set initial scale of logo
  logo2.setAttribute('style', 'transform : translateY(-50vh);');
  logo2.setAttribute('style', 'transform : scale(1);');
  
  // Animate hyblab logo and make shrink on click
  anime({
    targets: '.greenTa',
    translateY: 0,
    scale: 1.2,
    easing: 'easeOutBounce',
    loop : true,
    direction: "alternate"
  });
/*****Easing elastic */
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

  anime({
    targets : "#animationSlideGauche .route",
    scale:0,
    delay : 100,
    easing: 'easeInOutSine',
    direction: 'normal',
    duration :2000,
  })

  //animation finale
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