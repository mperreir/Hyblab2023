

document.addEventListener("DOMContentLoaded", function() {

    const retour = document.querySelector('#retour');
    const credit = document.querySelector('#petit-rond');

    retour.addEventListener('click', () => {
        window.location.href = window.localStorage.getItem('pagePrecedente') + ".html";
    });

    credit.addEventListener('click', () => {
        window.location.href = './credits.html';
    });

});