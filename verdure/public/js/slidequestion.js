"use strict";

// async init function (because of the awaits on fetches)
const initSlideQuestion = async function(){
  // Get logo element
  const page = document.querySelector('#question-slide')
  let question = document.querySelector('#question')
  let city = document.querySelector('.city')
  var rep_1 = document.querySelector("#rep_1")
  var rep_2 = document.querySelector("#rep_2")
  var cons_1 = document.querySelector("#reponse1")
  var cons_2 = document.querySelector("#reponse2")

  rep_1.addEventListener('click', ()=> {
    changementThermo(-10)
    changementMoney(-20)
    changementHappy(+30)
    question.style.opacity = 0
    question.style.height = 0
    cons_1.style.height = '100%'
    cons_1.style.opacity = 100
  })

  rep_2.addEventListener('click', ()=> {
    changementThermo(-20)
    changementMoney(-10)
    changementHappy(-20)
    question.style.opacity = 0
    question.style.height =0
  })

  setTimeout(()=> {
    question.style.opacity = 100;
    cons_1.style.height = 0;
    cons_2.style.height = 0;
    page.style.backgroundPositionY = "-10vh";
    city.style.top = "20%";
    swiper.enabled= true;
    swiper.enable();
},1000
)

// questions
await questions();

// swiper.on('touchMove',function(event){
//   console.log("OKK")
//   var speed =event.velocity;
//   if (speed>0.5){
//     question.style.opacity = 100;
//   page.style.backgroundPositionY = "-5vh";
//   indic.style.opacity= 0;
//   swiper.enable();
//   }
//   else{
//     question.style.opacity = 100;
//   page.style.backgroundPositionY = "-5vh";
//   indic.style.opacity= 0;
//   swiper.enable();
//   }
  
// })


  const indic = document.querySelector('.indic');
  anime({
    targets: '.indic',
    scale: 1.2,
    easing: 'easeInOutQuad',
    direction: 'alternate',
    loop: true
  });


};


function changementThermo(quantitytoAdd) {
  var div = document.querySelector('.thermo');
  var height = div.offsetHeight;
  var parentHeight = div.parentNode.offsetHeight;

  height = height / parentHeight * 100 ;

  var new_height = quantitytoAdd  + height;

  applyChange(".thermo",new_height);
}

function changementMoney(quantitytoAdd) {
  var div = document.querySelector('.money');
  var height = div.offsetHeight;
  var parentHeight = div.parentNode.offsetHeight;

  height = height / parentHeight * 100 ;

  var new_height = quantitytoAdd  + height;

  applyChange(".money",new_height);
}

function changementHappy(quantitytoAdd) {
  var div = document.querySelector('.happy');
  var height = div.offsetHeight;
  var parentHeight = div.parentNode.offsetHeight;

  height = height / parentHeight * 100 ;

  var new_height = quantitytoAdd  + height;

  applyChange(".happy",new_height);
}


function applyChange(div,new_height){

  if(new_height <= 10){
    $(div).css("height", 15+"%");
    if(div == ".thermo"){$(div).css("background-color", "#0ffc03");}
    else {$(div).css("background-color", "#fc0303");}
  }

  else if(new_height <= 20){
    $(div).css("height", new_height+"%");
    if(div == ".thermo"){$(div).css("background-color", "#3dfc03");}
    else {$(div).css("background-color", "#fc4503");}
  }

  else if(new_height <= 30){
    $(div).css("height", new_height+"%");
    if(div == ".thermo"){$(div).css("background-color", "#6bfc03");}
    else {$(div).css("background-color", "#fc6b03");}
  }

  else if(new_height <= 40){
    $(div).css("height", new_height+"%");
    if(div == ".thermo"){$(div).css("background-color", "#a9fc03");}
    else {$(div).css("background-color", "#fcc203");}
  }
  else if(new_height <= 50){
    $(div).css("height", new_height+"%");
    if(div == ".thermo"){$(div).css("background-color", "#d2fc03");}
    else {$(div).css("background-color", "#f8fc03");}
  }
  else if(new_height <= 60){
    $(div).css("height", new_height+"%");
    if(div == ".thermo"){$(div).css("background-color", "#f8fc03");}
    else { $(div).css("background-color", "#d2fc03");}
  }
  else if(new_height <= 70){
    $(div).css("height", new_height+"%");
    if(div == ".thermo"){$(div).css("background-color", "#fcc203");}
    else { $(div).css("background-color", "#a9fc03");}
  }
  else if(new_height <= 80){
    $(div).css("height", new_height+"%");
    if(div == ".thermo"){$(div).css("background-color", "#fc6b03");}
    else {$(div).css("background-color", "#6bfc03");}
  }
  else if(new_height < 90){
    $(div).css("height", new_height+"%");
    if(div == ".thermo"){$(div).css("background-color", "#fc4503");}
    else {$(div).css("background-color", "#3dfc03");}
  }
  else{
    $(div).css("height", 100+"%"); 
    if(div == ".thermo"){$(div).css("background-color", "#fc0303");}
    else { $(div).css("background-color", "#0ffc03");}
  }
}



