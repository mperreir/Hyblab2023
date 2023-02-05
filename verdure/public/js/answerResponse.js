"use strict";

let currentZoneNumber = 0; // tell if the index of the current zone for the images

// Create all the answers in the element with the ID 'answer'
// the answers are button that shows the explanations related to them
const createAnswers = function (choices) {
    
    document.getElementById('answer').style = 'block'
    document.getElementById('question-title-text').style.display = 'inline';


    for (let i = 0; i < choices.length; i++) {
        const input = document.createElement('p')
        input.innerHTML = choices[i].prompt;
        input.addEventListener('click', function () {
            answered(choices[i]);
            document.getElementById('button-answer').style.display = 'none';
        });
        document.getElementById('answer').append(input);
    }

    document.getElementById('short-answer').style.display = 'none';

    // long answer part
    const button = document.getElementById('show-button');
    button.addEventListener('click', () => showExplanations());
    button.style.display = 'none';
    document.getElementById('long-answer').style.display = 'none';
};

// The function called when a button is pressed to answer a question
// It will swap the question with the answer text and show all the points of the answer
const answered = function (chosen) {
    console.log(chosen)
    document.getElementById('answer').style.display = 'none';
    document.getElementById('question-title-text').style.display = 'none';

    document.getElementById('answer-title').innerHTML = chosen.prompt;

    current_question_number = chosen.nextQuestion;
    
    document.getElementById('show-button').style.display = 'inline-block';

    document.getElementById('short-answer').style.display = 'block';

    //Evolution of all indics
    changementThermo(chosen.temperature * 10);
    changementHappy(chosen.happiness * 10);
    changementMoney(chosen.money * 10);

    document.getElementById('positiv').innerHTML = chosen.positive;
   
    document.getElementById('negativ').innerHTML = chosen.negative;

    const answer = document.getElementById('answer')

    while (answer.firstChild){
        answer.firstChild.remove()
    }

    const longAnswer = document.getElementById('long-answer');
    longAnswer.innerHTML = chosen.explanation;
    longAnswer.style.display = 'none';

    if (chosen.nextQuestion !== 3 && chosen.nextQuestion !== 5) { // might be type problems (js is bad)
        currentZoneNumber += 1; // change zone iff not in the parking with the destroying solution and in the place
    }
    selectedZone[currentZoneNumber] = chosen.image;
};
