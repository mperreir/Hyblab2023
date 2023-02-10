document.querySelector(".headerThree p").innerHTML = "score : "+sessionStorage.getItem("Score");

function updateScore(nbSlide){
    monScore = sessionStorage.getItem("Score");
    monScore = monScore.substring(0,monScore.length-1);
    monNouveauScore = parseInt(monScore)+(100-parseInt(monScore)/nbSlide);
    sessionStorage.setItem("Score", monNouveauScore.toString()+"%");
}
