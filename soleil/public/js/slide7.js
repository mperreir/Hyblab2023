"use strict";
var executed7 = false;

const initSlide7 = async function(){
    if(!executed7){
        executed7 = true;
        $("#facultatif footer button").eq(0).click(function(){
            swiper.slideNext();
        })
        $("#facultatif footer .passer").click(function(){
            swiper.slideNext();
        })
    }
}