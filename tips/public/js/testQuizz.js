"use strict";

//Chargement des éléments nécessaires (boutons affichés)
const boutonStart = document.getElementById('start');
const boutonSUivStart = document.getElementById('suivIntro');
const boutonmenu = document.getElementById('boutonmenu');
const boutonAlea = document.getElementById('boutonalea');

//Chargement des éléments nécessaires (balises)


    //Infos Question
    const difficulteQuestion = document.getElementById("difficulteQuestion");
    const numeroQuestion = document.getElementById("nbQuestion");
    const themeQuestion = document.getElementById("themeQuestion");

    //Partie chargement du site
    const video = document.getElementById('video');
    const jeu = document.getElementById('jeu');
    const introduction = document.getElementById('introduction');
    const videoCanette = document.getElementById('elefunIntro');
    const texteIntro = document.getElementById('texteIntro');

    //Partie Question
    const carteQuestion = document.getElementById('carteQuestion');
    const sectionQuestions = document.getElementById('sectionQuestions');
    const question = document.getElementById('question');

    //Partie Score
    const carteScore = document.getElementById("carteScore");
    const scoreTotal = document.getElementById("scoreTotal");
 
    //Partie Initiative
    const carteInitiative = document.getElementById('carteInitiative');
    const miniCarteContain = document.getElementById("miniCarteContain");
    const nom = document.getElementById('nomInitiative');
    const description = document.getElementById('descriptionInitiative')
    const adresse = document.getElementById('adresseInitiative');
    const infosInitiatives = document.getElementsByClassName('infoInitiatives');

    //Partie Initiative +
    const carteInitiativePlus = document.getElementById('carteInitiativePlus');
    const nomInitia = document.getElementById('nomInitiativePlus');
    const horaireOuverture = document.getElementById('horaireOuverture');
    const articleInitiative = document.getElementById('articleInitiative');
    const videoArticle = document.getElementById('videoArticle');


    //Partie Menu
    const menuEntier = document.getElementById('menu');
    const menuouvert = document.getElementById('menuouvert');
    const choixDifficulte = document.getElementById('choixDifficulte');
    const choixThemes = document.getElementById('choixThemes');
    const carte = document.getElementById('allerALaCarte');

    //Partie Fin 
    const carteFin = document.getElementById('carteFin');
    const scoreFin = document.getElementById('scoreFin');

    //Partie Crédits
    const carteCredits = document.getElementById('carteCredits');
    const boutonCredit = document.getElementById('credits');
    const imgCredits = document.getElementById('partenaires');
    const boutonRetourCredits = document.getElementById('retourCredits');

//Chargement des éléments nécessaires (boutons cachées)
const boutonRetour = document.getElementById('retourPlus');
const boutonSuivant = document.getElementById('suivant');
const boutonQuestionSvt = document.getElementById('questionSuivante');
const boutonVoirPlus = document.getElementById('voirPlus');
const boutonFin = document.getElementById('finDuJeu');
const themeAlea = document.getElementById('themeAlea');

//Constantes
const topic = '/tips';


/*=======================================================================*/
                    /*PARTIE INTRODUCTION (Christopher)*/
var intro = 1;

video.addEventListener('ended', () => {
    video.style.display = 'none';
    boutonStart.style.display = 'block';
    introduction.style.display = 'flex';
    document.body.style.backgroundColor = '#FFF3ED';
    document.getElementById('container').style.backgroundColor = '#FFF3ED';
});

let chargementIntroduction = (intro) => {
    fetch("api/dialogues/bulle"+intro)
    .then((response) => response.json())
    .then((data) => {
        document.getElementById('phyphy').style.display = 'block';
        texteIntro.innerHTML = data;
    });
};

videoCanette.addEventListener('ended', () =>{
    chargementIntroduction(intro);
    intro++;
});



/*=======================================================================*/
                    /*PARTIE ALEATOIRE (Christopher)*/

                    
//Fonction permettant de vérifier si la réponse donnée est correcte
let verifReponse = (listIdReponses, idElem) => {
    let result = false;
    for (let i = 0 ; i < listIdReponses.length ; i ++){
        if(listIdReponses[i] === idElem){
            document.getElementById(listIdReponses[i]).classList.add("true"); 
            result = true;
        }
    }
    return result;
};

//Fonction permettant de retrouver la ID position de la reponse
let trouverId = (listReponses, elem) => {
    let result = null;
    for (let i = 0 ; i < listReponses.length ; i ++){
        if(listReponses[i] === elem){
            result = i;
        }
    }
    return result;
};

