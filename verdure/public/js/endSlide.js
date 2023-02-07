"use strict";

const initEndSlide = function () {
    
    loadTextindic(IndicHappy,IndicMoney,IndicThermo);
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

async function loadTextindic(Happy,Money,Thermo){

    console.log(Thermo);
    console.log(Money);
    console.log(Happy);

    let pThermo = document.getElementById("final-thermo");
    let pMoney = document.getElementById('final-money');
    let pHappy = document.getElementById('final-happy');

    if( 70 < Thermo){pThermo.innerHTML = "Malheuresement la température de votre ville n'a pas baissé!";}
    else if( 50 < Thermo){pThermo.innerHTML = "Encourageant, la température de votre ville a légérement baissé!";}
    else{pThermo.innerHTML = "Bravo, la température à fortement chuté dans votre ville !";}

    if( 70 < Money){pMoney.innerHTML = "Félicitation! Il vous reste beaucoup d'argent";}
    else if( 50 < Money){pMoney.innerHTML = "Vous avez su dépenser de façon à garder des dépenses équilibrées";}
    else{pMoney.innerHTML = "Attention ! Vous avez beaucoup dépensé. Mais finalement n'est ce pas une étape obligatoire dans cette lutte ?";}

    if( 70 < Happy){pHappy.innerHTML = "Félicitation! Votre population est très heureuse";}
    else if( 50 < Happy){pHappy.innerHTML = "Vous avez su faire les bons choix pour garder une population satisfaite";}
    else{pHappy.innerHTML = "Attention ! Vos choix ont beaucoup inpacté votre population";}
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
    window.location.reload();
}