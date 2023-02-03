"use strict";

// The function used by the button 'show-button' to show or hide the long explanations
const showExplanations = function(){
    const longAnswer = document.getElementById('long-answer');
    if(longAnswer.style.display === 'none')
    {
    document.getElementById('long-answer').style.display = 'block';
    document.getElementById('show-button').value = 'voir moins';
    }
    else
    {
    document.getElementById('long-answer').style.display = 'none';
    document.getElementById('show-button').value = 'voir plus';
    }
};
