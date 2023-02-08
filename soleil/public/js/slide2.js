"use strict";

var executed2 = false;
// Just animate the logo
const initSlide2 = async function(){
  if(!executed2){
    $("#adresse footer button").click(function(){
      if (isValidAdress($("#adresse input").val())) {
        quiz["adress"] = $("#adresse input").val();
          swiper.slideNext();      
      }
  
      
    });
    $("#adresse button.text").click(function(){
      console.log("button");
      changeText();
    })
    executed2 = true;
  }
  
  
};

function isValidAdress(adress){
  return true;
}

function changeText(){
  console.log("ici");
  $("#adresse commentaire-soli p").html("Vous me trouvez trop curieux ? Votre adresse va servir à calculer votre potentiel d’ensoleillement.")
}