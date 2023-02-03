"use strict";

// async init function (because of the awaits on fetches)
const initSlide1 = async function(){
  let response = await fetch('data/data.json');
  const data = await response.json();

  function mise_en_forme(data) {
    // Slide 1
    document.querySelector('#introduction').innerHTML = data.intro;
    const titre = document.querySelector('#titre');
    titre.innerHTML = data.name.toUpperCase();
    titre.style.color = data.main_color;
    document.querySelectorAll('.swiper-pagination-bullet-active').forEach((bullet) => {bullet.style.backgroundColor = data.main_color;});
    document.querySelectorAll('.swiper-wrapper section').forEach((section) => {section.style.backgroundColor = data.background_color;});
    document.querySelectorAll('.swiper-slide main').forEach((main) => {main.style.backgroundColor = data.main_color;});

    const objectElement = document.querySelector('#logo-environment');
    objectElement.data = data.file_name;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', objectElement.data, true);
    xhr.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(this.responseText, 'image/svg+xml');
        const elements = svgDoc.querySelectorAll('.st0');
        for (let i = 0; i < elements.length; i++) {
          elements[i].style.fill = data.main_color;
        }
        objectElement.data = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(new XMLSerializer().serializeToString(svgDoc));
      }
    };
    xhr.send();
  }

  anime({
    targets: "#logo-environment",
    translateY: [-5, 5],
    direction: "alternate",
    easing: "easeInOutSine",
    loop: true,
    duration: 1500
  });

  const data_filter = data.filter(function(item){return item.name === "La mer";})[0]
  mise_en_forme(data_filter);
  initSlide2(data_filter);
  initSlide3(data_filter);
};