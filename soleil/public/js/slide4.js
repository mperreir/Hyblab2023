"use strict";

const initSlide4 = function(){
    $("#pente header button").click(function(){
        swiper.slidePrev();
    });
    $("#pente footer button").click(function(){
        console.log('but');
        quiz["pente"] = $("#logement input[type=radio][name=pente]:checked").val();
        if (quiz["pente"] == "Plat"){
            swiper.slideNext()
            swiper.slideNext()
            initSlide6();
        }
        else{
            swiper.slideNext()
            initSlide5();
        }
    });
}