async function achievement() {
    let response = await fetch(`data/achievement.json`);
    const achievements = await response.json();
    let result = document.querySelector('#achievements');
    for (let i = 0; i < achievements.achievements.length; i++) {

        let achiev = achievements.achievements[i];
        let htmlAchiev = document.createElement('div');
        if (window.localStorage.getItem("achievement".concat(i + 1)) == "true") {
            htmlAchiev.classList.add('achievement');
            htmlAchiev.classList.add(`achievement-${achiev.ID}`);
            htmlAchiev.setAttribute('id', i + 1);
        } else {
            htmlAchiev.classList.add('achievement');
            htmlAchiev.classList.add(`achievement-any`);
            htmlAchiev.setAttribute('id', i + 1);
        }

        let htmlID = document.createElement('div');
        if (window.localStorage.getItem("achievement".concat(i + 1)) == "true") {
            htmlID.classList.add('ID');
            htmlID.textContent = `${achiev.ID}`;
        } else {
            htmlID.classList.add('cadenas');
            var img = document.createElement("img");
            img.src = "./img/ux_kit/Cadenas.svg";
            img.id = "image_cadenas";
            htmlID.appendChild(img);
        }


        let htmlName = document.createElement('h2');
        htmlName.classList.add('name');
        htmlName.textContent = achiev.name;

        let htmlData = document.createElement('div');
        htmlData.classList.add('data');
        htmlData.classList.add(`data-${achiev.ID}`);

        let htmlImage = document.createElement("img");
        htmlImage.src = "./img/ux_kit/fleche_droite.svg";
        htmlImage.classList.add('up-arrow')
        htmlImage.classList.add('fermer')

        // Parse Achievement data
        achiev.data.forEach(e => {
            let htmlE = document.createElement('p');
            switch (e.type) {
                case 'text':
                    htmlE = document.createElement('p');
                    htmlE.textContent = e.text;
                    break;
                case 'video':
                    htmlE = document.createElement('iframe');
                    htmlE.setAttribute("src", e.link);
                    //htmlE = createElement('<iframe width="560" height="315" src="' + e.link + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>')
                    break;
                case 'image':
                    htmlE = document.createElement('img');
                    htmlE.scr = 'data/' + e.link;
                    break;
                case 'link':
                    htmlE = document.createElement('a');
                    htmlE.textContent = e.text;
                    htmlE.href = e.link;
                    break;
                default:
                    console.log("Unknown type : " + e.type);
            }

            e.class.forEach(c => {
                htmlE.classList.add(c);
            });

            htmlData.appendChild(htmlE);
            htmlData.appendChild(htmlImage);
        });

        let isOpen = false;

        htmlName.addEventListener('click', function () {
            if (window.localStorage.getItem("achievement".concat(htmlAchiev.id)) == "true") {
                if (window.localStorage.getItem("achievement".concat(htmlAchiev.id))) {
                    let currentData = document.querySelector('.data');
                    if (currentData) {
                        currentData.remove();
                    }
                    if (isOpen) {
                        htmlData.remove();
                        isOpen = false;
                    } else {
                        htmlAchiev.appendChild(htmlData);
                        isOpen = true;
                    }
                }
            }
        });
        htmlImage.addEventListener('click', function () {
            if (window.localStorage.getItem("achievement".concat(htmlAchiev.id)) == "true") {
                if (window.localStorage.getItem("achievement".concat(htmlAchiev.id))) {
                    let currentData = document.querySelector('.data');
                    if (currentData) {
                        currentData.remove();
                    }
                    if (isOpen) {
                        htmlData.remove();
                        isOpen = false;
                    } else {
                        htmlAchiev.appendChild(htmlData);
                        isOpen = true;
                    }
                }
            }
        });




        let htmlAchievVisible = document.createElement('div');
        htmlAchievVisible.setAttribute('id', 'visible');
        htmlAchievVisible.appendChild(htmlID);
        htmlAchievVisible.appendChild(htmlName);
        htmlAchiev.appendChild(htmlAchievVisible);
        result.appendChild(htmlAchiev);
        console.log(result);


    }


}

achievement();

function map() {
    window.location = "./map.html"
};