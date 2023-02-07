"use strict";

const initSlide4 = async function(){
    changePente();
    console.log("initSlide4");
    $("#pente header button.retour").click(function(){
        swiper.slidePrev();
    });

    $("#pente input[name=pente]").click(function(){
        changePente();
    })

    $("#pente footer button").click(function(){
        quiz["pente"] = $("#logement input[type=radio][name=pente]:checked").val();
        if (quiz["pente"] == "Plat"){
            swiper.slideNext();
            swiper.slideNext();
            //initSlide6();
        }
        else{
            swiper.slideNext()
            //initSlide5();
        }
    });
}

function changePente(){
    let pente = $("#pente input[name=pente]:checked").val();
        switch (pente) {
            case "Plat":
                $("#pente #image3 p").html("Plat");
                $("#pente .img-pente").attr("src", "img/PenteBasse.png");
                break;
            case "Standard":
                $("#pente #image3 p").html("Standard");
                $("#pente .img-pente").attr("src", "img/PenteHaut.png");
            break;
            case "Pentu":
                $("#pente #image3 p").html("Pentu");
                $("#pente .img-pente").attr("src", "img/PenteMoyen.png");
                break;
            default:
                break;
        }
}

function openForm() {
  document.getElementById("popupForm").style.display = "block";
}

function closeForm() {
  document.getElementById("popupForm").style.display = "none";
}