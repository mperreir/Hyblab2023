"use strict";

var executed2 = false;
// Just animate the logo
async function initSlide2() {
  if (!executed2) {
    $("#adresse footer button").click(function () {
      if (Object.keys(quiz).includes("adresse")) {
        swiper.slideNext();
      }
      else {
        changeText();
      }
    });
    $("#adresse input").change(async function () {
      let pa = await getPossibleAddresses($("#adresse input").val());
        console.log(pa);

        $("div.result").html("");
        pa.forEach(elt => {
          $("div.result").append(`<option>${elt['address_text']}</option>`)
        });

        $("div.result").show();
        $("div.result option").click(async function () {
          console.log("option");
          quiz["adresse"] = pa.find(elt => elt["adress_text"] == $(this).html());
          let response = await fetch('api/density/' + quiz["adresse"]["full_adress"]["town"]);
          const density = await response.json();
          quiz["density"] = density["density"];
          // ajouter l'image correspondante
          $("#adresse video").attr("src", `animation/geo-0${quiz["density"].mp4}`);
          console.log($(this).html());
          $('#adresse input').val($(this).html());
          $("div.result").hide();
        })
        
    })
    $('#adresse input').on('input', async function () { // au changement de caractere
        let pa = await getPossibleAddresses($("#adresse input").val());
        console.log(pa);

        $("div.result").html("");
        pa.forEach(elt => {
          $("div.result").append(`<option>${elt['address_text']}</option>`)
        });

        $("div.result").show();
        $("div.result option").click(async function () {
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
    });


    $("#adresse button.text").click(function () {
      console.log("button");
      changeText();
    })
    executed2 = true;
  }


};

function changeText() {
  console.log("ici");
  $("#adresse .commentaire-soli p").html("Vous me trouvez trop curieux ? Votre adresse va servir à calculer votre potentiel d’ensoleillement.")
}

async function getPossibleAddresses(s) {
  // Security
  if (s == undefined) return;

  let response = await fetch('api/searchAddresses/' + s);
  return await response.json();
}

function showOptions() {
  $('option').show();
}

function hideOptions() {
  $('option').hide();
}