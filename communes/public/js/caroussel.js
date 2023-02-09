'use strict';
var monObjet = document.querySelectorAll('.logo');
for (var i = 0; i < monObjet.length; i++) {
    monObjet[i].data = "../img/logo.svg";
    change_svg_color(monObjet[i], "#000000");
}
let options = {
    dist: -300,
    onCycleTo: function(slide) {
        let text = $('#carousel-text');
        text.html($(slide).attr('name').toUpperCase());
        text.css('color', $(slide).attr('color'));
        let background = $('#mySwiper');

        background.css('background-color', $(slide).attr('background-color'));
        background.css('transition', 'background-color 1s ease-in-out');
        let item = document.querySelector('#detail')
        item.style.backgroundColor = $(slide).attr('color');
        item.style.color = "#ffffff";



    },
    shift: 150,
    numVisible: 3,
};

fetch('../data/data.json')
    .then(response => response.json())
    .then(data => {
        // for each element
        const titre = document.querySelector('#titre');
        titre.innerHTML = titre.innerHTML.toUpperCase();
        titre.style.color = "#000000"; //data.conclusion.color.main[0];




        // get element by id
        const carousel = document.querySelector('#carousel');
        data.main.forEach(item => {
            // create a div element
            const div = document.createElement('div');
            // add class
            div.classList.add('carousel-item');
            // add id by using the name of the item
            div.id = item.name.replaceAll(' ', '-').toLowerCase();

            // create an img element
            const obj = document.createElement('img');
            // add src
            //obj.data = '../' + item.file_name;
            // add type
            //obj.type = 'image/svg+xml';
            obj.src='../' + item.file_name;


            //change_svg_color(obj, item.main_color)

            div.setAttribute("name", item.name);
            div.setAttribute("color", item.main_color);
            div.setAttribute("background-color", item.background_color);

            // add img to div
            div.appendChild(obj);

            // add div to carousel
            carousel.appendChild(div);
        });
        M.Carousel.init(document.querySelectorAll('.carousel'), options);
    });

function openEnv(){
    let monscore = sessionStorage.getItem("Score");
    monscore=monscore.substring(0,monscore.length-1);
    let result = parseInt(monscore)+3;
    sessionStorage.setItem("Score",result.toString()+"%");
    let idEnv=document.querySelector(".active").id
    sessionStorage.setItem("visit",idEnv)
    location.href = "home.html"

}