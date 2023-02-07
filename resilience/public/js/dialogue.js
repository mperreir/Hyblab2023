
let params = new URLSearchParams(window.location.search);
let conversationId = params.get('id') || 1;

let htmlDialogue = document.querySelector('#dialogue');
let htmlDialogueHead = document.querySelector('#head');
let htmlDialogueMessages = document.querySelector('#messages');
var messages = [];
var names = [];


async function initConversation() {
    response = await fetch(`data/conversation${conversationId}.json`);
    const conversation = await response.json();

    names = conversation.names;
    await names.forEach(name => {
        let htmlName = document.createElement('p');
        htmlName.classList.add('name');
        htmlName.textContent = name
        htmlDialogueHead.appendChild(htmlName);
    });

    messages = conversation.messages;
    runConversation();
};

function runConversation() {
    let message;
    let paused = false;

    let onClick = htmlDialogue.addEventListener('click', function () {
        console.log(paused);
        if (!paused) {
            console.log("click");
            paused = true;

            console.log(messages);
            
            message = messages.shift() || null;

            // If we run out of messages, stop listening to clicks
            if (message == null) {
                htmlDialogue.removeEventListener('click', onClick);
                console.log('end');
                return;
            };

            switch (message.type) {
                case 'message':
                    displayMessage(message);
                    break;
                case 'one':
                    messages = choose(message, false);
                    break;
                case 'all':
                    messages = choose(message, true);
                    break;
                default:
                    console.log('Unknown message type');
            };

            console.log(messages);

            paused = false;
        };
    });
};
              
function choose(message, all) {
    let htmlSubMessageList = []; // Keep track of all the answers we create
    // Create each answer
    message.messages.forEach(subMessageLine => {
        let subMessage = subMessageLine[0]; // First message of the sub-conversation is the answer

        let htmlMessage = document.createElement('p');
        htmlMessage.classList.add('choice');
        htmlMessage.textContent = subMessage.text;

        htmlDialogueMessages.appendChild(htmlMessage);

        let onclick = htmlMessage.addEventListener('click', function () {

            htmlSubMessageList.forEach(otherMessage => {
                otherMessage.removeEventListener('click', onclick);
                otherMessage.remove();
            });

            displayMessage(subMessage);
            console.log("subMessageLine", subMessageLine);
            console.log("messages", messages);
            
            let newMessages;
            if (all) {
                newMessages = [...subMessageLine.shift(), ...messages];
            }
            else {
                newMessages = [...subMessageLine, ...messages];
            }
            messages = newMessages;
            console.log("messages", messages);

        });

        htmlSubMessageList.push(htmlMessage);    // Add it to the list
    });
}

          
function displayMessage(message) {
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

document.getElementById('left-arrow').addEventListener('click', function () {
    if (window.localStorage.getItem("compt").length == 3) {
        window.localStorage.setItem("popup","true")
    }
    window.location = "./map.html"

});

initConversation();

// Path : http://localhost:8080/resilience/dialogue.html?id=2
