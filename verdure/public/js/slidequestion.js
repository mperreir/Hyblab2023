"use strict";

// async init function (because of the awaits on fetches)
const initSlideQuestion = async function(){
  // Get logo element
  const page = document.querySelector('#question-slide')
  let question = document.querySelector('#question')
  let city = document.querySelector('.city')
    
 
  page.addEventListener('click', () => {
        question.style.opacity = 100;
        page.style.backgroundPositionY = "-10vh";
        indic.style.opacity= 0;
        city.style.top = "20%";
        swiper.enabled= true;
        swiper.enable();
  }
  )


// swiper.on('touchMove',function(event){
//   console.log("OKK")
//   var speed =event.velocity;
//   if (speed>0.5){
//     question.style.opacity = 100;
//   page.style.backgroundPositionY = "-5vh";
//   indic.style.opacity= 0;
//   swiper.enable();
//   }
//   else{
//     question.style.opacity = 100;
//   page.style.backgroundPositionY = "-5vh";
//   indic.style.opacity= 0;
//   swiper.enable();
//   }
  
// })
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

