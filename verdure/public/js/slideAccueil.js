"use strict";

// async init function (because of the awaits on fetches)
const initSlideAccueil = async function(){

  anime({
    targets :'#scrollAccueil',
    translateY: 10,
    direction: 'alternate',
    easing: 'easeInOutSine',
    loop : true
  })

};