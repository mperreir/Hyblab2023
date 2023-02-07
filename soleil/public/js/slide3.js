"use strict";
var executed3 = false;

console.log('open');
const initSlide3 = async function(){
    if(!executed3){
        executed3 = true;
        $("#logement footer button").click(function(){
            if ($(".choix-logement img[class=selection]").length) { // vérifier que l'input radio est tjrs coché ?
                quiz["logement"] = $(".choix-logement img[class=selection]").eq(0).attr("title");
                quiz["propriétaire"] = $(".choix-logement img[class=selection]").eq(1).attr("title");
                swiper.slideNext();
                console.log(quiz);
            }
            
            });
        $(".choix-logement img").click(function(){
            
            if($(this).attr("class") == "non-selection"){
                $(this).attr("src", `img/Choix habitation/selection/${$(this).attr("title")}-selection.jpg`);
                $(this).attr("class","selection");
                let other_img = $(this).siblings()[1].title;
                 $(`.choix-logement img[title=${other_img}]`).attr("class", "non-selection");
                $(`.choix-logement img[title=${other_img}]`).attr("src", `img/Choix habitation/Non selection/${other_img}-non-selection.jpg`);
            }
        })
    }
    
}