"use strict";
var executed8 = false;

const initSlide8 = async function(){
    if(!executed8){
        executed8 = true;
        $("#facultatif footer button").eq(0).click(function(){
            swiper.slideNext();
        })
        $("#facultatif footer .passer").click(function(){
            swiper.slideNext();
        })
    }
}