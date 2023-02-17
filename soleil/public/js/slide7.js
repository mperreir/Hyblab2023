"use strict";
var executed7 = false;

const initSlide7 = async function(){
    if(!executed7){
        executed7 = true;
        $("#facultatif footer button").eq(0).click(function(){
            let checklist = ['facul1', 'facul2', 'facul3', 'facul4'];
            checklist = checklist.map(elt => $(`#${elt}`).attr("alt"));
            console.log(checklist);
            quiz["facultatif"] = checklist;
            
            swiper.slideNext();
        })
        $("#facultatif footer .passer").click(function(){
            swiper.slideNext();
            quiz["facultatif"] = [];
        })

        $("#facultatif #bulle-question img").click(function(){
            let alt = $(this).attr("alt");
            
            if(alt == "1"){
                $(this).attr("src",  $(this).attr("src").replace("selection", "non selection"))
                $(this).attr("alt", "0");
            }
            else{
                $(this).attr("src",  $(this).attr("src").replace("non selection", "selection"))
                $(this).attr("alt", "1");
            }
            
        })
    }
}