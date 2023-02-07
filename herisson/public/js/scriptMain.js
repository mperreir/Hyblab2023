// var switchElement = document.querySelector('#switch input');
// var textElement = document.querySelector('#text');
// var searchElement = document.querySelector('#search');
// var searchBarElement = document.querySelector('#searchBar');
// switchElement.addEventListener('change', function() {
//     if (switchElement.checked) {
//         // afficher le texte pour l'état coché
//         textElement.innerHTML = 'Indiquez le nom de l\'animal';
//         // Modifier les propriétés pour l'état coché
//         searchBarElement.placeholder = 'Ex : Hérisson';
//         searchBarElement.name = 'searchAnimal';
//         searchElement.name = 'RechercheAnimal';
//         searchElement.action = 'animal.html';
//     } else {
//         // afficher le texte pour l'état décoché
//         textElement.innerHTML = 'Indiquez la commune ou le code postal';
//         // Modifier les propriétés pour l'état décoché
//         searchBarElement.placeholder = 'Ex : 75001 ou Paris';
//         searchBarElement.name = 'searchCommune';
//         searchElement.name = 'RechercheCommune';
//         searchElement.action = 'commune.html';
//     }
// });

const hammer = new Hammer(document.documentElement)
hammer.on("panup", (event) => {
    event.preventDefault();
    document.body.style.opacity = "0";
    setTimeout(() => {
        window.location.href = "main.html";
    }, 500);
})
