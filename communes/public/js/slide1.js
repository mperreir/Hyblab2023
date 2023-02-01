"use strict";

// async init function (because of the awaits on fetches)
const initSlide1 = async function(){
  /*
  // Retrieve the partner's topic from our API
  let response = await fetch('api/topic');
  const data1 = await response.json();
   */
  let response = await fetch('data/data.json');
  const data = await response.json();

  function mise_en_forme(data) {
    document.querySelector('#introduction').innerHTML = data.intro;
    const titre = document.querySelector('#titre');
    titre.innerHTML = data.name.toUpperCase();
    titre.style.color = data.main_color;
    document.querySelector('#logo-environment')
    document.querySelector('.swiper-pagination-bullet-active').style.backgroundColor = data.main_color;
    document.querySelector('.swiper-wrapper section').style.backgroundColor = data.background_color;
    document.querySelector('#first-slide footer').style.backgroundColor = data.main_color;

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

  mise_en_forme(data.filter(function(item){return item.name === "La mer";})[0]);
};