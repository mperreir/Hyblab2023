"use strict";

let s0 = document.getElementById("s0");
let s1 = document.getElementById("s1");

let next0 = document.getElementById("next0")
next0.addEventListener("click", () => {
  display("s1")
})

let btn1 = document.getElementById("next1")
btn1.addEventListener("click", () => {
  display("s4_1")
})

function display(id) {
  let slides = document.getElementsByClassName("swiper-slide")
  for (let slide of slides) {
    slide.style.display = 'none'
  }
  let currentSlide = document.getElementById(id)
  currentSlide.style.removeProperty('display')
}

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
