
let params = new URLSearchParams(window.location.search);
let conversationId = params.get('id') || 1;

let htmlDialogue = document.querySelector('#dialogue');
let htmlDialogueHead = document.querySelector('#head');
let htmlDialogueMessages = document.querySelector('#messages');
var messages = [];
var names = [];
var paused = false;
var conversation = {};

async function initConversation() {
    response = await fetch(`data/conversation${conversationId}.json`);
    conversation = await response.json();

    let title = document.getElementById("titre");
    let htmlTitle = document.createElement('h1');
    htmlTitle.textContent = conversation.place;
    title.appendChild(htmlTitle);

    names = conversation.names;
    await names.forEach(name => {
        let htmlName = document.createElement('p');
        htmlName.classList.add('name');
        htmlName.textContent = name
        htmlDialogueHead.appendChild(htmlName);
    });

    messages = conversation.messages;

    displayMessage(messages.shift());

    runConversation();
}

function runConversation() {
    let message;
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
                    displayMessage(message);
                    break;
                case 'one':
                    choose(message, false);
                    break;
                case 'all':
                    choose(message, true);
                    break;
                default:
                    console.log('Unknown message type : ' + message.type);
            };
        };
        let dialogue = document.getElementById("dialogue")
        htmlDialogue.scrollTo(0,dialogue.scrollHeight)
    });
};
              
function choose(message, all) {
    let htmlSubMessageList = []; // Keep track of all the answers we create
    // Create each answer
    let htmlMessage = document.createElement('div');
    htmlMessage.classList.add('choices');
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
            
            


            if (all) {
                if (message.messages.size == 1) {
                    message = message.messages;
                }
                else {
                    message = {
                        "type": "all",
                        "messages": message.messages.filter(subLine => subLine[0].text != subMessage.text)
                    };
                };
                subMessageLine = subMessageLine.splice(1) || [];
                messages = [...subMessageLine, message, ...messages];
            }
            else {
                subMessageLine = subMessageLine.splice(1) || [];
                messages = [...subMessageLine, ...messages];
            };
            
            if (message == []) message = null;
        });

        htmlSubMessageList.push(htmlMessage);    // Add it to the list
    });
};


function displayMessage(message, json) {
    let htmlMessage = document.createElement('p');
    htmlMessage.classList.add('message');

    const leftName = names[0];
    if (leftName === message.name) {
        htmlMessage.classList.add('left');
        htmlMessage.style.backgroundColor= conversation.background_color;
        htmlMessage.style.color= conversation.text_color;

    }
    else {
        htmlMessage.classList.add('right');
    }

    htmlMessage.textContent = message.text;
    htmlDialogueMessages.appendChild(htmlMessage);

    paused = false;
}

document.getElementById('right-arrow').addEventListener('click', function () {
    if (window.localStorage.getItem("compt").length == 3) {
        window.localStorage.setItem("popup","true")
    }
    window.location = "./map.html"

});

/*
document.getElementById("dialogue").addEventListener('scroll', function (that) {
    htmlDialogue.scrollTo(0,1000)
});*/

initConversation();

// Path : http://localhost:8080/resilience/dialogue.html?id=2
