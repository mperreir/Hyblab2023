"use strict";

// Just animate the logo
const initSlideAnimationHaut = function(){

  UpdateSrcImage('#animationSlideHaut');
  const haut = document.querySelector('.img_haut');
  let route = document.getElementById('route2');
    route.style.opacity = 0;
    

    // (Re)set initial position of img
  haut.setAttribute('style', 'transform :scale(1);');

  
  /*******
   * GREEN Ta place
   */

  var logo2 = document.querySelector('#logoSlideHaut');

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

  anime({
    targets : "#animationSlideHaut .route",
    scale:0,
    delay : 100,
    easing: 'easeInOutSine',
    direction: 'normal',
    duration :2000,
  })

  //animation finale
  anime({
    targets: "#animationSlideHaut .img_haut",
    scale: 3,
    delay : 1300,
    easing: 'easeInOutSine',
    direction: 'normal',
    duration :2000,
  })

  setTimeout(()=> {
    swiper.enable()
    swiper.slideTo(9,1)
 },4000)

};