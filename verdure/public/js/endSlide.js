"use strict";

const initEndSlide = function () {
    document.getElementById("dropdownShareButton").style.display = "block";

    const titre = document.querySelector('#result');

    // (Re)set initial scale of logo
    titre.setAttribute('style', 'transform : scale(1);');

    // Animate hyblab logo and make shrink on click
    anime({
        targets: '#result',
        scale: 1.2,
        easing: 'easeOutBounce',
        loop: true,
        direction:"alternate",
    });
    
    const elements = document.querySelectorAll('.conclusion p');
    elements.forEach(element => {
    const textArray = element.innerHTML.split('');
    element.innerHTML = '';
    textArray.forEach((letter, i) => {
    setTimeout(() => {
        element.innerHTML += letter;
        }, 40 * i);
    });
});



}

const toggleDropdownShareMenu = function () {
    document.getElementById("dropdownShareOptions").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropdownShareButton')) {
        var dropdowns = document.getElementsByClassName("dropdownShareOptions");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

const goBackToBeginning = function (){
    swiper.slideTo(0, 1000);
}