//Fonction permettant de charger une question avec son thème, sa difficulté et son id
var nbQuestion = 1;
let chargementQuestion = (theme, difficulte, id) => {
    document.body.style.backgroundColor = '#FFFBF0';
    document.getElementById('container').style.backgroundColor = '#FFFBF0';
    console.log(document.body.style.backgroundColor);
    //Reset score
    if(nbQuestion === 1) resetScoreTheme('aleatoire');

    //On supprimer les infos de la solution et l'explication
    document.getElementById('sectionReponses').innerHTML = "";
    explication.innerHTML = "";
    difficulteQuestion.innerHTML = "";
    themeQuestion.innerHTML = "";
    numeroQuestion.innerHTML = "";


    //On récupère les infos de la question
    if (difficulte === 'facile') {
        difficulteQuestion.innerHTML = difficulte + " : 1 point";
    } else {
        difficulteQuestion.innerHTML = difficulte + " : 2 points";
    }
    
    themeQuestion.innerHTML = theme;

    //Chargement de l'animation éléphant
    changeElefun(theme, 'static');

    //On incrémente le numéro de question
    numeroQuestion.innerHTML = "Question " + (nbQuestion) + "/3";
    nbQuestion++;

    //Récupération des données de la questions
    fetch("api/questions/"+ theme + "/" + difficulte + "/" + id)
        .then((response) => response.json())
        .then((data) => {
            //On insère la question dans la balise
            question.innerHTML = data.question;

            document.querySelector('#sectionReponses').innerHTML = '';
            //On parcourt les reponses pour créer des boutons
            for(let i = 0 ; i < data.propositions.length ; i ++){
                let rep = document.createElement("button");
                rep.className = "rep";
                //On parcourt les boutons pour mettre un ID à chacun indiquant la validité de la réponse
                for (let j = 0 ; j < data.reponsesIndices.length ; j ++){
                    if(data.reponsesIndices[j] === i){
                        rep.classList.add("true"); 
                    } else {
                        rep.classList.add("false");
                    }
                }
                //On relie les boutons dynamiques au noeud statique
                rep.setAttribute('id', i);
                let txt = document.createTextNode(data.propositions[i]);
                rep.appendChild(txt);
                document.getElementById('sectionReponses').appendChild(rep);
            }
            //Attribut permettant de ne pas pouvoir cliquer sur plusieurs réponses (initialement faux)
            reponseJoueur = false;
            //On démarre le jeu, l'utilisateur va pouvoir selectionner une réponse
            startQuestion(theme, difficulte, id);
    });

    //On affiche ou cache les boutons/sections nécessaires
    carteQuestion.style.display = 'block'; 
    sectionQuestions.style.display = 'flex';

};

//Fonction permettant de vérifier la vérité de chaque réponses (cela gère les questions avec une seule réponse)
var reponseJoueur = false;
let startQuestion = (theme, difficulte, id) => {
    let Reps = document.getElementsByClassName("rep");
    //On assigne une action précise pour chaque bouton quand on clique dessus
    for(let i = 0 ; i < Reps.length ; i ++){
        Reps[i].addEventListener('click', () => {
            fetch("api/questions/" + theme + "/" + difficulte + "/" +id)
            .then((response) => response.json())
            .then((data) => {
                //On récupère l'ID de la réponse et on va vérifier cette ID pour voir si elle correspond à l'ID de la réponse correcte
                let id = trouverId(data.propositions,Reps[i].innerHTML)
                let result = verifReponse(data.reponsesIndices, id);
                //Cas de la bonne réponse
                if (result && (reponseJoueur === false)){ 
                    //On passe l'attribut en true pour indiquer que l'utilisateur a choisi une réponse
                    reponseJoueur = true;
                    //Affichage explication
                    explication.innerHTML = data.explication;
                    //On importe la bonne réponse dans une variable
                    let bonnesrep = document.getElementsByClassName('true');

                    updateScoreTheme(scoreTheme + (difficulte==='facile'?1:2));
                    
                    //Chargement de l'animation éléphant
                    changeElefun(theme, 'reussite');

                    //Changement couleur des cases
                    for (let i = 0; i < bonnesrep.length; i++){
                        bonnesrep[i].style.backgroundColor = '#7ED87E';
                    }

                }
                else{
                    reponseJoueur = true;
                    //Affichage explication
                    explication.innerHTML = data.explication;
                    //Changement couleur des cases
                    let bonnesrep = document.getElementsByClassName('true');
                    for (let i = 0; i < bonnesrep.length; i++){
                        bonnesrep[i].style.backgroundColor = '#7ED87E';
                    }
                    let mauvaisesrep = document.getElementsByClassName('false');
                    for (let i = 0; i < mauvaisesrep.length; i++){
                        mauvaisesrep[i].style.opacity = '20%';
                    }

                    //Chargement de l'animation éléphant
                    changeElefun(theme, 'echec');
                    
                }

                 //On affiche ou cache les boutons/sections nécessaires
                explication.style.display = "flex";
                boutonSuivant.style.display = 'block';
            })
        });
    };
};

