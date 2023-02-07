"use strict";
var executed5 = false;

const initSlide5 = function(){
    if(!executed5){
        executed5 = true;
        $("#orientation header button").click(function(){
            changeBoussole();
        });
        $("#orientation footer button").click(function(){
            swiper.slideNext();
        })
    }
    
}

function changeBoussole(){
    switch($("#orientation img.boussole").attr("alt")){
        case 0:
            $("#orientation img.boussole").attr("alt", 1);
            //$("#orientation img.boussole").atr("src", "bousole2");
            break;
    }
}