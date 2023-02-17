"use strict";
var executed1 = false;
let quiz = {}
// async init function (because of the awaits on fetches)
const initSlide1 = async function () {
  $("video").get(0).play();
  if (!executed1) {
    executed1 = true;
    $("#accueil button").click(function () {
      console.log("accueil")
      swiper.slideNext();
    });
  }
};