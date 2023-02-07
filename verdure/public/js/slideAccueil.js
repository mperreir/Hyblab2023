"use strict";

// async init function (because of the awaits on fetches)
const initSlideAccueil = async function(){
  // Get logo element
  const logo = document.querySelector('#logo-verdure');

  // (Re)set initial scale of logo
  logo.setAttribute('style', 'transform : translateY(-50vh);');
  
  // Animate hyblab logo and make shrink on click
  anime({
    targets: '#logo-verdure',
    translateY: 0,
    easing: 'easeOutBounce'
  });

  anime({
    targets :'#scrollAccueil',
    translateY: 10,
    direction: 'alternate',
    easing: 'easeInOutSine',
    loop : true
  })

  // Add click listener
  logo.addEventListener('click', () => {
    anime({
        targets: '#logo-verdure',
        scale: 0
      });
    swiper.slideNext()
  });

};