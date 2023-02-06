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
  $("#adresse button.text").click(function(){
    console.log("button");
    changeText();
  })
  $("#adresse header button").click(function(){
    swiper.slidePrev();
  })
};

function isValidAdress(adress){
  return true;
}

function changeText(){
  console.log("ici");
  $("#adresse commentaire-soli p").html("Vous me trouvez trop curieux ? Votre adresse va servir à calculer votre potentiel d’ensoleillement.")
}