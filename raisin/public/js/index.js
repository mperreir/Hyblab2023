let cepage;
let data;

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
}

function changementVin(quantity, color) {
    $(".vin").css("height", quantity + "%");
    $(".vin").css("background-color", color);
}

function selectExplication(numQuestion, numReponse) {
    $("#txt-score>p").html(data.questions.general[numQuestion].explication[numReponse]);
}

$("#button-test1").click(() => {
    selectExplication(0, 1)
});

async function loadApp() {
    //Cela permet d'attendre que le fichier json soit importé avant de faire quoi que ce soit

    $(".header").hide();
    setPage();
    data = await fetchData("/data/data.json");

    //Page par défaut;
    setPage("#page-title","fade");

    let sound = new Howl({
        src: ["music/background-music.mp3"],
        html5: true,
        format: ['mp3'],
        autoplay: true,
        loop: true,
        volume: 0.5
    });
    sound.play();

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

$("#home-button").click(() => {
    reset();
});

$(".button-score").click(() => {
    setPage("#page-resume", "fade");
});

$("#button-test").click(() => {
    changementVin(90 * 0.8, "red");
});

//Event de clique sur le bouton de jeu
$("#button-play").click(() => {
    setPage("#page-presentation-Domi", "fade");
    $(".header").fadeIn();
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
    setPage("#page-contexte", "fade");
});

$("#cepage-2-bouton").click(() => {
    setCepage(1);
    displayCepage();
    setPage("#page-contexte", "fade");
});

$("#cepage-3-bouton").click(() => {
    setCepage(2);
    displayCepage();
    setPage("#page-contexte", "fade");
});

$("#left-button-cepage").click(() => {
    setPage("#page-cepage");
});

//Chargement de l'application
loadApp();
