"use strict";

const createAnswers = function (choix) {

    const answerBlock = document.getElementById('reponse');

    for (let i = 0; i < choix.length; i++) {
        const input = document.createElement('input')
        input.type = 'button';
        input.value = choix[i].prompt;
        input.addEventListener('click', function () {
            answered(choix[i]);
        });
        answerBlock.append(input);
    }
};

const answered = function (choisi) {
    document.getElementById('question-title-text').textContent = choisi.prompt;
    numero_question = choisi.nextQuestion;
    document.getElementById('showButton').style.display = 'block';

    document.getElementById('short-reponse').textContent = choisi.positive; // create list
    document.getElementById('long-reponse').textContent = choisi.negative;
};