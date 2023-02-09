"use strict";   // Pente
var executed4 = false;

const initSlide4 = async function(){
    if(!executed4){
        executed4 = true;
        changePente();

        $(".open-button").click(function(){
            swiper.slideTo(11, 0);

        })

        $("#pente input[name=pente]").click(function(){
            changePente();
        })
    
        $("#pente footer button").click(function(){
            console.log($("#pente input[type=radio][name=pente]:checked"));
            quiz["pente"] = $("#pente input[type=radio][name=pente]:checked").val();
            if (quiz["pente"] == "Plat"){
                swiper.slideNext();
                swiper.slideNext();
                //initSlide6();
            }
            else{
                swiper.slideNext();
                console.log(quiz);
                //initSlide5();
            }
        });
    }
    
}

function changePente(){
    let pente = $("#pente input[name=pente]:checked").val();
        switch (pente) {
            case "2":
                $("#pente #image3 p").html("Standard");
                $("#pente .img-pente").attr("src", "img/Ombre/toit-mid-ombre-01.jpg");
                break;
            case "1":
                $("#pente #image3 p").html("Plat");
                $("#pente .img-pente").attr("src", "img/Ombre/toit-flat-ombre-01.jpg");
            break;
            case "3":
                $("#pente #image3 p").html("Pentu");
                $("#pente .img-pente").attr("src", "img/Ombre/toit-hi-ombre-01.jpg");
                break;
            default:
                console.log(pente);
                break;
        }
}

function openForm() {
  document.getElementById("popupForm").style.display = "block";
}

function closeForm() {
  document.getElementById("popupForm").style.display = "none";
}