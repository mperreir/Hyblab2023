"use strict";
// Init of the (touch friendly) Swiper slider
const swiper = new Swiper("#mySwiper", {
    direction: "horizontal",
    mousewheel: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

swiper.on("slideChange", function () {
    switch( swiper.activeIndex ) {
        case 0:
            introSlide1();
            //introSlider1();
            break;
        case 1:
            introSlide2();
            break;
        case 2:
            //initSlide3();
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
        'z-index' : -1,
        easing: 'easeOutQuad',
    });
    // Init first slide
    introSlide1();
}, 1000);