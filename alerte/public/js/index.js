"use strict";

let dep

let next0 = document.getElementById("next0")
next0.addEventListener("click", () => {
  display("s10")
})

let next1 = document.getElementById("next1")
next1.addEventListener("click", () => {
  display("s3")
})

let btns3 = document.getElementsByClassName('btn3')
for (let btn of btns3) {
  if (btn.dataset.valid == "true") {
    btn.addEventListener('click', () => {
      btn.style.backgroundColor = 'green'
      setTimeout(() => {
        display("s4_2")
      }, 2000)
    })
  } else {
    btn.addEventListener('click', () => {
      btn.style.backgroundColor = 'red'
      for (let btn2 of btns3) {
        if (btn2.dataset.valid == 'true') {
          btn2.style.backgroundColor = 'lightgreen'
        }
      }
      setTimeout(() => {
        display("s4_1")
      }, 2000)
    })
  }
}

let next4_1 = document.getElementById("next4_1")
next4_1.addEventListener("click", () => {
  display("s5")
})

let next4_2 = document.getElementById("next4_2")
next4_2.addEventListener("click", () => {
  display("s5")
})

paper.install(window);
paper.setup("canvas");

let path;
let isDrawing = false;

view.onMouseDown = (event) => {
  isDrawing = true;
  path = new Path();
  path.strokeColor = "white";
  path.smoothness = 1;
  path.strokeWidth = 5;
  path.add(event.point);
};

view.onMouseDrag = (event) => {
  if (!isDrawing) return;
  path.add(event.point);
};

view.onMouseUp = () => {
  isDrawing = false;
  display("s6")
};


let next6 = document.getElementById("next6")
next6.addEventListener("click", () => {
  display("s7")
})

let next7 = document.getElementById("next7")
next7.addEventListener("click", () => {
  dep = document.getElementById('dep')
  display("s8")
})

let next9_1 = document.getElementById("next9_1")
next9_1.addEventListener("click", () => {
  display("s10")
})

let next9_2 = document.getElementById("next9_2")
next9_2.addEventListener("click", () => {
  display("s10")
})

function display(id) {
  let slides = document.getElementsByClassName("slides")
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
}, 500);

var mySwiper = new Swiper('.swiper-container', {
  pagination: {
    el: '.swiper-pagination',
  },
});