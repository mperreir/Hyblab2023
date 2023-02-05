"use strict";

// Just animate the logo
const initSlide2 = async function(){
  $("#adresse footer button").click(function(){
    if (isValidAdress($("#adresse input").val())) {
      quiz["adress"] = $("#adresse input").val();
      swiper.slideNext();
      initSlide3();
    }
    
  });
  $("#adresse header button").click(function(){
    swiper.slidePrev();
  })
};

function isValidAdress(adress){
  return true;
}