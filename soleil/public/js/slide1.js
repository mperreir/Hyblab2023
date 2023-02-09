"use strict";
var executed1 = false;
let quiz = {}
// async init function (because of the awaits on fetches)
const initSlide1 = async function(){
  $("video").get(0).play();
    if(!executed1){
      executed1 = true;
      $("#accueil button").click(function(){
        console.log("accueil")
        swiper.slideNext();
      });
      // Retrieve the partner's topic from our API
  let response = await fetch('api/topic');
  const data1 = await response.json();

  // Get some dummy data
  response = await fetch('data/dummy.json');
  const data2 = await response.json();
    }
   
   

  

};