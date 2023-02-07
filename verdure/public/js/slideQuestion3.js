"use strict";

// async init function (because of the awaits on fetches)
const initSlideQuestion3 = async function(currentQuestion){

  if(currentQuestion != 3){swiper.enable(); swiper.slideTo(7)}

  const page = document.getElementById(currentQuestion)
  let question = document.querySelector('.question-footer'+currentQuestion)
  let city = document.querySelector('#city'+currentQuestion)

  var logo2 = document.querySelector('#logoQ3');
  /*******
     * GREEN Ton parking
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
  

  setTimeout(()=> {
   question.style.opacity = 100;
   city.style.top = "20%";
},1000
 )

// questions
await questions();

const indic = document.querySelector('.indic');
  anime({
    targets: '.indic',
    scale: 1.2,
    easing: 'easeInOutQuad',
    direction: 'alternate',
    loop: true
  });
};
