'use strict';
var instances;
let options = {
    onCycleTo: function(slide) {
        let text = $('#carousel-text');
        text.html($(slide).attr('name').toUpperCase());
        text.css('color', $(slide).attr('color'));
        document.querySelectorAll('.navigate').forEach(item => {
            item.style.color = $(slide).attr('color');
        })

    },
    numVisible: 3,
};

fetch('../data/data.json')
    .then(response => response.json())
    .then(data => {
        // for each element
        const titre = document.querySelector('#titre');
        titre.innerHTML = titre.innerHTML.toUpperCase();
        titre.style.color = data.conclusion.color.main[0];

        // get element by id
        const carousel = document.querySelector('#carousel');
        const visited = sessionStorage.getItem("alreadyVisited").split(";")
        data.main.forEach(item => {
            if (!visited.includes(item.id)){
                // create a div element
                const div = document.createElement('div');
                // add class
                div.classList.add('carousel-item');
                // add id by using the name of the item
                div.id = item.name.replaceAll(' ', '-').toLowerCase();

                // create an img element
                const obj = document.createElement('object');
                // add src
                obj.data = '../' + item.file_name;
                // add type
                obj.type = 'image/svg+xml';

                change_svg_color(obj, item.main_color)

                div.setAttribute("name", item.name);
                div.setAttribute("color", item.main_color);
                div.setAttribute("background-color", item.background_color);


                // add img to div
                div.appendChild(obj);

                // add div to carousel
                carousel.appendChild(div);

            }
        });
        if(document.querySelector('.carousel').children.length === 0) {
            document.querySelectorAll('.notEmpty').forEach((element) => {
                element.style.display = "none";
            });
            document.querySelectorAll('.carouselResult').forEach((element) => {
                element.style.marginLeft="0%";
                element.style.marginRight="0%";
                element.style.position="absolute";
            });
        }
        instances = M.Carousel.init(document.querySelectorAll('.carousel'), options);
    });

// Utilisation de la méthode .next
document.getElementById('next').addEventListener('click', function() {
    instances[0].next();
});

// Utilisation de la méthode .prev
document.getElementById('prev').addEventListener('click', function() {
    instances[0].prev();
});

function openEnv(){
    let idEnv=document.querySelector(".active").id
    sessionStorage.setItem("visit",idEnv)
    location.href = "home.html"
}

function bilan(){
    location.href = "conclusion.html"
}