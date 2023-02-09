var regions = document.querySelectorAll('[id^="_"]');
const mairie = document.getElementById("_16");
const heure = document.getElementById("heure").value;
const heures = ['8:00', '9:30', '11:00', '12:30', '14:00', '15:30', '17:00', '18:30', '20:00', '21:00'];
var modal = document.getElementById("myModal");
var modal_acquis = document.getElementById("notif-acquis");
var dict_achiev = new Map();
dict_achiev.set("_8", [2]);
dict_achiev.set("_9", [4]);
dict_achiev.set("_10", [3]);
dict_achiev.set("_11", [6]);
dict_achiev.set("_12", [7]);
dict_achiev.set("_13", [5]);
dict_achiev.set("_14", [8]);
dict_achiev.set("_15", []);
dict_achiev.set("_16", []);

regions.forEach(element => {
    element.addEventListener('click', () => {
        compt = window.localStorage.getItem("compt");
        if ((element.id != "_16" || compt.length > 7) && (element.id != "_14" || window.localStorage.getItem("pipi") == "true") && window.localStorage.getItem("popup") == "false") {
            dict_achiev.get(element.id).forEach(e => {
                window.localStorage.setItem('achievement'.concat(e), "true");
            });
            if (window.localStorage.getItem(element.id) == "false") {
                window.localStorage.setItem('compt', compt + 1);
                time = " ".concat(heures[compt.length + 1], " ");
                window.localStorage.setItem('heure', time);
                window.localStorage.setItem(element.id, "true");
                
                //gestion steps (nb de zones vues)
                if (compt.length<4) {
                    steps = " ".concat(compt.length + 1);
                }
                else steps = " ".concat(compt.length); //le repas fait prendre +1 a compt mais n'est pas compté comme une zone vue
                window.localStorage.setItem('steps', steps);
            }
            
            str = element.id;
            nb_region = str.substr(1);
            path = "./dialogue.html?id=".concat(nb_region);
            window.location = path
        }
    });
});

function load() {
    if (window.localStorage.getItem('started') == 0) {
        modal.style.display = "block";
    }
    window.localStorage.setItem('started', 1);
    document.getElementById("heure").value = window.localStorage.getItem('heure');
    document.getElementById("steps").value = window.localStorage.getItem('steps') + "/8 ";
    if (window.localStorage.getItem('pipi') == "true" && window.localStorage.getItem('manger') == "true") {
        window.localStorage.setItem("popup", "false");
    }else{
        if (window.localStorage.getItem('pipi') == "true") {
            let bouton = document.getElementById("pipi");
            bouton.setAttribute("class","bouton-repas-disabled");
            bouton.disabled = true;

        }
        if (window.localStorage.getItem('manger') == "true") {
            let bouton = document.getElementById("manger");
            bouton.setAttribute("class","bouton-repas-disabled");
            bouton.disabled = true;
        } 
    }
    if (window.localStorage.getItem("popup") == "true") {
        document.getElementById("popup").style.visibility = "visible";
    }
    if (window.localStorage.getItem("first-acquis") == "true") {
        modal_acquis.style.display = "block";
    }
    window.localStorage.setItem("first-acquis", "false");
    regions.forEach(element => {
        if (window.localStorage.getItem(element.id) == "true") {
            element.setAttribute('filter', "url(#saturation1)");
        } else {
            element.setAttribute('filter', "url(#saturation0)");
        }
        element.style.cursor = "pointer";
    });
}

function init() {
    window.localStorage.setItem('started', 0);
    window.localStorage.setItem('steps', 0);
    window.localStorage.setItem('compt', "");
    window.localStorage.setItem('heure', " 8:00 ");
    window.localStorage.setItem("popup", "false");
    window.localStorage.setItem("first-acquis", "false");
    window.localStorage.setItem("steps", 0);
    window.localStorage.setItem('_8', "false");
    window.localStorage.setItem('_9', "false");
    window.localStorage.setItem('_10', "false");
    window.localStorage.setItem('_11', "false");
    window.localStorage.setItem('_12', "false");
    window.localStorage.setItem('_13', "false");
    window.localStorage.setItem('_14', "false");
    window.localStorage.setItem('_16', "false");
    window.localStorage.setItem('achievement1', "false");
    window.localStorage.setItem('achievement2', "false");
    window.localStorage.setItem('achievement3', "false");
    window.localStorage.setItem('achievement4', "false");
    window.localStorage.setItem('achievement5', "false");
    window.localStorage.setItem('achievement6', "false");
    window.localStorage.setItem('achievement7', "false");
    window.localStorage.setItem('achievement8', "false");
}

function manger() {
    compt = window.localStorage.getItem("compt");
    window.localStorage.setItem('compt', compt + 1);
    window.localStorage.setItem('heure', " 14:00 ");
    window.localStorage.setItem('manger', "true");
    window.location = "./dialogue.html?id=15";
}

function toilette() {
    window.localStorage.setItem('pipi', "true");
    window.localStorage.setItem("_14","true");
    window.location = "./dialogue.html?id=14";
}

load();


// When the user clicks on <span> (x), close the modal
modal_acquis.onclick = function() {
    modal_acquis.style.display = "none";
}

// When the user clicks on <span> (x), close the modal
modal.onclick = function() {
    modal.style.display = "none";
  }
  
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
if (event.target == modal) {
    modal.style.display = "none";
}
if (event.target == modal_acquis) {
    modal_acquis.style.display = "none";
}
}
