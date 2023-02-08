async function createPageConseil(name) {
    async function getData(dbPath) {
        const response = await fetch(dbPath)
        return await response.json()
    }

    const donnees = await getData("data/tipsDB.json")

    const dictionnaire = donnees[name]

    const wrapper = document.getElementsByClassName("swiper-wrapper")[0]

    for (let conseil in dictionnaire) {

        // On créé l'objet HMTL pour le slide
        let slide = document.createElement("div")
        // Changer l'id
        slide.id = name
        // Changer la classe
        slide.className = "swiper-slide"

        let titreCategorie = document.createElement("p")
        titreCategorie.className = "categorie"
        titreCategorie.innerText = "AIDEZ LES " + name.toUpperCase()

        let titreConseil = document.createElement("p")
        titreConseil.className = "conseil"

        let description = document.createElement("p")
        description.className = "description"

        let action = document.createElement("p")
        action.className = "action"
        action.innerText = "Choisissez votre action"

        // Pour chaque clé conseil
        let desc = dictionnaire[conseil]

        titreConseil.innerText = conseil
        description.innerText = desc

        slide.appendChild(titreCategorie)
        slide.appendChild(titreConseil)
        slide.appendChild(description)
        slide.appendChild(action)

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

