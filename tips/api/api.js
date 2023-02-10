'use strict';

const app = require( 'express' )();
const path = require('path');
const fs = require('fs');

const dataPath = path.join(__dirname, '/..', '/public/data')

// Sample endpoint that sends the partner's name
app.get('/topic', function ( req, res ) {
    let topic;

    // Get partner's topic from folder name
    topic = path.basename(path.join(__dirname, '/..'))
    // Send it as a JSON object
    res.json({'topic':topic});
} );

app.get('/dialogues/:cle', function (req, res){
    const cle = req.params.cle;
    const dialogues = JSON.parse(fs.readFileSync(path.join(dataPath, 'dialogues.json')));
    
    if(! (cle in dialogues)){
        res.status(401).json('La cle '+cle+' n\'existe pas. Regardez la route /dialoguesCle pour la liste des cles valides.');
        return;
    }
    
    res.status(201).json(dialogues[cle]);
})

app.get('/dialoguesCles', function(req, res){
    const dialogues = JSON.parse(fs.readFileSync(path.join(dataPath, 'dialogues.json')));
    res.json(Object.keys(dialogues));
})

app.get('/introduction', function(req, res){
    res.json(
        JSON.parse(fs.readFileSync(
            path.join(dataPath, 'introduction.json')
        ))
    );
})

app.get('/questions/:theme/:difficulte/:id', function(req, res){
    const theme = req.params.theme;
    const difficulte = req.params.difficulte;
    const id = req.params.id;
    
    const questions = JSON.parse(fs.readFileSync(path.join(dataPath, 'questions.json')));
    
    if(id < 0 || 2 < id){
        res.status(401).json('L\'identifiant doit etre compris entre 0 et 2.')
        return;
    }
    if(!(theme in questions)){
        res.status(401).json('Le theme n\'existe pas.');
        return;
    }
    if(!(difficulte in questions[theme])){
        res.status(401).json('La difficultée n\'existe pas.');
        return;
    }
    res.json(questions[theme][difficulte][id])
})

app.get('/initiative/:theme/:difficulte', function(req, res){
    const theme = req.params.theme;
    const difficulte = req.params.difficulte;

    const initiatives = JSON.parse(fs.readFileSync(path.join(dataPath, 'initiatives.json')));

    if(!(theme in initiatives)){
        res.status(401).json('Le theme n\'existe pas.');
        return;
    }
    if(!(difficulte in initiatives[theme])){
        res.status(401).json('La difficultée n\'existe pas.');
        return;
    }
    res.json(initiatives[theme][difficulte])
})

app.get('/articles/:theme/:difficulte', function(req, res){
    const theme = req.params.theme;
    const difficulte = req.params.difficulte;

    const articles = JSON.parse(fs.readFileSync(path.join(dataPath, 'articles.json')));

    if(!(theme in articles)){
        res.status(401).json('Le theme n\'existe pas.');
        return;
    }
    if(!(difficulte in articles[theme])){
        res.status(401).json('La difficultée n\'existe pas.');
        return;
    }
    res.json(articles[theme][difficulte])
})

app.get('/themes', function(req, res){
    const dialogues = JSON.parse(fs.readFileSync(path.join(dataPath, 'questions.json')));
    res.json(Object.keys(dialogues));
});

// Export our API
module.exports = app;
