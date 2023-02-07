"use strict";
var executed3 = false;

console.log('open');
const initSlide3 = async function(){
    if(!executed3){
        executed3 = true;
        $("#logement footer button").click(function(){
            console.log($("#logement input[type=radio][name=logement]:checked").val());
            if (true) { // vérifier que l'input radio est tjrs coché ?
                quiz["logement"] = $("#logement input[type=radio][name=logement]:checked").val();
                quiz["propriétaire"] = $("#logement input[type=radio][name=propriétaire]:checked").val();
                swiper.slideNext();
            }
            
            });
    }
    
}