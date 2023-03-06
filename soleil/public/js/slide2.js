"use strict";
let help = [
  {
    "latitude": "43.7009358",
    "longitude": "7.2683912",
    "full_address": {
      "street_number": 0,
      "street": "Nice",
      "zip_code": "France métropolitaine",
      "town": "Provence-Alpes-Côte d'Azur"
    },
    "address_text": "0 Nice, France métropolitaine PROVENCE-ALPES-CÔTE D'AZUR"
  },
  {
    "latitude": "43.7047452",
    "longitude": "7.2615981",
    "full_address": {
      "street_number": 0,
      "street": "Nice-Ville",
      "zip_code": "06000",
      "town": "Thiers"
    },
    "address_text": "0 Nice-Ville, 06000 THIERS"
  },
  {
    "latitude": "43.7048948",
    "longitude": "7.2617264",
    "full_address": {
      "street_number": 0,
      "street": "Nice-Ville",
      "zip_code": "06000",
      "town": "Thiers"
    },
    "address_text": "0 Nice-Ville, 06000 THIERS"
  }
];

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
    $("#adresse #search").click(async function () {
      let pa = await getPossibleAddresses($("#adresse input").val());
      console.log(pa);

      $("div.result").html("");
      pa.forEach(elt => {
        $("div.result").append(`<option>${elt['address_text']}</option>`)
      });

      $("div.result").show();
      $("div.result option").click(async function () {
        console.log("option");
        quiz["adresse"] = pa.find(elt => elt["address_text"] == $(this).html());
        let response = await fetch('api/density/' + quiz["adresse"]["full_address"]["town"]).then(result=>{
          const density =  result.json();
          console.log(density);
          quiz["density"] = density["density"];
        // ajouter l'image correspondante
          $("#adresse video").attr("src", `animation/geo-0${quiz["density"].mp4}`);
          $('#adresse input').val($(this).html());
          $("div.result").hide();
        }).catch(error =>{
          quiz["density"] = erreur;
        });
        
        
      })
    })

    $("#adresse input").change(async function () {
      let pa = await getPossibleAddresses($("#adresse input").val());
      console.log(pa);

      $("div.result").html("");
      pa.forEach(elt => {
        $("div.result").append(`<option>${elt['address_text']}</option>`)
      });

      $("div.result").show();
      $("div.result option").click(async function () {
        console.log(quiz["adresse"]);
        quiz["adresse"] = pa.find(elt => elt["address_text"] == $(this).html());

        let response = await fetch('api/density/' + quiz["adresse"]["full_address"]["town"]).then(result=>{
          const density =  result.json();
          console.log(density);
          quiz["density"] = density["density"];
        // ajouter l'image correspondante
          $("#adresse video").attr("src", `animation/geo-0${quiz["density"].mp4}`);
          $('#adresse input').val($(this).html());
          $("div.result").hide();
        }).catch(error =>{
          quiz["density"] = erreur;
        });
      })

    })


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