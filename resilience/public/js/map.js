var regions = document.querySelectorAll('[id^="_"]');
const mairie = document.getElementById("_16");
const heure = document.getElementById("heure").value;
const heures = ['8:00', '9:30', '11:00', '12:30', '14:00', '15:30', '17:00', '18:30', '20:00', '21:00'];
var modal = document.getElementById("myModal");

regions.forEach(element => {
    element.addEventListener('click', () => {
        window.localStorage.setItem('achievement4', "true");
        compt = window.localStorage.getItem("compt");
        if (element.id != "_16" || compt.length > 6) {
            if (window.localStorage.getItem(element.id) == "false") {
                window.localStorage.setItem('compt', compt + 1);
                time = " ".concat(heures[compt.length + 1], " ");
                window.localStorage.setItem('heure', time);
                window.localStorage.setItem(element.id, "true");
            }
            steps = window.localStorage.getItem('steps');
            if (steps < 8) steps++;
            window.localStorage.setItem('steps', steps);
            str = element.id;
            nb_region = str.substr(1);
            path = "./dialogue.html?".concat(nb_region);
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
    document.getElementById("steps").value = " " + window.localStorage.getItem('steps') + "/8 ";
    if (window.localStorage.getItem("popup") == "true") {
        document.getElementById("popup").style.visibility = "visible";
    }
    regions.forEach(element => {
        if (window.localStorage.getItem(element.id) == "true") {
            element.setAttribute('filter', "url(#saturation1)");
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
    window.localStorage.setItem("popup", "false");
    window.location = "./dialogue.html?15";
}

load();

// When the user clicks on <span> (x), close the modal
modal.onclick = function() {
    modal.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
