async function createCommunePage(commune) {
    const wrapper = document.getElementsByClassName("swiper-wrapper")[0]

    async function getDataCommune(nom) {
        return await
            fetch(`/herisson/api/commune/${nom}`)
                .then(response => response.json())
                .then(data => {
                        return data.filteredData;
                    }
                );
    }

    const dataCommune = await getDataCommune(commune)

    for (let categorie in dataCommune[Object.keys(dataCommune)[0]]) {
        // Pour chaque catégorie d'animaux dans le dictionnaire de la ville
        // Categorie est la clé du dictionnaire dataCommune

        let slide = document.createElement("div")
        slide.className = "swiper-slide"
        slide.id = categorie

        // ----- TITRE COMMUNE -----
        let nomCommune = document.createElement("h1")
        if (categorie === "Oiseaux" || categorie === "Chiroptères") {
            nomCommune.className = "commune green"
        } else {
            nomCommune.className = "commune white"
        }
        nomCommune.innerText = Object.keys(dataCommune)[0].toUpperCase()

        // ----- BOUTON -----
        let bouton = document.createElement("button")
        bouton.className = "button"

        let boutonText = document.createElement("span")
        boutonText.className = "decouvrir"
        boutonText.innerText = "Découvrir les " + categorie

        bouton.appendChild(boutonText)

        // on click, on va sur la page de la catégorie
        bouton.onclick = function () {
            localStorage.setItem("category", categorie)
            console.log(categorie)
            window.location.href = "listeAnimaux.html"
        }

        let groupe = document.createElement("a")
        groupe.className = "groupe"
        groupe.innerText = "Choisissez votre groupe"

        slide.appendChild(nomCommune)
        slide.appendChild(bouton)
        slide.appendChild(groupe)

        wrapper.appendChild(slide)
    }

    // Slider horizontal
    var horizontalSlider = new Swiper('.horizontal-slider', {
        loop: true,
        nested: true,
        navigation: {
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
}
