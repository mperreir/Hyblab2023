"use strict";

// async init function (because of the awaits on fetches)
const initSlide3 = async function(){
  // Get logo element
  const page = document.querySelector('#third-slide')
  let question = document.querySelector('#question')
    

  page.addEventListener('click', () => {
        console.log("OKK")
        question.style.opacity = 100;
        page.style.backgroundPositionY = "-5vh";
  }
  )

  // Retrieve the partner's topic from our API
  let response = await fetch('api/topic');
  const data1 = await response.json();

  // Get some dummy data
  response = await fetch('data/dummy.json');
  const data2 = await response.json();

  // Update the DOM to insert topic and data
  const footer = document.querySelector('footer p');
  footer.textContent = `Our topic is "${data1.topic}" and here is "${data2.message}" retrieved on the server.`;
};