async function achievement() {
    let response = await fetch(`data/achievement.json`);
    const achievements = await response.json();
    console.log(achievements)
    let result = document.querySelector('#achievements');


    for (let i = 0; i < achievements.achievements.length; i++) {
        let achiev = achievements.achievements[i];
        let htmlAchiev = document.createElement('div');
        htmlAchiev.classList.add('achievement');
        htmlAchiev.classList.add(`achievement-${achiev.ID}`);

        let htmlID = document.createElement('div');
        htmlID.textContent = `ID: ${achiev.ID}`;

        let htmlName = document.createElement('h2');
        htmlName.textContent = achiev.name;

        let htmlDesc = document.createElement('p');
        htmlDesc.classList.add('shortDescription');
        htmlDesc.classList.add(`shortDescription-${achiev.ID}`);
        htmlDesc.textContent = achiev.shortDescription;

        let isOpen = false;

        htmlAchiev.addEventListener('click', function () {
            let currentDescription = document.querySelector('.shortDescription');
            if (currentDescription) {
                currentDescription.remove();
            }
            if (isOpen) {
                htmlDesc.remove();
                isOpen = false;
            } else {
                htmlAchiev.appendChild(htmlDesc);
                isOpen = true;
            }
        });

        htmlAchiev.appendChild(htmlID);
        htmlAchiev.appendChild(htmlName);
        result.appendChild(htmlAchiev);

    }


}

achievement();