//Fonction permettant de charger une initiative avec son thème, sa difficulté
let chargementInitiative = (theme, difficulte) => {
    chargementInitiativeOnly(theme, difficulte);
            
     //On affiche ou cache les boutons/sections nécessaires
    carteInitiative.style.display = 'flex';
    carteQuestion.style.display = "none";
    document.getElementById('Illu').innerHTML = "";
    boutonSuivant.style.display = "none";
    boutonQuestionSvt.style.display = "block";
    boutonVoirPlus.style.display = "block";

    //style de la carte
    let couleur = changementBordure(theme);
    carteInitiative.style.border = "10px solid " + couleur;
    carteInitiative.style.borderRadius = "5%";
}

function changementBordure(theme){
    switch (theme){
        case 'Mode':
            return '#B6A0FF';
        case 'Maison':
            return '#69D1FD';
        case 'Jardinage':
            return '#FEC6CD';
        case 'Mobilité':
            return '#FF8B00';
        case 'Alimentation':
            return '#FFE248';
    }
};

function recupLogo(nomInitiative) {
    switch(nomInitiative){
        case "La boite à récup":
            return "./img/logo/boite_recup.png";
        case "Les composteurs du bocage nantais":
            return "./img/logo/composteurs_bocage.png";
        case "Ding Fring":
            return "./img/logo/ding_fring.png";
        case "Envie":
            return "./img/logo/envie.png";
        case "Klaxit":
            return "./img/logo/klaxit.png";
        case "Scopéli":
            return "./img/logo/scopeli.png";
        case "Vélo Campus":
            return "./img/logo/velo_campus.png";
        default :
            return "";
    }
}

//Fonction permettant d'importer les articles correspondant aux initiatives locales depuis l'API
let chargementArticle = async (theme, difficulte) => fetch("api/articles/" + theme + "/" + difficulte)
    .then((response) => response.json())
    .then((data) => {

        //On insère les données dans les balises correspondantes
        nomInitia.innerHTML = data.nom;
        articleInitiative.innerHTML = data.article
        articleInitiative.style.display = 'flex';
        articleInitiative.style.border = '8px solid ' + changementBordure(theme);

        //ajout logo 
        let logo = document.getElementById('logoInitiative');
        logo.src = recupLogo(data.nom);
        if ((data.nom !== "L'agronaute") && (data.nom !== "Trocquerie") && (data.nom !== "Brocante verte")){
            logo.style.display = 'block';
        }
        
        if(theme === 'Mode' && difficulte === 'facile'){
            articleInitiative.style.display = 'none';
            videoArticle.style.display = 'block';
            videoArticle.src = './img/ding fring.mp4';
        }
        if(theme === 'Jardinage' && difficulte === 'facile'){
            articleInitiative.style.display = 'none';
            videoArticle.style.display = 'block';
            videoArticle.src = './img/Brocante Verte.mp4';
        }
        if(theme === 'Alimentation' && difficulte === 'facile'){
            articleInitiative.style.display = 'none';
            videoArticle.style.display = 'block';
            videoArticle.src = './img/micro marché.mp4';
        }
        if(theme === 'Mode' && difficulte === 'difficile'){
            articleInitiative.style.display = 'none';
            videoArticle.style.display = 'block';
            videoArticle.src = './img/trocquerie.mp4';
        }
    });


//Mémoire des themes utilisés
var theme = ["Alimentation", "Mode", "Mobilité", "Maison", "Jardinage"];
var themeDuJeu = ["Alimentation", "Mode", "Mobilité", "Maison", "Jardinage"];
var themeChoisi = "";
var numQuestion = null;

let reinitialiserThemes = () => {
    for(let i = 0 ; i < theme.length ; i ++){
        themeDuJeu.push(theme[i]);
    }
}


//Fonction générant un thème aléatoire
let genererTheme = () => {

    if(themeDuJeu.length === 0){
        reinitialiserThemes();
    }

    //Fonction pour générer aleatoire un nombre
    let entierAleatoire = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    //Génération du nombre pour le theme
    var entier = entierAleatoire(0, (themeDuJeu.length - 1));
    themeChoisi = themeDuJeu[entier];

    //Génération du nombre pour le numéro de question
    numQuestion = entierAleatoire(0, 2);

    //Supprimer l'élément dans la liste des thèmes
    themeDuJeu.splice(entier,1);

}

