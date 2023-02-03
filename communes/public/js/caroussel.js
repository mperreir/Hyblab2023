'use strict';

let options = {
    dist: -300,
    onCycleTo: function(slide) {
        let text = $('#carousel-text');
        text.html($(slide).attr('name').toUpperCase());
        text.css('color', $(slide).attr('color'));
        let background = $('#mySwiper');

        background.css('background-color', $(slide).attr('background-color'));
        background.css('transition', 'background-color 1s ease-in-out');

    },
    shift: 150,
    numVisible: 3,
};

fetch('../data/data.json')
    .then(response => response.json())
    .then(data => {
        // get element by id
        const carousel = document.querySelector('#carousel');
        data.forEach(item => {
            // create a div element
            const div = document.createElement('div');
            // add class
            div.classList.add('carousel-item');
            // add id by using the name of the item
            div.id = item.name.replace(' ', '-').toLowerCase();

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
        });
        M.Carousel.init(document.querySelectorAll('.carousel'), options);
    });