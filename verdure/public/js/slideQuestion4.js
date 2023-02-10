"use strict";

// async init function (because of the awaits on fetches)
const initSlideQuestion4 = async function(currentQuestion){

  console.log(currentQuestion)
  if(currentQuestion != 4){swiper.enable(); swiper.slideTo(12)} 

  const page = document.getElementById(currentQuestion)
  let question = document.querySelector('.question-footer'+currentQuestion)
  let city = document.querySelector('#city'+currentQuestion)

  setTimeout(()=> {
   question.style.opacity = 100;
   city.style.top = "23%";
},500
 )

// questions
await questions();


};
