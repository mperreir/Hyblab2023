"use strict";
let visited = sessionStorage.getItem("alreadyVisited")
if(visited ===""){
  visited = sessionStorage.getItem("visit")
}else{
  visited=visited+";"+sessionStorage.getItem("visit")
}
sessionStorage.setItem("alreadyVisited",visited)
console.log(sessionStorage.getItem("alreadyVisited"))
// async init function (because of the awaits on fetches)
const initSlide1 = async function(){
  let response = await fetch('../data/data.json');
  const data = await response.json();

  /*
  let map_response = await fetch('../api/energy/test');
  const data_map = await map_response.json();
  */

  function mise_en_forme(data) {
    // Slide 1
    document.querySelector('#introduction').innerHTML = data.intro;
    const titre = document.querySelector('#titre');
    titre.innerHTML = data.name.toUpperCase();
    titre.style.color = data.main_color;
    document.querySelectorAll('.swiper-pagination-bullet-active').forEach((bullet) => {bullet.style.backgroundColor = data.main_color;});
    document.querySelectorAll('.swiper-wrapper section').forEach((section) => {section.style.backgroundColor = data.background_color;});
    document.querySelectorAll('.swiper-slide main').forEach((main) => {main.style.backgroundColor = data.main_color;});
    document.querySelectorAll('.carouselResult').forEach((button) => {button.style.backgroundColor = data.main_color;});
    document.querySelectorAll('.carouselResult').forEach((button) => {button.style.color = "#ffffff";});



    const objectElement = document.querySelector('#logo-environment');
    objectElement.data = "../"+data.file_name;

    change_svg_color(objectElement, data.main_color);
  }

  anime({
    targets: "#logo-environment",
    translateY: [-5, 5],
    direction: "alternate",
    easing: "easeInOutSine",
    loop: true,
    duration: 1500
  });

  //const urlParams = new URLSearchParams(window.location.search);
  //const name = urlParams.get('name');

  const data_filter = data.main.filter(function(item){return item.id === sessionStorage.getItem("visit");})[0]
  mise_en_forme(data_filter);
  initSlide2(data_filter);
  initSlide3(data_filter, []);

};