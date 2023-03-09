async function createNbChocPage(commune) {
    const nbChoc = document.getElementById("nbChoc")
    const ville = document.getElementById("villeChoisie")
    const Menaced = document.getElementById("nbDanger")
    ville.innerText = commune

    async function getDataCommune(nom) {
        return await
            fetch(`/herisson/api/commune/${nom}`)
                .then(response => response.json())
                .then(data => {
                        return data.filteredData;
                    }
                );
    }

    function countSpecies(data) {
        let nbSpecies = 0
        for (let categorie in data[Object.keys(data)[0]]) {
            nbSpecies += Object.keys(data[Object.keys(data)[0]][categorie]).length
        }
        return nbSpecies
    }

    const dataCommune = await getDataCommune(commune)
    nbChoc.innerText = countSpecies(dataCommune)

    function getMenacedSpecis(data) {
        let nbMenaced = 0
        for (let categorie in data[Object.keys(data)[0]]) {
            for (let species in data[Object.keys(data)[0]][categorie]) {
                console.log(data[Object.keys(data)[0]][categorie][species].enjeu_conservation)
                if (data[Object.keys(data)[0]][categorie][species].enjeu_conservation === "Notable" ||
                    data[Object.keys(data)[0]][categorie][species].enjeu_conservation === "Fort" ||
                    data[Object.keys(data)[0]][categorie][species].enjeu_conservation === "Très Fort" ||
                    data[Object.keys(data)[0]][categorie][species].enjeu_conservation === "Majeur") {
                    nbMenaced += 1
                }
            }
        }
        return nbMenaced
    }

    const nbMenaced = getMenacedSpecis(dataCommune)
    Menaced.innerText = nbMenaced + " espèces menacées"
}
