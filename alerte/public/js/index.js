"use strict";

let s0 = document.getElementById("s0");
let s1 = document.getElementById("s1");

let next0 = document.getElementById("next0")
next0.addEventListener("click", () => {
  s0.style.display = 'none'
  s1.style.removeProperty('display')
})

let btn1 = document.getElementById("next1")
btn1.addEventListener("click", () => {
  s0.style.removeProperty('display')
  s1.style.display = 'none'
})

// Init of the (touch friendly) Swiper slider
const swiper = new Swiper("#mySwiper", {
  direction: "horizontal",
  mousewheel: false,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

swiper.on("slideChange", function () {
  switch (swiper.activeIndex) {
    case 0:
      initSlide1();
      break;
    case 1:
      initSlide2();
      break;
  }
});

// Wait for the content to preload and display 1st slide
// Here we simulate a loading time of one second
setTimeout(() => {
  // fade out the loader "slide"
  // and send it to the back (z-index = -1)
  anime({
    delay: 1000,
    targets: '#loader',
    opacity: '0',
    'z-index': -1,
    easing: 'easeOutQuad',
  });
  // Init first slide
  initSlide1();
}, 1000);