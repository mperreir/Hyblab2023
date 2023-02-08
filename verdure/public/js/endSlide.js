"use strict";

const initEndSlide = function () {
    
    loadTextindic(IndicHappy,IndicMoney,IndicThermo);
    let b = document.getElementById("endButtons");
    b.style.display = "none";


    const titre = document.querySelector('#result');

    // (Re)set initial scale of logo
    titre.setAttribute('style', 'transform : scale(1);');

    const element = document.querySelector("#result");
    const textArray = element.innerHTML.split('');
    element.innerHTML = '';
    textArray.forEach((letter, i) => {
        setTimeout(() => {
            element.innerHTML += letter;
        }, 75*i)
    })

    setTimeout(function(){
        $("#endButtons").fadeIn();
        b.style.display = "flex";
        document.getElementById("dropdownShareButton").style.display = "block";
    }, 3000);



}

async function loadTextindic(Happy,Money,Thermo){


    let pThermo = document.getElementById("final-thermo");
    let pMoney = document.getElementById('final-money');
    let pHappy = document.getElementById('final-happy');

    if( 70 < Thermo){pThermo.innerHTML = "Malheuresement la température de votre ville n'a pas baissé !";}
    else if( 50 < Thermo){pThermo.innerHTML = "C'est encourageant, la température de votre ville a légèrement baissé ! Continuez dans cette voix.";}
    else{pThermo.innerHTML = "Bravo, la température a fortement chuté dans votre ville ! Vous êtes engagé pour sauver le climat";}

    if( 70 < Money){pMoney.innerHTML = "Il vous reste beaucoup d'argent. Peut-être auriez-vous pu dépenser un peu plus pour réaliser des choix impactants";}
    else if( 50 < Money){pMoney.innerHTML = "Vous avez su dépenser de façon à garder des dépenses équilibrées. Félicitations !";}
    else{pMoney.innerHTML = "Attention ! Vous avez beaucoup dépensé. Mais finalement n'est ce pas une étape obligatoire dans cette lutte ?";}

    if( 70 < Happy){pHappy.innerHTML = "Félicitations ! Votre population est très heureuse.";}
    else if( 50 < Happy){pHappy.innerHTML = "Vous avez su faire les bons choix pour garder une population satisfaite.";}
    else{pHappy.innerHTML = "Attention ! Vos choix ont beaucoup impacté votre population. Il ne faut pas que cela s'aggrave dans le futur.";}

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