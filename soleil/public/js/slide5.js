"use strict";

const initSlide5 = function(){
    $("#orientation header button").click(function(){
        swiper.slidePrev();
    });
    $("#pente header button").click(function(){
        changeBoussole();
    });
}

function changeBoussole(){
    switch($("#orientation img.boussole").atr("alt")){
        case 0:
            $("#orientation img.boussole").atr("alt", 1);
            //$("#orientation img.boussole").atr("src", "bousole2");
            break;
    }
}