//Fonction permettant de remettre à zéro la carte question 
let reinitialiseCarte = () => {
    carteInitiative.style.display = "none";
    miniCarteContain.innerHTML = "";
    boutonVoirPlus.style.display = "none";
    boutonQuestionSvt.style.display = "none";
    carteQuestion.style.display = "block"; 
};



//Fonction permettant de lancer le quizz en aleatoire (utilisation 1 seule fois)
boutonStart.addEventListener('click', () => {
    
    genererTheme();
    chargementQuestion(themeChoisi, "facile", numQuestion);
    boutonStart.style.display = "none";
    introduction.style.display = "none";
    jeu.style.display = "block";
    carte.style.display = 'block';


});

//Lance le quizz aleatoire
boutonAlea.addEventListener('click', ()=>{

    //couleur de fond
    document.body.style.backgroundColor = '#FFFBF0';
    
    tour = 0;
    menubool = true;
    swapMenuCorps();
    //Reset propre pour le quizz aleatoire
    reinitialiseCarte();
    genererTheme();
    nbQuestion = 1;
    chargementQuestion(themeChoisi, 'facile', numQuestion);
    hideDOM(document.querySelector('#voirPlusContainer'));
    openQuestion();
    showDOM(document.querySelector('#boutonContain'));
    document.querySelector('#boutonContain').childNodes.forEach(
        button=>null//hideDOM(button)
    );

    //CORRECTION PEUT ETRE 
    menuEntier.style.display = 'none';
    carteCredits.style.display = 'none';
});



themeAlea.addEventListener('click', ()=>{

    //couleur de fond
    document.body.style.backgroundColor = '#FFFBF0';

    boutonCredit.style.display = 'none';
    
    tour = 0;
    menubool = true;
    swapMenuCorps();
    //Reset propre pour le quizz aleatoire
    reinitialiseCarte();
    genererTheme();
    nbQuestion = 1;
    chargementQuestion(themeChoisi, 'facile', numQuestion);
    hideDOM(document.querySelector('#voirPlusContainer'));
    openQuestion();
    showDOM(document.querySelector('#boutonContain'));
    document.querySelector('#boutonContain').childNodes.forEach(
        button=>null
    );
});

//Fonction permettant de faire défiler les textes d'intros au clic
introduction.addEventListener('click', () => {
    boutonStart.style.display = "none";

    if(intro < 4){
        chargementIntroduction(intro);
        intro++;
    }
    else {
        genererTheme();
        chargementQuestion(themeChoisi, "facile", numQuestion);
        introduction.style.display = "none";
        jeu.style.display = "block";
        carte.style.display = 'block';
        
    }

});


//Fonction permettant d'afficher une initiative locale 
var tour = 0;
var difficulte = "";
boutonSuivant.addEventListener('click', () => {
    tour++;

    //On regarde si le tour n'est pas à 3 car au 3 ème tour en mode aléatoire, la difficulté est difficile pour les questions
    tour < 3 ? difficulte = "facile" : difficulte="difficile" ;

    //On charge l'initiative depuis l'API
    chargementInitiative(themeChoisi, difficulte);

    //Cas où nous sommes au 3 ème tour
    if (tour === 3){
        boutonQuestionSvt.style.display = "none";
        boutonFin.style.display = "block";

        //Réinitialisation des thèmes pour une prochaine partie aléatoire
        themeDuJeu = theme;
    }
    carteInitiative.style.display = "flex";
    document.getElementById("Illu").innerHTML = "";
    });

//Fonction permettant d'afficher le menu
let menubool = false;
boutonmenu.addEventListener('click', swapMenuCorps);

//Fonction permettant d'afficher plus d'information sur l'initiative lié à la partie en cours
boutonVoirPlus.addEventListener('click', () => {
    carteInitiative.style.display = "none";
    carteInitiativePlus.style.display = "flex";
    boutonRetour.style.display = "block";
    boutonVoirPlus.style.display = "none";
    boutonQuestionSvt.style.display = "none";

    //On réinitialise
    videoArticle.src = "";
    articleInitiative.innerHTML = "";
    articleInitiative.style.display = 'none';
    videoArticle.style.display = 'none';

    //chargement des informations
    chargementArticle(themeChoisi, difficulte);


    //Cas du 3 ème tour pour faire certain changement au niveau des boutons
    if (tour === 3) {
        boutonFin.style.display = "none";
    }

});

