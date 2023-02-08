"use strict";
var executed10 = false;

const initSlideInfo1 = async function(){
    if(!executedInfo1){
        executedInfo1 = true;
        $("#facultatif footer button").eq(0).click(function(){
            swiper.slideNext();
        })
        $("#facultatif footer .passer").click(function(){
            swiper.slideNext();
        })
    }
}