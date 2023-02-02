"use strict";

const showExplications = function(){
    const longAnswer = document.getElementById('longAnswers');
    if(longAnswer.style.display === 'none')
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
