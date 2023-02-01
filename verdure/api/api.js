'use strict';

const app = require( 'express' )();
const path = require('path');


// Sample endpoint that sends the partner's name
app.get('/topic', function ( req, res ) {
    let topic;

    // Get partner's topic from folder name
    topic = path.basename(path.join(__dirname, '/..'))
    // Send it as a JSON object
    res.json({'topic':topic});
} );

const prompts = {
    1: {
        "question":"This is the first question",
        "choices": ["This is the first choice of the first question", "This is the second choice of the first question"]
    },
    2: {
        "question":"This is the second question",
        "choices":["This is the first choice of the second question", "This is the second choice of the second question"]
    }
}

app.get('/question/:questionId', function (req, res){
   const questionId = parseInt(req?.params?.questionId, 10);
   const question = prompts[questionId]["question"];
    if(req.query.choiceId != null){
        const choiceId = parseInt(req.query.choiceId, 10)-1;
        const choice = prompts[questionId]["choices"][choiceId];
        res.json({'question':question, 'choice':choice});
   }
    else{
        const choices = prompts[questionId]["choices"];
        res.json({'question':question, 'choices':choices});
    }
});

// Export our API
module.exports = app;
