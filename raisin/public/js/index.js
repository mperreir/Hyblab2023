let cepage;
let data;
let music;
let nbquestion=0;
let wineQuantity=90;
let bouteillefin;

async function fetchData(file) {
    const res = await fetch(file);
    const data = await res.json()
    return data;
}

//Changer de page avec une animation ou non
function setPage(pageId = "", anim = undefined) {
    if (!anim) {
        $(".page").hide();
        $(pageId).show();
    }
    else if (anim == "fade") {
        $(".page").fadeOut()
        $(pageId).fadeIn();
    }
}

function reset() {
    setPage("#page-title");
    $(".header, #home-button").hide();
    $(".header").attr("src", `img/progressbar/checkpoint-0.png`);
    nbquestion = 0;
    wineQuantity = 90;
}

//Définir la question
function setQuestion(num, text) {
    $(".header").attr("src", `img/progressbar/checkpoint-${num}.png`);
    $("#question-text").html(text.replace("\n", "<br>"));
}

//Ajouter un choix de réponse pour la question
function setChoice(num, text) {
    $(`#choice-${num}`).text(text);
}

//Supprimer touts les choix de réponse
function removeChoices() {
    $(".choice").remove();
}

function afficheEvenement(numQuestion) {
    $("#txt-evenement>p").html(data.questions.general[numQuestion].contexte);
    $("#img-evenement").attr("src", data.questions.general[numQuestion].img);
    $("#img-bulle-event").attr("src", data.questions.general[numQuestion].imgBulle);
}

function afficheQuestion(numQuestion) {
    $("#question-text>p").html(data.questions.general[numQuestion].enonce);
    $("#choice-1>p").html(data.questions.general[numQuestion].reponse[0]);
    $("#choice-2>p").html(data.questions.general[numQuestion].reponse[1]);
    $("#choice-3>p").html(data.questions.general[numQuestion].reponse[2]);
}

function selectExplication(numQuestion, numReponse) {
    $("#txt-score>p").html(data.questions.general[numQuestion].explication[numReponse]);
}

function changementVin(numQuestion, numReponse) {
    wineQuantity = wineQuantity * (1-data.questions.general[numQuestion].consequence[numReponse]);
    $(".vin").css("height", wineQuantity + "%");
}

//Définir le numéro du cépage choisis (0, 1 ou 2)
function setCepage(id) {
    if (id >= 0 && id <= 2) {
        cepage = id;
    }
}

//Afficher l'expliqaution du cépage
function displayCepage() {
    $("#bouteille-solo").attr("src", data.cepages[cepage].img);
    $("#explaination-cepage").css("background-color", data.cepages[cepage].color);
    $("#explaination-cepage>p").html(data.cepages[cepage].desc);
    $("#explaination-cepage>p").css("color", data.cepages[cepage].txtcolor);
    $("#txt-score>p").css("color", data.cepages[cepage].txtcolor);
    $(".vin").css("background-color", data.cepages[cepage].color);
    $("#txt-score").css("background-color", data.cepages[cepage].color);
    $("#bouteille-resume").attr("src", data.cepages[cepage].imgfin)
    $(".vin").css("height", "90%");
}

async function loadApp() {
    //Cela permet d'attendre que le fichier json soit importé avant de faire quoi que ce soit

    $(".header, #home-button").hide();
    setPage();
    data = await fetchData("data/data.json");

    //Page par défaut;
    setPage("#page-title","fade");

    anime({
        targets: '.anim',
        translateY: "5%",
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutQuad',
        autoplay: true,
        duration: 1000
    });
}

$("#sound-toggle").click(() => {
    if(!music) {
        music = new Howl({
            src: ["music/background-music.mp3"],
            html5: true,
            format: ['mp3'],
            //autoplay: true,
            loop: true,
            volume: 0.2
        });
    }
    if(!music.playing()){
        music.play();
        $("#sound-toggle").attr("src","img/icons/sound-on.png");
    }
    else {
        music.pause();
        $("#sound-toggle").attr("src","img/icons/sound-off.png");
    }
});

$("#home-button").click(() => {
    reset();
});

$("#button-evenement").click(() => {
    if (nbquestion == 3){
        $("#question-text>p").html(data.questions.cepage[cepage].enonce);
        $("#choice-1>p").html(data.questions.cepage[cepage].reponse[0]);
        $("#choice-2>p").html(data.questions.cepage[cepage].reponse[1]);
        $("#choice-3>p").html(data.questions.cepage[cepage].reponse[2]);
    }
    else if (nbquestion > 3){
        afficheQuestion(nbquestion-1);
    }
    else{
        afficheQuestion(nbquestion);
    }
    setPage("#page-question", "fade"); 
});

$("#choice-1").click(() => {
    if (nbquestion == 3){
        $("#txt-score>p").html(data.questions.cepage[cepage].explication[0]);
        setPage("#page-score", "fade");
        setTimeout(() => {
            wineQuantity = wineQuantity * (1-data.questions.cepage[cepage].consequence[0]);
            $(".vin").css("height", wineQuantity + "%");
        }, 2000)
    }
    else if (nbquestion > 3){
        selectExplication(nbquestion-1, 0);
        setPage("#page-score", "fade");
        setTimeout(() => {
            (changementVin(nbquestion-1, 0));
        }, 2000)
    }
    else{
        selectExplication(nbquestion, 0);
        setPage("#page-score", "fade");
        setTimeout(() => {
            (changementVin(nbquestion, 0));
        }, 2000)
    }
});

