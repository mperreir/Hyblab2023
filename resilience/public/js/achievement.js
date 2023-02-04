function afficheMenu(obj){
    const idachievement = obj.id;
    const idexplication = 'explication-' + idachievement;
    const explication = document.getElementById(idexplication);

    /*****************************************************/
    /**	on cache tous les sous-menus pour n'afficher    **/
    /** que celui dont le menu correspondant est cliqué **/
    /*****************************************************/
    for(let i = 1; i <= 11; i++){
        if(document.getElementById('explication-achievement' + i) && document.getElementById('explication-achievement' + i) !== explication){
            document.getElementById('explication-achievement' + i).style.display = "none";
        }
    }

    if(explication){
        if(explication.style.display === "block"){
            explication.style.display = "none";
        }
        else{
            explication.style.display = "block";
        }
    }

}

async function achievement() {
    let response = await fetch(`data/achievement.json`);
    const achievements = await response.json();
    console.log(achievements)
    let result = document.querySelector('#achievements');


    for (let i = 0; i < achievements.achievements.length; i++) {
        let achiev = achievements.achievements[i];
        let htmlAchiev = document.createElement('p');
        htmlAchiev.classList.add('achievement');
        htmlAchiev.classList.add(`achievement-${achiev.ID}`);
        htmlAchiev.textContent = achiev.name;
        let isOpen = false;

        htmlAchiev.addEventListener('click', function () {
            let currentDescription = document.querySelector('.shortDescription');
            if (currentDescription) {
                currentDescription.remove();
            }
            let htmlDesc = document.createElement('p');
            htmlDesc.classList.add('shortDescription');
            htmlDesc.classList.add(`shortDescription-${achiev.ID}`);
            htmlDesc.textContent = achiev.shortDescription;
            htmlAchiev.after(htmlDesc);
            if (isOpen) {
                let htmlDesc = result.querySelector('.shortDescription');
                htmlDesc.remove();
                isOpen = false;
            } else {
                isOpen = true;
            }

        });


        result.appendChild(htmlAchiev);

    }


}

achievement();