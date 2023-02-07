import {storage} from "googleapis/build/src/apis/storage";

function createFicheMinia(profil) {
    const htmlString = `<div class="fiche-minia">
                            <img alt="supprimer-profil" src="">
                            <div class="contenu-fiche-minia flex-row justify-content-space-between">
                                <img alt="photo ${profil.nomPrenom}" src="${profil.urlPhoto}">
                                <div class="contenu-fiche-minia-text flex-column justify-content-space-around">
                                    <p>${profil.nomPrenom}</p>
                                    <p>${profil.nomEntreprise}</p>
                                    <p>${profil.ville}</p>
                                    <p>${profil.ficheMiniature}</p>
                                </div>
                            </div>
                        </div>
                        `;
    return createElementFromHTML(htmlString);
}
document.addEventListener("DOMContentLoaded", function() {
    // TODO : À récupérer depuis la sélection faite dans le swipe
    const profilsTest = [   {  nomPrenom: "Michel Dubois",
                                nomEntreprise: "Axitek",
                                ville: "Nantes",
                                ficheMiniature: "Une entreprise bien spéciale",
                                urlPhoto: "https://media.licdn.com/dms/image/C5603AQEknKFZXX9tRg/profile-displayphoto-shrink_800_800/0/1517475397492?e=1680739200&v=beta&t=I4ONcua83gAQuyEqPc6tfPxjQ-kkGN_R7NbVuBc0OiA"},
                            {  nomPrenom: "Patrice Ficom",
                                nomEntreprise: "Protifloup",
                                ville: "Marseille",
                                ficheMiniature: "Production de floup",
                                urlPhoto: "https://media.licdn.com/dms/image/C4E03AQG3FBjwWyrt-A/profile-displayphoto-shrink_800_800/0/1660056537761?e=1680739200&v=beta&t=BUeVBE-15OJLowSRehWL2Tyv189StPslur_8-oylpW0"},
                            {  nomPrenom: "Omar Ranfou",
                                nomEntreprise: "Virt'ai",
                                ville: "Paris",
                                ficheMiniature: "Très très intéressant",
                                urlPhoto: "https://media.licdn.com/dms/image/D4E35AQFsBrWlMhuvDw/profile-framedphoto-shrink_800_800/0/1672674431307?e=1675782000&v=beta&t=JPYSrjRxq0e9iup7K2H-dM_vJJTk7N8hOPkR8sJkMEQ"}];

    const listeProfils = document.querySelector('#liste-profils');

    profilsTest.forEach((profil) => {
        const ficheMinia = createFicheMinia(profil);
        listeProfils.append(ficheMinia);
    });

});