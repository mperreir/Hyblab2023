
let params = new URLSearchParams(window.location.search);
let conversationId = params.get('id') || 1;
let paused = false; // Is the click listener paused for the main line

async function getConversation() {

    response = await fetch(`data/conversation${conversationId}.json`);
    const conversation = await response.json();
    const names = conversation.names;

    let htmlDialogue = document.querySelector('#dialogue');

    let htmlNameLeft = document.createElement('p');
    htmlNameLeft.classList.add('name');
    htmlNameLeft.classList.add('left');
    htmlNameLeft.textContent = conversation.names[0];
    htmlDialogue.appendChild(htmlNameLeft);
    let htmlNameRigth = document.createElement('p');
    htmlNameRigth.classList.add('name');
    htmlNameRigth.classList.add('right');
    htmlNameRigth.textContent = conversation.names[1];
    htmlDialogue.appendChild(htmlNameRigth);


    let onClick = htmlDialogue.addEventListener('click', function () {
        if (!paused) {
            message = conversation.messages.shift() || null;
    
            // If we run out of messages, stop listening to clicks
            if (message == null) {
                htmlDialogue.removeEventListener('click', onClick);
                console.log('end')
                return;
            }
    
            createMessage(message, names, htmlDialogue);
        }
    });

};

function createMessage(message, names, htmlDialogue) {
    switch (message.type) {
        case 'message':
            displayMessage(message, names, htmlDialogue);
            break;
        case 'question':
            displayQuestion(message, names, htmlDialogue);
            break;
        case 'answer':
            displayAnswer(message, names, htmlDialogue);
            break;
        default:
            console.log('Unknown message type');
    };
};

function displayMessage(message, names, htmlDialogue) {
    let htmlMessages = document.createElement('p');
    htmlMessages.classList.add('message');

    const leftName = names[0];
    if (leftName == message.name) {
        htmlMessages.classList.add('left');
    }
    else {
        htmlMessages.classList.add('right');
    }

    htmlMessages.textContent = message.text;
    htmlDialogue.appendChild(htmlMessages);

}

function displayQuestion(message, names, htmlDialogue) {
    let htmlQuestionList = [] // Keep track of all the answers we create
    paused = true;

    // Create each question
    message.question.forEach(questionLine => {
        let question = questionLine[0]; // First message of the sub-conversation is the question

        let htmlQuestion = document.createElement('p');
        htmlQuestion.classList.add('answer');
        htmlQuestion.textContent = question.text;

        htmlDialogue.appendChild(htmlQuestion);

        htmlQuestionList.push(htmlQuestion);    // Add it to the list
        
        let onclick = htmlQuestion.addEventListener('click', function () {
            let onClickSubConv = htmlDialogue.addEventListener('click', function () {
                if (!paused) {
                    message = questionLine.shift() || null;
            
                    // If we run out of messages, stop listening to clicks
                    if (message == null) {
                        htmlDialogue.removeEventListener('click', onClickSubConv);
                        console.log('end sub conv')
                        return;
                    }
            
                    createMessage(message, names, htmlDialogue);
                }
            });

            // Remove all the answers and stop listening to clicks
            htmlQuestionList.forEach(otherQuestion => {
                otherQuestion.removeEventListener('click', onclick);
                otherQuestion.remove();
            });
            paused = false;
        });
    });
}


function displayAnswer(message, names, htmlDialogue) {
    let htmlanswerList = [] // Keep track of all the answers we create
    paused = true;
    // Create each answer
    message.answer.forEach(answer => {
        let htmlAnswer = document.createElement('p');
        htmlAnswer.classList.add('answer');
        htmlAnswer.textContent = answer.text;

        htmlDialogue.appendChild(htmlAnswer);

        htmlanswerList.push(htmlAnswer);    // Add it to the list
        
        let onclick = htmlAnswer.addEventListener('click', function () {
            createMessage(answer, names, htmlDialogue);

            // Remove all the answers and stop listening to clicks
            htmlanswerList.forEach(otherAnswer => {
                otherAnswer.removeEventListener('click', onclick);
                otherAnswer.remove();
            });
            paused = false;
        });
    });
}

getConversation();
