
async function getConversation() {
    conversationId = 1;

    response = await fetch(`data/conversation${conversationId}.json`);
    const conversation = await response.json();
    
    let dialogue = document.querySelector('#dialogue');
    
    messageId = 0;
    let onClick = document.addEventListener('click', function () {
        // If we run out of messages, stop listening to clicks
        if (messageId >= conversation.messages.length) {
            document.removeEventListener('click', onClick);
            console.log('end')
            return;
        }

        console.log(messageId);
        
        message = conversation.messages[messageId];
        
        let htmlMessages = document.createElement('p');
        htmlMessages.classList.add('message');

        const leftName = conversation.names[0];
        console.log(leftName, message.name);
        if (leftName == message.name) {
            htmlMessages.classList.add('left');
        }
        else {
            htmlMessages.classList.add('right');
        }

        htmlMessages.textContent = message.name + ': ' + message.text;
        dialogue.appendChild(htmlMessages);
        
        messageId++;
    });
    
};

getConversation();