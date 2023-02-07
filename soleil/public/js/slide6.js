"use strict";
var executed6 = false;

const initSlide6 = function(){
    if(!executed6){
        changeOmbre();
        executed6 = true;
        $("#ombre input[name=ombre]").click(function(){
            changeOmbre();
        })
        $("#ombre footer").click(function(){
            swiper.slideNext();
        })
    }
}

function changeOmbre(){
    console.log("ombre");
    let ombre = $("#ombre input[name=ombre]:checked").val();
        switch (ombre) {
            case "Jamais":
                $("#ombre #image3 p").html("Jamais");
                $("#ombre .img-ombre").attr("src", "img/PenteBasse.png");
                break;
            case "Pas trop":
                $("#ombre #image3 p").html("Pas trop");
                $("#ombre .img-ombre").attr("src", "img/PenteHaut.png");
            break;
            case "Toujours":
                $("#ombre #image3 p").html("Toujours");
                $("#ombre .img-ombre").attr("src", "img/PenteMoyen.png");
                break;
            default:
                break;
        }
}