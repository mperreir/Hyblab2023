"use strict";

// async init function (because of the awaits on fetches)
const initSlideQuestion = async function(){
  // Get logo element
  const page = document.querySelector('#question-slide')
  let question = document.querySelector('#question')
    

  page.addEventListener('click', () => {
        console.log("OKK")
        question.style.opacity = 100;
        page.style.backgroundPositionY = "-5vh";
        indic.style.opacity= 0;
  }
  )


  const indic = document.querySelector('.indic');

  // Animate hyblab logo and make shrink on click
  anime({
    targets: '.indic',
    scale: 1.2,
    easing: 'easeInOutQuad',
    direction: 'alternate',
    loop: true
  });


};


