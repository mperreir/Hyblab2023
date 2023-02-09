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
    document.querySelectorAll('.swiper-pagination-bullet').forEach((bullet) => {bullet.style.backgroundColor = data.main_color;});
    document.querySelectorAll('.swiper-slide main').forEach((main) => {main.style.backgroundColor = data.main_color;});
    document.querySelectorAll('.carouselResult').forEach((button) => {button.style.backgroundColor = data.main_color;});
    document.querySelectorAll('.carouselResult').forEach((button) => {button.style.color = "#ffffff";});
    document.querySelectorAll('#container').forEach((section) => {section.style.backgroundColor = data.background_color;});
    const headScore = document.querySelector('.headerThree');
    headScore.style.backgroundColor = data.main_color

    document.querySelectorAll('h3').forEach((h3) => {
      h3.style.color = data.main_color;
      h3.innerHTML = data.name.toUpperCase();
    });




    const objectElement = document.querySelector('#logo-environment');
    objectElement.data = "../"+data.file_name;

    change_svg_color(objectElement, data.main_color);

    document.querySelector('#autre-env').innerHTML = data.autre_env.titre.toUpperCase();

    const svg_container = document.querySelector("#svg-container");

    const d = data.autre_env.liste;

    for (let i = 0; i < d.length; i++) {
      // create object
      let objectElement = document.createElement("object");

      objectElement.data = d[i].file_name;
      objectElement.type = "image/svg+xml";

      change_svg_color(objectElement, "#ffffff");

      svg_container.appendChild(objectElement);
    }

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
  console.log(sessionStorage.getItem("visit"));
  let map_response = await fetch('../api/energy/'+sessionStorage.getItem("visit").replace("è","e").replace("ê","e"));
  const data_map = await map_response.json();


  const data_filter = data.main.filter(function(item){return item.id === sessionStorage.getItem("visit");})[0]
  mise_en_forme(data_filter);
  initSlide2(data_filter);
  initSlide3(data_filter, data_map);

};