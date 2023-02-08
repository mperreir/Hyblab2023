"use strict";
var executed5 = false;

const initSlide5 = function(){
    if(!executed5){
        executed5 = true;
        $("#orientation header button").click(function(){
            
        });
        $("#orientation footer button").click(function(){
            swiper.slideNext();
        })
        $("#orientation .boussole").click(function(){
            changeEnsoleillement();
        })
        $("#orientation #tropdechoix").click(function(){
            changeEnsoleillement();
        })
    }
    
}

 function changeEnsoleillement(){
    let alt = (parseInt($(".boussole img").attr("alt")) + 1) %8;
    // changement de la boussole
    $(".boussole img").attr("alt", alt);
    $(".boussole img").attr("src", `img/boussole/${alt}.jpg`);
    // changement de l'image au dessus
    $("#tropdechoix").attr("src", `img/ensoleillement/${alt}-${quiz["pente"]}-commune.jpg`);
    
 }
/*
let ensoleillement = $(???).val();   // CAMPAGNE - TOIT PLAT
switch (ensoleillement) {
    case "1":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/1-1-campagne.jpg");
        break;
    case "2":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/2-1-campagne.jpg");
        break;
    case "3":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/3-1-campagne.jpg");
        break;
    case "4":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/4-1-campagne.jpg");
        break;
    case "5":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/5-1-campagne.jpg");
        break;
    case "6":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/6-1-campagne.jpg");
        break;
    case "7":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/7-1-campagne.jpg");
        break;
    case "8":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/8-1-campagne.jpg");
        break;
    default:
        break;
}

let ensoleillement = $(???).val();   // CAMPAGNE - TOIT STANDARD
switch (ensoleillement) {
    case "1":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/1-2-campagne.jpg");
        break;
    case "2":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/2-2-campagne.jpg");
        break;
    case "3":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/3-2-campagne.jpg");
        break;
    case "4":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/4-2-campagne.jpg");
        break;
    case "5":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/5-2-campagne.jpg");
        break;
    case "6":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/6-2-campagne.jpg");
        break;
    case "7":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/7-2-campagne.jpg");
        break;
    case "8":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/8-2-campagne.jpg");
        break;
    default:
        break;
}

let ensoleillement = $(???).val();   // CAMPAGNE - TOIT PENTU
switch (ensoleillement) {
    case "1":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/1-3-campagne.jpg");
        break;
    case "2":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/2-3-campagne.jpg");
        break;
    case "3":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/3-3-campagne.jpg");
        break;
    case "4":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/4-3-campagne.jpg");
        break;
    case "5":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/5-3-campagne.jpg");
        break;
    case "6":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/6-3-campagne.jpg");
        break;
    case "7":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/7-3-campagne.jpg");
        break;
    case "8":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/8-3-campagne.jpg");
        break;
    default:
        break;
}

let ensoleillement = $(???).val();   // COMMUNE - TOIT PLAT
switch (ensoleillement) {
    case "1":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/1-1-commune.jpg");
        break;
    case "2":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/2-1-commune.jpg");
        break;
    case "3":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/3-1-commune.jpg");
        break;
    case "4":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/4-1-commune.jpg");
        break;
    case "5":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/5-1-commune.jpg");
        break;
    case "6":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/6-1-commune.jpg");
        break;
    case "7":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/7-1-commune.jpg");
        break;
    case "8":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/8-1-commune.jpg");
        break;
    default:
        break;
}

let ensoleillement = $(???).val();   // COMMUNE - TOIT STANDARD
switch (ensoleillement) {
    case "1":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/1-2-commune.jpg");
        break;
    case "2":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/2-2-commune.jpg");
        break;
    case "3":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/3-2-commune.jpg");
        break;
    case "4":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/4-2-commune.jpg");
        break;
    case "5":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/5-2-commune.jpg");
        break;
    case "6":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/6-2-commune.jpg");
        break;
    case "7":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/7-2-commune.jpg");
        break;
    case "8":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/8-2-commune.jpg");
        break;
    default:
        break;
}

let ensoleillement = $(???).val();   // COMMUNE - TOIT PENTU
switch (ensoleillement) {
    case "1":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/1-3-commune.jpg");
        break;
    case "2":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/2-3-commune.jpg");
        break;
    case "3":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/3-3-commune.jpg");
        break;
    case "4":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/4-3-commune.jpg");
        break;
    case "5":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/5-3-commune.jpg");
        break;
    case "6":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/6-3-commune.jpg");
        break;
    case "7":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/7-3-commune.jpg");
        break;
    case "8":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/8-3-commune.jpg");
        break;
    default:
        break;
}

let ensoleillement = $(???).val();   // VILLE - TOIT PLAT
switch (ensoleillement) {
    case "1":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/1-1-ville.jpg");
        break;
    case "2":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/2-1-ville.jpg");
        break;
    case "3":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/3-1-ville.jpg");
        break;
    case "4":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/4-1-ville.jpg");
        break;
    case "5":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/5-1-ville.jpg");
        break;
    case "6":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/6-1-ville.jpg");
        break;
    case "7":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/7-1-ville.jpg");
        break;
    case "8":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/8-1-ville.jpg");
        break;
    default:
        break;
}

let ensoleillement = $(???).val();   // VILLE - TOIT STANDARD
switch (ensoleillement) {
    case "1":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/1-2-ville.jpg");
        break;
    case "2":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/2-2-ville.jpg");
        break;
    case "3":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/3-2-ville.jpg");
        break;
    case "4":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/4-2-ville.jpg");
        break;
    case "5":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/5-2-ville.jpg");
        break;
    case "6":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/6-2-ville.jpg");
        break;
    case "7":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/7-2-ville.jpg");
        break;
    case "8":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/8-2-ville.jpg");
        break;
    default:
        break;
}

let ensoleillement = $(???).val();   // VILLE - TOIT PENTU
switch (ensoleillement) {
    case "1":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/1-3-ville.jpg");
        break;
    case "2":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/2-3-ville.jpg");
        break;
    case "3":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/3-3-ville.jpg");
        break;
    case "4":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/4-3-ville.jpg");
        break;
    case "5":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/5-3-ville.jpg");
        break;
    case "6":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/6-3-ville.jpg");
        break;
    case "7":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/7-3-ville.jpg");
        break;
    case "8":
        $("#orientation ???);
        $("#orientation ???").attr("src", "img/ensoleillement/8-3-ville.jpg");
        break;
    default:
        break;
}

*/