
var regions = document.querySelectorAll('[id^="_"]')
const mairie = document.getElementById("_16");
let compt = 0;

regions.forEach(element => {
    element.addEventListener('click', () => {
        if (element.id != "_16" || compt > 6) {
            element.setAttribute('filter', "url(#saturation1)");
            str = element.id;
            nb_region = str.substr(1);
            path = "./dialogue.html?".concat(nb_region);
            window.location = path
            if (element.dataset.visite == "false") {
                compt += 1
                element.dataset.visite = "true"
                console.log(compt)
            }
        }
    });
});