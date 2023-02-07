"use strict";

console.log('open');
const initSlide3 = async function(){
    $("#logement header button.retour").click(function(){        
        swiper.slidePrev();
    })
    $("#logement footer button").click(function(){
    console.log($("#logement input[type=radio][name=logement]:checked").val());
    if (true) { // vérifier que l'input radio est tjrs coché ?
        quiz["logement"] = $("#logement input[type=radio][name=logement]:checked").val();
        quiz["propriétaire"] = $("#logement input[type=radio][name=propriétaire]:checked").val();
        swiper.slideNext();
        initSlide4();
    }
    
    });
}