//Fonction permettant de revenir en arrière lorsque l'on se retrouve sur la page en savoir + 
boutonRetour.addEventListener('click', () => {
    carteInitiative.style.display = "flex";
    carteInitiativePlus.style.display = "none";

    boutonRetour.style.display = "none";
    boutonVoirPlus.style.display = "block";
    boutonQuestionSvt.style.display = "block";

    videoArticle.src = "";
    articleInitiative.innerHTML = "";
    articleInitiative.style.display = 'none';
    videoArticle.style.display = 'none';
    document.getElementById('logoInitiative').src = "";
    document.getElementById('logoInitiative').style.display = 'none';

    //Cas du 3 ème tour
    if (tour === 3) {
        boutonQuestionSvt.style.display = "none";
        boutonFin.style.display = "block";
    }
    else {
        boutonFin.style.display = "none";
    }
});

//Fonction permettant de relancer une nouvelle question après avoir répondu à celle d'avant
boutonQuestionSvt.addEventListener('click', () => {
    reinitialiseCarte();
    genererTheme();
    videoArticle.src = "";
    videoArticle.style.display = 'none';

    //Cas du troisième tour pour changer le niveau de difficulé
    if(tour == 2) {
        chargementQuestion(themeChoisi, "difficile", numQuestion);
    }
    else {
        chargementQuestion(themeChoisi, "facile", numQuestion);
    }
});

//Fonction permettant d'afficher un message à chaque fin de partie du mode aléatoire
boutonFin.addEventListener( 'click', () => {
    carteInitiative.style.display = 'none';
    boutonVoirPlus.style.display = 'none';
    boutonFin.style.display = 'none';
    carteFin.style.display = 'flex';
    appendStars(scoreTheme, scoreFin);

    //CORRECTION PEUT ETRE 
    menuEntier.style.display = 'flex';
    carteCredits.style.display = 'flex';
});


/*=======================================================================*/
                    /*PARTIE THEME (Antoine)*/


//On ajoute les interactions sur les boutons themes du menu. Une fois auchergement de la page puis on y touche plus
fetch(topic+'/api/themes')
.then(obj=>obj.json())
.then(themes => 
    themes.forEach(theme => 
        document.getElementById(theme).addEventListener('click', ()=>{
            //changement couleur de fond
            document.body.style.backgroundColor = backgroundColorCategorie(theme);
            document.getElementById('container').style.backgroundColor = backgroundColorCategorie(theme);
            choixThemes.attributes.values = theme;
            openDifficulte();
        })
    )
);

//Ajout des interactions des boutons difficutlés : Lancer le quiz
document.querySelectorAll('#choixDifficulte>button').forEach(button=>{
    button.addEventListener('click', ()=>{
        choixDifficulte.attributes.values = button.attributes.id.nodeValue;
        quizzTheme();
    })
})

function insertNewButton(name, event, container){
    const button = document.createElement('button');
    button.innerText = name;
    button.addEventListener('click', event);
    container.appendChild(button);
}

function showDOM(DOMElement){
    DOMElement.style.display = 'flex';
}

function hideDOM(DOMElement){
    DOMElement.style.display = 'none';
}

function swapMenuCorps(){
    if(menubool){
        document.getElementById('container').style.backgroundColor = '#FFFBF0';
        openCorps();
        
    }
    else{
        openMenu();
        //CORRECTION PEUT ETRE 
        menuEntier.style.display = 'none';

    }
}

function openCorps(){
    menuouvert.style.display = 'none';
    document.getElementById('boutonContain').style.display = 'flex';
    document.querySelector('#corps').style.display = 'block';
    
    //changement couleur bouton
    boutonmenu.style.backgroundColor = '#FFFBF0';

    menubool = false;
}

//Ferme le menu, affiche la carte question
function openQuestion(){
    carteQuestion.style.display = 'block';
    carteFin.style.display ='none';
    document.querySelector('#explication').style.display = 'none';
    document.querySelector('#suivant').style.display = 'none';
    document.querySelector('#nextQuestionButtonContainer').style.display = 'none';
    document.querySelector('#carteInitiative').style.display = 'none';
    document.querySelector('#carteInitiativePlus').style.display = 'none';
    hideDOM(document.querySelector('#voirMoinsContainer'));
    hideDOM(document.querySelector('#voirPlusContainer'));
}

