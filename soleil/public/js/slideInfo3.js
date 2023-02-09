"use strict";
var executed10 = false;

const initSlideInfo1 = async function(){
    if(!executedInfo3){
        executedInfo3 = true;
        $("#facultatif footer button").eq(0).click(function(){
            swiper.slideNext();
        })
        $("#bulleInfo").click(function(){
            swiper.slideTo(7, 0);

        })
    }
}