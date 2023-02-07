"use strict";

const initSlideAnimationBas = function(){
  const droit = document.querySelector('#animationSlideBas .img_droit');

    // (Re)set initial position of img
  droit.setAttribute('style', 'transform :scale(1);');

  // Animate it


  /*******
   * GREEN TON place
   */

  var logo2 = document.querySelector('.greenTa');

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
    translateX: -2700,
    easing: 'easeInElastic(1, 2)',
    delay : 1200
  });

  anime({
    targets : "#animationSlideBas .route",
    scale:0,
    delay : 100,
    easing: 'easeInOutSine',
    direction: 'normal',
    duration :2000,
  })

  

  //animation finale
  anime({
    targets: "#animationSlideBas .img_bas",
    scale: 3,
    translateY : -15,
    translateX :0,
    delay : 1300,
    easing: 'easeInOutSine',
    direction: 'normal',
    duration :2000,
  })

  setTimeout(()=> {
    swiper.enable()
    swiper.slideTo(9,1)
 },5000)
};