function openMenu(){
    //On ouvre le menu des thèmes s'il n'est pas ouvert
    menuouvert.style.display = "flex";

    document.getElementById('boutonContain').style.display = 'none';
    document.querySelector('.boutonNav').style.display = 'none';
    document.getElementById('corps').style.display = "none";

    //changement couleur bouton
    boutonAlea.style.backgroundColor = '#FFFBF0';

    //changement couleur de fond
    document.body.style.backgroundColor = '#FFFBF0';
    document.getElementById('container').style.backgroundColor = '#FFFBF0';

    menubool = true;

    //Choix du theme
    openChoixTheme();
}

//Affcihe l'explication après avoir répondu
function openExplication(){
    document.querySelector('#explication').style.display = 'block';
}

//Passe du choix des thèmes au choix de difficultée
function openDifficulte(){
    openMenu();
    choixDifficulte.style.display = 'block';
    choixThemes.style.display = 'none';
}

//Passe du choix de difficultée au choix des thèmes
function openChoixTheme(){
    choixDifficulte.style.display = 'none';
    choixThemes.style.display = 'flex';
}

function openInitiative(){
    carteInitiative.style.display = 'flex';
    carteQuestion.style.display = 'none';
    carteInitiativePlus.style.display = 'none';
    showDOM(document.querySelector('#voirPlusContainer'));

}

//PROBLEME ICI JE PENSE 

function openInitiativeVoirPlus(theme, difficulte) {//OBLIGATOIRE CAR TU RECUPERES PAS LE BON THEME ET LA BONNE DIFFICULTE

    hideDOM(document.querySelector('#carteInitiative'));
    showDOM(document.querySelector('#carteInitiativePlus'));
    showDOM(document.querySelector('#voirMoinsContainer'));
    hideDOM(document.querySelector('#voirPlusContainer'));

    //On réinitialise OBLIGATOIRE AUSSI 
    videoArticle.src = "";
    articleInitiative.innerHTML = "";
    articleInitiative.style.display = 'none';
    videoArticle.style.display = 'none';

    /*Avant tu mettais themeChoisi et difficulte, sauf que c'était des variables global à moi 
    que je mettais a jour dans mon code, toi tu le faisais pas du coup c'était le mauvais thème et la mauvaise difficulte pour toi */
    chargementArticle(theme, difficulte);

}

function openInitiativeVoirMoins(){
    showDOM(document.querySelector('#carteInitiative'));
    hideDOM(document.querySelector('#carteInitiativePlus'));
    showDOM(document.querySelector('#voirPlusContainer'));
    
    //OBLIGATOIRE AUSSI 
    videoArticle.src = "";
    articleInitiative.innerHTML = "";
    articleInitiative.style.display = 'none';
    videoArticle.style.display = 'none';
    
}

//Affiche le bouton pour passer à la question suivante
function showNextQuestionButton(){
    document.querySelector('#nextQuestionButtonContainer').style.display = 'flex';
}

//Lance le quizz sur un theme
function quizzTheme(){
    //Recuperation des paramtres
    const theme = choixThemes.attributes.values;
    const difficulte = choixDifficulte.attributes.values;

    openCorps();
    openQuestion();
    
    hideDOM(document.querySelector('#boutonContain'));
    resetScoreTheme(difficulte);
    chargementQuestionTheme(theme, difficulte, 0);
}

function resetQuestion(){
    carteQuestion.querySelector('#sectionReponses').innerHTML = "";
    carteQuestion.querySelector('#explication').innerHTML = "";
    carteQuestion.querySelector('#nbQuestion').innerHTML = "";
    carteQuestion.querySelector('#nextQuestionButtonContainer').innerHTML = "";
}


function backgroundColorCategorie(theme){
    switch (theme){
        case 'Mode':
            return '#EEE9FF';
        case 'Maison':
            return '#EDFCFF';
        case 'Jardinage':
            return '#FFEFF9';
        case 'Mobilité':
            return '#FFF3ED';
        case 'Alimentation':
            return '#F8F2DE';
    }
}

