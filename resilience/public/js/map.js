
var regions = document.querySelectorAll('[id^="_"]')
const mairie = document.getElementById("_16");
const heure = document.getElementById("heure").value;
const heures = ['8:00','9:30','11:00','12:30','14:00','15:30','17:00','18:30','20:00']
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
                document.getElementById("heure").value = " ".concat(heures[compt]," ");
                console.log(compt)
            }
        }
    });
});