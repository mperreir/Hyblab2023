"use strict";

let currentZoneNumber = 0; // tell if the index of the current zone for the images

// Create all the answers in the element with the ID 'answer'
// the answers are button that shows the explanations related to them
const createAnswers = function (choices) {
    
    document.getElementById('answer'+current_question_number).style = 'block'
    document.getElementById('question-title-text'+current_question_number).style.display = 'inline';


    for (let i = 0; i < choices.length; i++) {
        const input = document.createElement('p')
        input.innerHTML = choices[i].prompt;
        input.addEventListener('click', function () {
            answered(choices[i]);
            document.getElementById('button-answer'+currentquestion_save).style.display = 'none';
        });
        document.getElementById('answer'+current_question_number).append(input);
    }

    document.getElementById('short-answer'+current_question_number).style.display = 'none';

    // long answer part
    const button = document.getElementById('show-button'+current_question_number);
    button.addEventListener('click', () => showExplanations());
    button.style.display = 'none';
    document.getElementById('long-answer'+current_question_number).style.display = 'none';
};

// The function called when a button is pressed to answer a question
// It will swap the question with the answer text and show all the points of the answer
const answered = function (chosen) {
    console.log(chosen)
    document.getElementById('answer'+current_question_number).style.display = 'none';
    document.getElementById('question-title-text'+current_question_number).style.display = 'none';

    document.getElementById('answer-title'+current_question_number).innerHTML = chosen.prompt;
    
    document.getElementById('show-button'+current_question_number).style.display = 'inline-block';

    document.getElementById('short-answer'+current_question_number).style.display = 'block';

    document.getElementById('city'+current_question_number).style.opacity = '0';
    document.getElementById(chosen.image).style.opacity = '100'

    //Evolution of all indics
    changementThermo(chosen.temperature * 10);
    changementHappy(chosen.happiness * 10);
    changementMoney(chosen.money * 10);

    document.getElementById('positiv'+current_question_number).innerHTML = chosen.positive;
   
    document.getElementById('negativ'+current_question_number).innerHTML = chosen.negative;

    const answer = document.getElementById('answer'+current_question_number)

    while (answer.firstChild){
        answer.firstChild.remove()
    }

    const longAnswer = document.getElementById('long-answer'+current_question_number);
    longAnswer.innerHTML = chosen.explanation;
    longAnswer.style.display = 'none';

    if (chosen.nextQuestion !== 3 && chosen.nextQuestion !== 5) { // might be type problems (js is bad)
        currentZoneNumber += 1; // change zone iff not in the parking with the destroying solution and in the place
    }
    swiper.enable();

    currentquestion_save = current_question_number;
    current_question_number = chosen.nextQuestion;
    next_Question = chosen.nextQuestion
    selectedZone[currentZoneNumber] = chosen.image;
};
