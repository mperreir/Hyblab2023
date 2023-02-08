"use strict";

var executed2 = false;
// Just animate the logo
const initSlide2 = async function () {
  $("#adresse footer button").click(async function () {

    if (isValidAdress($("#adresse input").val())) {
      quiz["addressInput"] = $("#adresse input").val();

      console.log(quiz["addressInput"]);

      quiz["address"] = await fetch(`api/searchAddresses/${quiz["addressInput"]}`)
        .then(swiper.slideNext());
      initSlide3();
    }


  });
  $("#adresse button.text").click(function () {
    console.log("button");
    changeText();
  })
  $("#adresse header button").click(function () {
    swiper.slidePrev();
  })
};

function isValidAdress(adress) {
  return true;
}

function changeText() {
  console.log("ici");
  $("#adresse commentaire-soli p").html("Vous me trouvez trop curieux ? Votre adresse va servir à calculer votre potentiel d’ensoleillement.")
}