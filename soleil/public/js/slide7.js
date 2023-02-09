"use strict";
var executed7 = false;

const initSlide7 = async function(){
    if(!executed7){
        executed7 = true;
        $("#facultatif footer button").eq(0).click(function(){
            let checklist = ['facul1', 'facul2', 'facul3', 'facul4'];
            checklist = checklist.map(elt => $(`#${elt}`).is(':checked'));
            console.log(checklist);
            quiz["facultatif"] = checklist;
            
            swiper.slideNext();
        })
        $("#facultatif footer .passer").click(function(){
            swiper.slideNext();
            quiz["facultatif"] = [];
        })
    }
}