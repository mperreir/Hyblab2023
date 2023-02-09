"use strict";
var executedInfo2 = false;

const initSlideInfo1 = async function(){
    if(!executedInfo2){
        executedInfo2 = true;
        $("#facultatif footer button").eq(0).click(function(){
            swiper.slideNext();
        })
        $("#bulleInfo").click(function(){
            swiper.slideTo(6, 0);

        })
    }
}