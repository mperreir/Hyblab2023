
let params = new URLSearchParams(window.location.search);
let conversationId = params.get('id') || 1;

async function initConversation() {
    response = await fetch(`data/conversation${conversationId}.json`);
    const conversation = await response.json();
    const names = conversation.names;

    let htmlDialogueHead = document.querySelector('#head');

    let htmlNameLeft = document.createElement('p');
    htmlNameLeft.classList.add('name');
    htmlNameLeft.classList.add('left');
    htmlNameLeft.textContent = conversation.names[0];
    htmlDialogueHead.appendChild(htmlNameLeft);
    let htmlNameRigth = document.createElement('p');
    htmlNameRigth.classList.add('name');
    htmlNameRigth.classList.add('right');
    htmlNameRigth.textContent = conversation.names[1];
    htmlDialogueHead.appendChild(htmlNameRigth);


    let htmlDialogue = document.querySelector('#dialogue');
    let htmlDialogueMessages = document.querySelector('#messages');
    runConversation(conversation.messages, names, htmlDialogue, htmlDialogueMessages);
};

function runConversation(messages, names, htmlDialogue, htmlDialogueMessages) {
    let message;
    let paused = false;

    let onClick = htmlDialogue.addEventListener('click', function () {
        console.log(paused);
        if (!paused) {
            console.log("click");
            paused = true;

            message = messages.shift() || null;

            // If we run out of messages, stop listening to clicks
            if (message == null) {
                htmlDialogue.removeEventListener('click', onClick);
                console.log('end');
                return;
            };

            switch (message.type) {
                case 'message':
                    displayMessage(message, names, htmlDialogue, htmlDialogueMessages);
                    break;
                case 'question':
                    displayQuestion(message, names, htmlDialogue, htmlDialogueMessages);
                    break;
                case 'answer':
                    displayAnswer(message, names, htmlDialogue, htmlDialogueMessages);
                    break;
                default:
                    console.log('Unknown message type');
            };

            paused = false;
        };
    });
};
                    

function displayMessage(message, names, htmlDialogue, htmlDialogueMessages) {
    let htmlMessage = document.createElement('p');
    htmlMessage.classList.add('message');

    const leftName = names[0];
    if (leftName == message.name) {
        htmlMessage.classList.add('left');
    }
    else {
        htmlMessage.classList.add('right');
    };

    htmlMessage.textContent = message.text;
    htmlDialogueMessages.appendChild(htmlMessage);
};

function displayQuestion(message, names, htmlDialogue, htmlDialogueMessages) {
    let htmlQuestionList = []; // Keep track of all the answers we create

    // While there are questions to ask
    //while (message.question.length > 0) {
    for (let i = 0; i < message.question.length; i++) {

    console.log(message.question);
    // Create each question
    message.question.forEach(questionLine => {
        let question = questionLine[0]; // First message of the sub-conversation is the question

        let htmlQuestion = document.createElement('p');
        htmlQuestion.classList.add('answer');
        htmlQuestion.textContent = question.text;

        htmlDialogueMessages.appendChild(htmlQuestion);

        htmlQuestionList.push(htmlQuestion);    // Add it to the list

        // When the question is clicked, start the sub-conversation
        let onclick = htmlQuestion.addEventListener('click', function () {
            // Remove all the answers and stop listening to clicks
            htmlQuestionList.forEach(otherQuestion => {
                otherQuestion.removeEventListener('click', onclick);
                otherQuestion.remove();
            });

            runConversation(questionLine, names, htmlDialogue);

            message.question.splice(message.question.indexOf(questionLine), 1);
        });
    });
    console.log(message.question);
    };
};


function displayAnswer(message, names, htmlDialogue, htmlDialogueMessages) {
    let htmlanswerList = []; // Keep track of all the answers we create
    // Create each answer
    message.answer.forEach(answerLine => {
        let answer = answerLine[0]; // First message of the sub-conversation is the answer

        let htmlAnswer = document.createElement('p');
        htmlAnswer.classList.add('answer');
        htmlAnswer.textContent = answer.text;

        htmlDialogueMessages.appendChild(htmlAnswer);

        let onclick = htmlAnswer.addEventListener('click', function () {
            // Remove all the answers and stop listening to clicks
            htmlanswerList.forEach(otherAnswer => {
                otherAnswer.removeEventListener('click', onclick);
                otherAnswer.remove();
            });

            runConversation(answerLine, names, htmlDialogue);
        });

        htmlanswerList.push(htmlAnswer);    // Add it to the list
    });
};

initConversation();

// Path : http://localhost:8080/resilience/dialogue.html?id=2