$("#choice-2").click(() => {
    if (nbquestion == 3){
        $("#txt-score>p").html(data.questions.cepage[cepage].explication[1]);
        setPage("#page-score", "fade");
        setTimeout(() => {
            wineQuantity = wineQuantity * (1-data.questions.cepage[cepage].consequence[1]);
            $(".vin").css("height", wineQuantity + "%");
        }, 2000)
    }
    else if (nbquestion > 3){
        selectExplication(nbquestion-1, 1);
        setPage("#page-score", "fade");
        setTimeout(() => {
            (changementVin(nbquestion-1, 1));
        }, 2000)
    }
    else{
        selectExplication(nbquestion, 1);
        setPage("#page-score", "fade");
        setTimeout(() => {
            (changementVin(nbquestion, 1));
        }, 2000)
    }
});

$("#choice-3").click(() => {
    if (nbquestion == 3){
        $("#txt-score>p").html(data.questions.cepage[cepage].explication[2]);
        setPage("#page-score", "fade");
        setTimeout(() => {
            wineQuantity = wineQuantity * (1-data.questions.cepage[cepage].consequence[2]);
            $(".vin").css("height", wineQuantity + "%");
        }, 2000)
    }
    else if (nbquestion > 3){
        selectExplication(nbquestion-1, 2);
        setPage("#page-score", "fade");
        setTimeout(() => {
            (changementVin(nbquestion-1, 2));
        }, 2000)
    }
    else{
        selectExplication(nbquestion, 2);
        setPage("#page-score", "fade");
        setTimeout(() => {
            (changementVin(nbquestion, 2));
        }, 2000)
    }
});

$("#button-score").click(() => {
    nbquestion+=1;
    console.log(nbquestion);
    if (nbquestion == 6){
        if (wineQuantity > 55){
            $("#txt-resume>p").html("Bravo, vous avez sauvé une grande partie de votre récolte !");
        }
        else if (wineQuantity > 35){
            $("#txt-resume>p").html("Vous avez réussi à sauver environ la moitié de votre récolte.");
        }
        else{
            $("#txt-resume>p").html("Dommage, vous n’avez pas réussi à sauver une grande partie de votre récolte.");
        }
        setPage("#page-resume", "fade");
    }
    else if (nbquestion == 3){
        $(".header").attr("src", `img/progressbar/checkpoint-`+(nbquestion+1)+`.png`);
        $("#txt-evenement>p").html(data.questions.cepage[cepage].contexte);
        $("#img-evenement").attr("src", data.questions.cepage[cepage].img)
        $("#img-bulle-event").attr("src", data.questions.cepage[cepage].imgBulle)
        setPage("#page-evenement", "fade");
    }
    else if (nbquestion > 3){
        $(".header").attr("src", `img/progressbar/checkpoint-`+(nbquestion+1)+`.png`);
        afficheEvenement(nbquestion - 1);
        setPage("#page-evenement", "fade");
    }
    else {
        $(".header").attr("src", `img/progressbar/checkpoint-`+(nbquestion+1)+`.png`);
        afficheEvenement(nbquestion);
        setPage("#page-evenement", "fade");
    }
});

$("#button-resume").click(() => {
    //$(".header, #home-button").hide();
    $(".header").attr("src", `img/progressbar/checkpoint-0.png`);
    nbquestion = 0;
    wineQuantity = 90;
    setPage("#page-sources", "fade");
});

$("#button-restart").click(() => {
    $(".header").attr("src", `img/progressbar/checkpoint-0.png`);
    nbquestion = 0;
    wineQuantity = 90;
    setPage("#page-cepage", "fade");
});

$("#button-test").click(() => {
    changementVin(90 * 0.8, "red");
});

//Event de clique sur le bouton de jeu
$("#button-play").click(() => {
    setPage("#page-presentation-Domi", "fade");
    $(".header, #home-button").fadeIn();
});

$("img.button-next").click(() => {
    setPage("#page-cepage", "fade")
})

$("#info-1").click(() => {
    setCepage(0);
    displayCepage();
    setPage("#page-explaination-cepage", "fade");
});

$("#info-2").click(() => {
    setCepage(1);
    displayCepage();
    setPage("#page-explaination-cepage", "fade");   
});

$("#info-3").click(() => {
    setCepage(2);
    displayCepage();
    setPage("#page-explaination-cepage", "fade");
});

$("#cepage-1-bouton").click(() => {
    setCepage(0);
    displayCepage();
    afficheEvenement(0);
    $(".header").attr("src", `img/progressbar/checkpoint-`+(nbquestion+1)+`.png`);
    setPage("#page-evenement", "fade");
});

$("#cepage-2-bouton").click(() => {
    setCepage(1);
    displayCepage();
    afficheEvenement(0);
    $(".header").attr("src", `img/progressbar/checkpoint-`+(nbquestion+1)+`.png`);
    setPage("#page-evenement", "fade");
});

$("#cepage-3-bouton").click(() => {
    setCepage(2);
    displayCepage();
    afficheEvenement(0);
    $(".header").attr("src", `img/progressbar/checkpoint-`+(nbquestion+1)+`.png`);
    setPage("#page-evenement", "fade");
});

$("#left-button-cepage").click(() => {
    setPage("#page-cepage");
});

$("#right-button-sources").click(() => {
    setPage("#page-sources2");
});

$("#right-button-sources2").click(() => {
    setPage("#page-credits");
});

//Chargement de l'application
loadApp();
