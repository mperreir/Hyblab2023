"use strict";
var executed1 = false;
let quiz = {}
// async init function (because of the awaits on fetches)
const initSlide1 = async function () {
  if (!executed1) {
    executed1 = true;
    $("#accueil button").click(function () {
      swiper.slideNext();
    });
    swiper.slideNext()
  };
};