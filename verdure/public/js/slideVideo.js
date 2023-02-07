"use strict";

// async init function (because of the awaits on fetches)
const initSlideVideo = async function(){

  setTimeout(()=>{
    swiper.enable();
    swiper.slideTo(1);
  },8000)


};