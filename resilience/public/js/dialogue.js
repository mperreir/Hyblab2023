
let params = new URLSearchParams(window.location.search);
let conversationId = params.get('id') || 1;

let htmlDialogue = document.querySelector('#dialogue');
let htmlDialogueHead = document.querySelector('#head');
let htmlDialogueMessages = document.querySelector('#messages');
var messages = [];
var people = {};
var paused = false;
var conversation = {};
var dict_bkg = new Map();
dict_bkg.set("8", ["Manon.svg", "back_1.svg"]);
dict_bkg.set("9", ["Fab.svg", "back_2.svg"]);
dict_bkg.set("10", ["Catherine.svg", "back_3.svg"]);
dict_bkg.set("11", ["Manon.svg", "back_4.svg"]);
dict_bkg.set("12", ["Manon.svg", "back_5.svg"]);
dict_bkg.set("13", ["Manon.svg", "back_6.svg"]);
dict_bkg.set("14", ["Manon.svg", "back_7.svg"]);
dict_bkg.set("16", ["Manon.svg", "back_8.svg"]);

async function initConversation() {

    fond = document.getElementById("fond");
    perso = document.getElementById("personnage");
    var img_perso = document.createElement("img");
    img_perso.src = "img/perso/".concat(dict_bkg.get(conversationId)[0]);
    perso.appendChild(img_perso);
    var img_fond = document.createElement("img");
    img_fond.src = "img/background_conv/".concat(dict_bkg.get(conversationId)[1]);
    perso.appendChild(img_fond);

    response = await fetch(`data/conversation${conversationId}.json`);
    conversation = await response.json();

    // Saves colors in people dict
    conversation.people.forEach(p => {
        people[p.name] = {
            "background_color": p.background_color,
            "border_color": p.border_color,
            "text_color": p.text_color,
            "side": p.side
        };

        // Add names to the header of the conversation
        let htmlName = document.createElement('p');
        htmlName.classList.add('name');
        htmlName.textContent = p.name;
        htmlName.style.color = p.text_color;
        htmlName.style.backgroundColor = p.background_color;
        htmlName.style.borderColor = p.border_color;
        htmlDialogueHead.appendChild(htmlName);
    });

    let title = document.getElementById("titre");
    let htmlTitle = document.createElement('h1');
    htmlTitle.textContent = conversation.place;
    htmlTitle.style.backgroundColor = conversation.people[0].background_color;
    htmlTitle.style.color = conversation.people[0].text_color;

    title.appendChild(htmlTitle);

    messages = conversation.messages;

    displayMessage(messages.shift());

    runConversation();
}

function runConversation() {
    let message;
    let onClick = htmlDialogue.addEventListener('click', function () {
        if (!paused) {
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
        htmlDialogue.scrollTo(0, dialogue.scrollHeight)
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
                console.log("message.messages", message.messages);
                message = [{
                    "type": "all",
                    "messages": message.messages.filter(subLine => subLine[0].text != subMessage.text)
                }];
                if (message[0].messages.length == 0) {
                    message = []
                }

                subMessageLine = subMessageLine.splice(1) || [];
                messages = [...subMessageLine, ...message, ...messages];
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


function displayMessage(message) {
    let htmlMessage = document.createElement('p');
    htmlMessage.classList.add('message');

    const p = people[message.name];

    htmlMessage.classList.add(p.side);
    htmlMessage.style.backgroundColor = p.background_color;
    htmlMessage.style.color = p.text_color;
    htmlMessage.style.borderColor = p.border_color;


    htmlMessage.textContent = message.text;
    htmlDialogueMessages.appendChild(htmlMessage);

    paused = false;
}

document.getElementById('right-arrow').addEventListener('click', function () {
    if (window.localStorage.getItem("compt").length == 3) {
        window.localStorage.setItem("popup", "true");
    }
    if (window.localStorage.getItem("compt").length == 1) {
        window.localStorage.setItem("first-acquis", "true");
    }
    window.location = "./map.html";

});

/*
document.getElementById("dialogue").addEventListener('scroll', function (that) {
    htmlDialogue.scrollTo(0,1000)
});*/

initConversation();

// Path : http://localhost:8080/resilience/dialogue.html?id=2
