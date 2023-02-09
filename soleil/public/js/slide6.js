"use strict";
var executed6 = false;

const initSlide6 = async function(){
    if(!executed6){
        $("#ombre .img-ombre").attr("src", `img/Ombre/toit-${quiz["pente"]}-ombre-01.jpg`);
        $("#ombre #image3 p").html("Jamais");
        executed6 = true;
        $("#ombre .open-button").click(function(){
            swiper.slideTo(13, 0);

        })
        $("#ombre input[name=ombre]").click(function(){
            changeOmbre();
        })
        $("#ombre footer").click(function(){
            if($("#ombre input[name=ombre]:checked").length ==1) {
                swiper.slideNext();
                quiz["ombre"] = $("#ombre input[name=ombre]:checked").val();
            }
        })
    }
}

function changeOmbre(){
    console.log("ombre");
    let ombre = $("#ombre input[name=ombre]:checked").val();
    $("#ombre .img-ombre").attr("src", `img/Ombre/toit-${quiz["pente"]}-ombre-0${ombre}.jpg`);
    console.log(ombre);
        switch (ombre) {
            case "1":
                $("#ombre #image3 p").html("Jamais");
                
                break;
            case "2":
                $("#ombre #image3 p").html("Pas trop");
               
            break;
            case "3":
                $("#ombre #image3 p").html("Toujours");
                break;
            default:
                break;
        }
}

/*
let ombre = $("#ombre input[name=ombre]:checked").val();
        switch (ombre) {
            case "Jamais":
                $("#ombre #image3 p").html("Jamais");
                $("#ombre .img-ombre").attr("src", "img/Ombre/toit-mid-ombre-01.jpg");
                break;
            case "Pas trop":
                $("#ombre #image3 p").html("Pas trop");
                $("#ombre .img-ombre").attr("src", "img/Ombre/toit-mid-ombre-02.jpg");
            break;
            case "Toujours":
                $("#ombre #image3 p").html("Toujours");
                $("#ombre .img-ombre").attr("src", "img/Ombre/toit-mid-ombre-03.jpg");
                break;
            default:
                break;
        }


        let ombre = $("#ombre input[name=ombre]:checked").val();
        switch (ombre) {
            case "Jamais":
                $("#ombre #image3 p").html("Jamais");
                $("#ombre .img-ombre").attr("src", "img/Ombre/toit-hi-ombre-01.jpg");
                break;
            case "Pas trop":
                $("#ombre #image3 p").html("Pas trop");
                $("#ombre .img-ombre").attr("src", "img/Ombre/toit-hi-ombre-02.jpg");
            break;
            case "Toujours":
                $("#ombre #image3 p").html("Toujours");
                $("#ombre .img-ombre").attr("src", "img/Ombre/toit-hi-ombre-03.jpg");
                break;
            default:
                break;
        }

*/