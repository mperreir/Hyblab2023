
let params = new URLSearchParams(window.location.search);
let conversationId = params.get('id') || 1;

let htmlDialogue = document.querySelector('#dialogue');
let htmlDialogueHead = document.querySelector('#head');
let htmlDialogueMessages = document.querySelector('#messages');



async function initConversation() {
    response = await fetch(`data/conversation${conversationId}.json`);
    const conversation = await response.json();

    let names = conversation.names;
    names.forEach(name => {
        let htmlName = document.createElement('p');
        htmlName.classList.add('name');
        htmlName.textContent = name
        htmlDialogueHead.appendChild(htmlName);
    });

    runConversation(conversation.messages, names);
};

function runConversation(messages, names) {
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
                    displayMessage(message, names);
                    break;
                case 'question':
                    displayQuestion(message, names);
                    break;
                case 'answer':
                    displayAnswer(message, names);
                    break;
                default:
                    console.log('Unknown message type');
            };

            paused = false;
        };
    });
};
                    

function displayMessage(message, names) {
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

function displayQuestion(message, names) {
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


function displayAnswer(message, names) {
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

            runConversation(answerLine, names);
        });

        htmlanswerList.push(htmlAnswer);    // Add it to the list
    });
};

document.getElementById('left-arrow').addEventListener('click', function () {
    if (window.localStorage.getItem("compt").length == 3) {
        window.localStorage.setItem("popup","true")
    }
    window.location = "./map.html"

});

initConversation();

// Path : http://localhost:8080/resilience/dialogue.html?id=2
