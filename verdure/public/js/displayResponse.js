"use strict";

// The function used by the button 'show-button' to show or hide the long explanations
const showExplanations = function(){
    const longAnswer = document.getElementById('long-answer'+currentquestion_save);
    if(longAnswer.style.display === 'none')
    {
    document.getElementById('consequences'+currentquestion_save).style.display = 'none'
    document.getElementById('long-answer'+currentquestion_save).style.display = 'block';
    document.getElementById('show-button'+currentquestion_save).value = 'voir moins';
    }
    else
    {
    document.getElementById('consequences'+currentquestion_save).style.display = 'flex';
    document.getElementById('long-answer'+currentquestion_save).style.display = 'none';
    document.getElementById('show-button'+currentquestion_save).value = 'voir plus';
    }
};
