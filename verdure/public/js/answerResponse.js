"use strict";

let currentZoneNumber = 0; // tell if the index of the current zone for the images

// Create all the answers in the element with the ID 'answer'
// the answers are button that shows the explanations related to them
const createAnswers = function (choices) {

    for (let i = 0; i < choices.length; i++) {
        const input = document.createElement('input')
        input.type = 'button';
        input.value = choices[i].prompt;
        input.addEventListener('click', function () {
            answered(choices[i]);
            document.getElementById('button-answer').style.display = 'none';
        });
        document.getElementById('answer').append(input);
    }

    document.getElementById('short-answer').style.display = 'none';

    // long answer part
    const button = document.getElementById('show-button');
    button.addEventListener('click', showExplanations);
    button.style.display = 'none';
    document.getElementById('long-answer').style.display = 'none';
};

// The function called when a button is pressed to answer a question
// It will swap the question with the answer text and show all the points of the answer
const answered = function (chosen) {
    document.getElementById('answer').style.display = 'none';

    document.getElementById('question-title-text').innerHTML = chosen.prompt;
    current_question_number = chosen.nextQuestion;
    document.getElementById('show-button').style.display = 'block';

    document.getElementById('short-answer').style.display = 'block';

    for (let i = 0; i < chosen.positive.length; i++) {
        const positiveLI = document.createElement('li');
        positiveLI.textContent = chosen.positive[i];
        document.getElementById('positive-list').append(positiveLI);
    }

    for (let i = 0; i < chosen.negative.length; i++) {
        const negativeLI = document.createElement('li');
        negativeLI.textContent = chosen.negative[i];
        document.getElementById('negative-list').append(negativeLI);
    }

    const longAnswer = document.getElementById('long-answer');
    longAnswer.innerHTML = chosen.explanation;
    longAnswer.style.display = 'none';

    if (chosen.nextQuestion !== 3 && chosen.nextQuestion !== 5) { // might be type problems (js is bad)
        currentZoneNumber += 1; // change zone iff not in the parking with the destroying solution and in the place
    }
    selectedZone[currentZoneNumber] = chosen.image;
};