function chargementQuestionTheme(theme, difficulte, idQuestion){
    //On supprimer les infos de la solution et l'explication
    resetQuestion();

    //Affichage
    if (difficulte === 'facile') {
        difficulteQuestion.innerHTML = difficulte + ' : 1 point';
    } else {
        difficulteQuestion.innerHTML = difficulte + ' : 2 points';
    }
    
    themeQuestion.innerHTML = theme;
    document.getElementById('container').style.backgroundColor = backgroundColorCategorie(theme);
    document.body.style.backgroundColor = backgroundColorCategorie(theme);
    document.getElementById('credits').style.backgroundColor = backgroundColorCategorie(theme);
    numeroQuestion.innerHTML = "Question " + (idQuestion+1) + "/3";
    carteCredits.style.display = 'none';

    //Remplissage des question + reponses
    fetch("/tips/api/questions/"+ theme + "/" + difficulte + "/" + idQuestion)
    .then((response) => response.json())
    .then((data) => {
        //Ajout question
        question.innerHTML = data.question;

        //Ajout elefun
        changeElefun(theme, 'static');

        //Ajout boutons
        addButtons(data);

        //Interaction des boutons
        addInterractionButtonsTheme(theme, difficulte, idQuestion);

        //Remplissage explication (reste caché jusqu'a la réponse)
        document.querySelector('#explication').innerHTML = data.explication;

        //Changement de l'interaction sur bouton suivant
        appendThemeNextButton(theme, difficulte, idQuestion);
    });
}

function addButtons(questionData){
    questionData.propositions.forEach((prop, idProposition)=>{
        //Creation boutton
        const rep = document.createElement("button");
        rep.className = 'rep';
        rep.setAttribute('id', idProposition);
        
        //Bonne ou mauvase réponse
        const goodAnswer = questionData.reponsesIndices.includes(idProposition);
        rep.classList.add(goodAnswer ? 'true' : 'false')

        //Remplissage question
        const txt = document.createTextNode(prop);
        rep.appendChild(txt);

        //Ajout à la section reponse
        document.querySelector('#sectionReponses').appendChild(rep);
    })
}

var responseUsedTheme; //Token pour dire si la reponse a été cliqué
//Ajout de l'interaction des boutons reponses des questions par thèmes
function addInterractionButtonsTheme(theme, difficulte, idQuestion){
    responseUsedTheme = false;
    document.querySelectorAll('#sectionReponses>button').forEach(button=>{
        button.addEventListener('click', ()=>{
            if(!responseUsedTheme){
                responseUsedTheme = true;
                const goodAnswer = button.classList.contains('true');
                applyResponseColor(goodAnswer);
                openExplication();
                showNextQuestionButton();
                changeElefun(
                    theme, 
                    goodAnswer?'reussite':'echec'
                );
                if(goodAnswer) updateScoreTheme(scoreTheme + (difficulte==='difficile'?2:1));
            }
        }, {once : true})
    })
}


function applyResponseColor(goodAnswer){
    document.querySelectorAll('#sectionReponses>button').forEach(button=>{
        const goodButton = button.classList.contains('true');

        if(goodButton){
            button.style.backgroundColor = '#7ed87e';
        }
        
        if(!goodAnswer && !goodButton){
            button.style.opacity = '20%';
        }
    })
}

//Charge le bouton suivant pour le quizz par thème
function appendThemeNextButton(theme, difficulte, idQuestion){
    const button = document.createElement('button');
    document.querySelector('#nextQuestionButtonContainer').appendChild(button);

    button.appendChild(
        document.createTextNode(
            idQuestion < 2 ?
            'Question suivante'
            :
            `Voir l'initiative`
        )
    )

    button.addEventListener(
        'click',
        idQuestion < 2 ?
        ()=>{
            openQuestion();
            chargementQuestionTheme(theme, difficulte, idQuestion+1);
        }
        :
        ()=>{
            handleInititiveTheme(theme, difficulte);
        }
    )
}

async function handleInititiveTheme(theme, difficulte){
    console.log(theme, difficulte);
    openInitiativeVoirMoins();
    return chargementInitiativeOnly(theme, difficulte)//Ecriture des cartes
    .then(()=>{
        document.querySelector('#voirPlusContainer').innerHTML = '';
        document.querySelector('#voirMoinsContainer').innerHTML = '';
        //Creation des boutons Voir plus/moins
        insertNewButton('En savoir +', ()=>openInitiativeVoirPlus(theme, difficulte), document.querySelector('#voirPlusContainer'));
        insertNewButton('Retour', openInitiativeVoirMoins, document.querySelector('#carteInitiativePlus>#voirMoinsContainer'));

        //Creation du bouton voir score
        insertNewButton('Voir score', retourAccueil, document.querySelector('#voirPlusContainer'));

        //Affichage
        openInitiative();
    })
}

