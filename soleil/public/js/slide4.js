"use strict";

const initSlide4 = function(){
    $("#pente header button.retour").click(function(){
        swiper.slidePrev();
    });

    $("#pente footer button").click(function(){
        console.log('but');
        quiz["pente"] = $("#logement input[type=radio][name=pente]:checked").val();
        if (quiz["pente"] == "Plat"){
            swiper.slideNext()
            swiper.slideNext()
            initSlide6();
        }
        else{
            swiper.slideNext()
            initSlide5();
        }
    });
}

function openForm() {
  document.getElementById("popupForm").style.display = "block";
}

function closeForm() {
  document.getElementById("popupForm").style.display = "none";
}