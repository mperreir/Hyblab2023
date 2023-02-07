"use strict";

// async init function (because of the awaits on fetches)
const initSlideVideo = async function(){
  swiper.disable();
  setTimeout(()=>{
    swiper.enable();
    swiper.slideTo(1);
  },8000)


};