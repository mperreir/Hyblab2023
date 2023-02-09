"use strict";
var executed9 = false;

const initSlide9 = async function(){
    if(!executed9){
        executed9 = true;
        let mission = getMission();
        $("#lettre_mission").html("");
        let num = 1;
        mission.forEach(elt=>{
            $("#lettre_mission").append(`<div id="Contour" title="${num}"><p id="LdM">Lettre de mission</p><p id="numero">N°${num}</p></div><span hidden="true" title="${num}" class=\"article\"><p>${elt["texte"]}</p></span>`);
            num +=1;
        });
        $("#lettre_mission div").click(function(){
            $(`#lettre_mission span[title="${$(this).attr("title")}"]`).attr("hidden", false);
        });
        $("#facultatif footer button").eq(0).click(function(){
            swiper.slideNext();
        })
        $("#facultatif footer .passer").click(function(){
            swiper.slideNext();
        })
    }
}

function getMission(){
    let missions = [];
    if()
    return [{"title":"t", "texte":"blabla"},{"title":"t", "texte":"blabla"}];
}