"use strict";   // Pente
var executed4 = false;

const initSlide4 = async function(){
    if(!executed4){
        executed4 = true;
        $("#pente .img-pente").attr("src", `img/Ombre/toit-1-ombre-01.jpg`);

        $("#pente .open-button").click(function(){
            swiper.slideTo(11, 0);

        });

        $("#pente input[name=pente]").click(function(){
            changePente();
        })
    
        $("#pente footer button").click(function(){
            console.log($("#pente input[type=radio][name=pente]:checked"));
            if($("#pente input[type=radio][name=pente]:checked").length == 1){
                quiz["pente"] = $("#pente input[type=radio][name=pente]:checked").val();
            if (quiz["pente"] == "Plat"){
                swiper.slideNext();
                swiper.slideNext();
                
            }
            else{
                swiper.slideNext();
                console.log(quiz);
            }
            }
            
        });
    }
    
}

function changePente(){
    let pente = $("#pente input[name=pente]:checked").val();
    $("#pente .img-pente").attr("src", `img/Ombre/toit-${pente}-ombre-01.jpg`);
        switch (pente) {
            case "2":
                $("#pente #image3 p").html("Standard");
                break;
            case "1":
                $("#pente #image3 p").html("Plat");
            break;
            case "3":
                $("#pente #image3 p").html("Pentu");
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