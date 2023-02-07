"use strict";

// Just animate the logo
const initSlideAnimationDroit = function(){

  UpdateSrcImage('#animationSlideDroit');
  const droit = document.querySelector('#animationSlideDroit .img_droit');

    // (Re)set initial position of img
  droit.setAttribute('style', 'transform :scale(1);');

  // Animate it
  /********************LOGO */
  var logo2 = document.querySelector('.greenTa');
/*******
   * GREEN TON parking
   */

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

  //animation finale
  anime({
    targets: "#animationSlideDroit .img_droit",
    scale: 3,
    translateX : -30,
    delay : 1300,
    easing: 'easeInOutSine',
    direction: 'normal',
    duration :2000,
  })

  anime({
    targets : "#animationSlideDroit .route",
    scale:0,
    delay : 100,
    easing: 'easeInOutSine',
    direction: 'normal',
    duration :2000,
  })


  setTimeout(()=> {
    swiper.enable()
    swiper.slideTo(5,1)
 },5000)
  
};