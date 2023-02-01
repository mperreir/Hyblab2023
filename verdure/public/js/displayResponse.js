"use strict";


const initTestSlide = function(){
    // have the button ided as 'showButton' and the text that explains more about the answer as 'longAnswers'
    document.getElementById('showButton').addEventListener('click', showExplications);
    document.getElementById('longAnswers').style.display = 'none';
    
};

const showExplications = function(){
    const longAnswer = document.getElementById('longAnswers');
    if(longAnswer.style.display == 'none')
    {
    document.getElementById('longAnswers').style.display = 'block';
    document.getElementById('showButton').value = 'voir moins';
    }
    else
    {
    document.getElementById('longAnswers').style.display = 'none';
    document.getElementById('showButton').value = 'voir plus';
    }
};
