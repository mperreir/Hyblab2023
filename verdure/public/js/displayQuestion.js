"use strict";

let numero_question = 0;

const questions = async function(){
    let response = await fetch('api/question/{numero_question}');
    const question = await response.json();

    document.getElementById('question-title-text').textContent = question.question;

    createAnswers(question.choices);
};