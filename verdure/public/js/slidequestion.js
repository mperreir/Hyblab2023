"use strict";

// async init function (because of the awaits on fetches)
const initSlideQuestion = async function(){
  // Get logo element
  const page = document.querySelector('#question-slide')
  let question = document.querySelector('#question')
  let city = document.querySelector('.city')
    
 
  page.addEventListener('click', () => {
        question.style.opacity = 100;
        page.style.backgroundPositionY = "-10vh";
        indic.style.opacity= 0;
        city.style.top = "20%";
        swiper.enabled= true;
        changementThermo(10)
        changementMoney(+10)
        changementHappy(-40)
        swiper.enable();
  }
  )


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

  // Animate hyblab logo and make shrink on click
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
    $(div).css("background-color", "#fc0303");
  }

  else if(new_height <= 20){
    $(div).css("height", new_height+"%");
    $(div).css("background-color", "#fc4503");
  }

  else if(new_height <= 30){
    $(div).css("height", new_height+"%");
    $(div).css("background-color", "#fc6b03");
  }

  else if(new_height <= 40){
    $(div).css("height", new_height+"%");
    $(div).css("background-color", "#fcc203");
  }
  else if(new_height <= 50){
    $(div).css("height", new_height+"%");
    $(div).css("background-color", "#f8fc03");
  }
  else if(new_height <= 60){
    $(div).css("height", new_height+"%");
    $(div).css("background-color", "#d2fc03");
  }
  else if(new_height <= 70){
    $(div).css("height", new_height+"%");
    $(div).css("background-color", "#a9fc03");
  }
  else if(new_height <= 80){
    $(div).css("height", new_height+"%");
    $(div).css("background-color", "#6bfc03*");
  }
  else if(new_height < 90){
    $(div).css("height", new_height+"%");
    $(div).css("background-color", "#3dfc03");
  }
  else{
    $(div).css("height", 100+"%");
    $(div).css("background-color", "#0ffc03");
  }
}

