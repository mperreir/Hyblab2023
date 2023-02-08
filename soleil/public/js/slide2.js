"use strict";

var executed2 = false;
// Just animate the logo
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
  console.log("ici");
  $("#adresse .commentaire-soli p").html("Vous me trouvez trop curieux ? Votre adresse va servir à calculer votre potentiel d’ensoleillement.")
}

function getPossibleAdresse(s){
  return ["bon","ici"];
}

function showOptions(){
  $('option').show();
}

function hideOptions(){
  $('option').hide();
}