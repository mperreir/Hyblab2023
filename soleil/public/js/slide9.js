"use strict";
var executed9 = false;

const initSlide9 = async function(){
    if(!executed9){
        executed9 = true;
        let mission = getMission();
        $("#lettre_mission").html("");
        let num = 1;
        mission.forEach(elt=>{
            $("#lettre_mission").append(`<div id="Contour" title="${elt.index}"><p>${elt.title}</p></div>`);
            num +=1;
        });
        $("#lettre_mission div").click(function(){
            swiper.slideTo($(this).attr("title"));
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
    if(quiz["propriétaire"] == "locataire"){
        missions.push({"title": "Présentez un projet à votre propriétaire", "index":19 })
    }
    if(true){
        missions.push({"title": "Installez des panneaux sur mon toit", "index":14 })
    }
    if(Object.keys(quiz).includes("facultatif")){
        if(quiz["facultatif"][0] == "1"){ 
            missions.push({"title": "Présentez un projet à votre copropriété", "index":15 })
        }
        if(quiz["facultatif"][1] == "1"){ 
            missions.push({"title": "Intéressez-vous à l’agri-voltaïsme", "index":17 })
        }
        if(quiz["facultatif"][2] == "1"){ 
            missions.push({"title": "Présentez un projet à votre maire", "index":16 })
        }
        if(quiz["facultatif"][3] == "1"){ 
            missions.push({"title": "Souscrivez à un projet collectif citoyen ", "index":18 })
        }
    }
    missions.push({"title": "Parlez-en autour de vous !", "index":20 })
    
    return missions;
}