//Charge les données dans les cartes initiatives et article mais ne fait rien d'autre
async function chargementInitiativeOnly(theme, difficulte){
    return fetch('api/initiative/'+theme+'/'+difficulte)
    .then(res=>res.json())
    .then(initiative=>{
        //Creation mini carte
        const miniCarte = document.createElement("img");
        miniCarte.src = "img/miniCarte/" + theme + "_" + difficulte + ".png";
        miniCarte.id = "miniCarte";

        let couleur = changementBordure(theme);

        miniCarte.style.border =  "solid 4px " + couleur;
        miniCarteContain.innerHTML = '';
        miniCarteContain.appendChild(miniCarte);

        
        
        //On complète les infos de la carte initiative 
        nom.innerHTML = initiative.nom ;
        description.innerHTML = initiative.description;
        adresse.innerHTML = initiative.adresse;

        //style de la carte
        carteInitiative.style.border = "10px solid " + couleur;
        carteInitiative.style.borderRadius = "5%";

        //On complète la carte en savoir +
        return chargementArticle(theme, difficulte);
    });
}

function changeElefun(theme, state){
    //theme in ['static', 'reussite', 'echec']
    //ajout elefun content en fonction du thème
    const image = document.createElement("img");
    image.className = 'elefunResultat';
    const filename = ((theme)=>{
        switch (theme) {
            case 'Alimentation':
                return 'alimentation'
            case 'Mode':
                return 'mode';
            case 'Mobilité':
                return 'deplacement';
            case 'Maison':
                return 'maison';
            case 'Jardinage':
                return 'jardinage';
        }
    })(theme)
    
    let src = 'img/'+state+'/'+filename+'.png'
    image.setAttribute('src', src);
    //On vide l'illustation et on la change
    document.getElementById('Illu').innerHTML = "";
    document.getElementById('Illu').appendChild(image);
}

//Gestion du score
var scoreTheme = 0;
var scoreThemeMax = 3;

function resetScoreTheme(difficulte){
    updateScoreTheme(0);
    scoreThemeMax = (difficulte=>{
        switch(difficulte){
            case 'facile':
                return 3;
            case 'difficile':
                return 6;
            case 'aleatoire':
                return 4;
            default:
                return 4;
        }
    })(difficulte)
    updateScoreTheme(0);
}

//Change le score et l'affichage
function updateScoreTheme(newScore){
    const starContainer = document.querySelector('#scoreTotal');
    
    appendStars(newScore, starContainer);
}

function appendStars(newScore, starContainer){
    scoreTheme = newScore;

    //Suppression des anciennes étoiles
    starContainer.innerHTML = '';

    //Ajout des nouvelles étoiles
    for(let i=0; i<scoreThemeMax; i++){
        let star = document.createElement('img');
        star.src = 'img/'+(i>=(scoreThemeMax-scoreTheme) ? 'ETOILE_VERT':'ETOILE_GRIS')+'.png';
        starContainer.appendChild(star);
    }
}



function retourAccueil(){
    carteInitiative.style.display = 'none';
    boutonVoirPlus.style.display = 'none';
    boutonFin.style.display = 'none';
    carteFin.style.display = 'flex';
    hideDOM(document.querySelector('#voirPlusContainer'));
    appendStars(scoreTheme, scoreFin);
    menuEntier.style.display = 'flex';
    
    carteCredits.style.display = 'flex';
}

//PARTIE Crédits 
 boutonCredit.addEventListener('click', ()=> {
    carteFin.style.display = 'none';
    imgCredits.style.display = 'flex';
    boutonCredit.style.display = 'none';
    boutonRetourCredits.style.display = 'flex';
    menuEntier.style.display = 'none';
 });

 boutonRetourCredits.addEventListener('click', () => {
    menuEntier.style.display = 'flex';
    carteFin.style.display = 'flex';
    imgCredits.style.display = 'none';
    boutonCredit.style.display = 'flex';
    boutonRetourCredits.style.display = 'none';


 });


//PARTIE DE FLORIAN, PAS TOUCHE !!!
//pour le skip de chargement et le bouton vers la map

function skipIntro(){
    const lastUrl = document.referrer;
    const url = new URL(window.location.href);
    const urlTest = url.href + "index2.html";
    if (lastUrl == urlTest){
        console.log("on revient de la carte");
        const chargementBalise = document.querySelector("#chargement");
        chargementBalise.innerHTML = "";
        chargementBalise.style.display = "none";
        document.querySelector("#introduction").style.display = "none";
        carte.style.display = "block";

        genererTheme();
        chargementQuestion(themeChoisi, "facile", numQuestion);
        boutonStart.style.display = "none";
        introduction.style.display = "none";
        jeu.style.display = "block";
    }
    else{
        console.log("on ouvre pour la premiere fois");
    }
}


const baliseGoToMap = document.querySelector("#allerALaCarte");
baliseGoToMap.addEventListener("click", goToMap);
skipIntro();

carte.addEventListener('click', () => {
    goToMap();
});

function goToMap(){
  window.location.href = "./index2.html";
}

