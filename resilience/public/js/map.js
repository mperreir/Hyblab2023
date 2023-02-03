
    var regions = document.querySelectorAll('[id^="_"]')
 
    regions.forEach(element => {
        element.addEventListener('click', () => {
            element.setAttribute('filter',"url(#saturation1)");
            str = element.id;
            nb_region = str.substr(1);
            path = "./dialogue.html?".concat(nb_region);
            window.location=path
        });
    }); 
    regions.forEach(element => {
        element.addEventListener('click', () => {
            element.setAttribute('filter',"url(#saturation1)");
            str = element.id;
            nb_region = str.substr(1);
            path = "./dialogue.html?".concat(nb_region);
            window.location=path
        });
    });