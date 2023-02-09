"use strict";

var executed2 = false;
// Just animate the logo
<<<<<<< HEAD
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
=======
const initSlide2 = async function(){
  if(!executed2){
    $("#adresse footer button").click(function(){
        if (Object.keys(quiz).includes("adresse")){
          swiper.slideNext(); 
        }
        else{
          changeText();
        }         
    });
    $("#adresse input").change(function(){
      let pa =getPossibleAdresse();
        $("div.result").html("");
        pa.forEach(elt => {
          $("div.result").append(`<option>${elt}</option>`)
        });
        
        $("div.result").show();
        $("div.result option").click(function(){
          console.log("option");
          quiz["adresse"] = $(this).html();
          $('#adresse input').val($(this).html());
          $("div.result").hide();
        });
    })
    $('#adresse input').on('input', function() { // au changement de caractere
      if($("#adresse input").val().charAt($("#adresse input").val().length - 1) == " "){
        let pa =getPossibleAdresse($("#adresse input").val());
        console.log(pa);
        $("div.result").html("");
        pa.forEach(elt => {
          $("div.result").append(`<option>${elt[address_text]}</option>`)
        });
        
        $("div.result").show();
        $("div.result option").click(async function(){
          console.log("option");
          quiz["adresse"] = pa.find(elt => elt["adress_text"] == $(this).html()); 
          let response = await fetch('api/density/' + quiz["adresse"]["full_adress"]["town"]);
          const density = await response.json();
          quiz["density"] = density["density"];
          // ajouter l'image correspondante
          $("#adresse video").attr("src", `animation/geo-0${quiz["density"].mp4}`);
          $('#adresse input').val($(this).html());
          $("div.result").hide();
        })
      }
  });
  

    $("#adresse button.text").click(function(){
      console.log("button");
      changeText();
    })
    executed2 = true;
  }
  
  
};

function changeText(){
>>>>>>> front-lea
  console.log("ici");
  $("#adresse .commentaire-soli p").html("Vous me trouvez trop curieux ? Votre adresse va servir à calculer votre potentiel d’ensoleillement.")
}

const getPossibleAdresse = async function(s){
  let response = await fetch('api/searchAddresses/' + s);
  return await response.json();
}

function showOptions(){
  $('option').show();
}

function hideOptions(){
  $('option').hide();
}