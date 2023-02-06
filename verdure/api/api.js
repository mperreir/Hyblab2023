'use strict';

const app = require('express')();
const path = require('path');


// Sample endpoint that sends the partner's name
app.get('/topic', function (req, res) {
    let topic;

    // Get partner's topic from folder name
    topic = path.basename(path.join(__dirname, '/..'))
    // Send it as a JSON object
    res.json({'topic': topic});
});

const prompts = {
    1: {
        "question": "Que voulez-vous faire sur ce boulevard ?",
        "choices": [{
            "prompt": "Planter des arbres",
            "positive": "POSITIF </br>- Réduction de la température.",
            "negative": "NEGATIF </br>- Ronge de l'espace public.",
            "explanation": "Planter des arbres en ville est une solution pour lutter contre les îlots de chaleur. Les arbres apportent de l’ombre et compensent avec les milieux urbains à base de béton, d’asphalte ou de goudron. L’arbre bloque la lumière du soleil, fait de l’ombre et transpire par ses feuilles, ce qui crée de l’humidité et permet d’assurer une climatisation naturelle.</br>" +
                "Une étude menée par l’Ademe (Agence de l'environnement et de la maîtrise de l'énergie) en juin 2022 démontre qu’un arbre mature peut évaporer jusqu’à 450 litres d’eau par jour. C’est l’équivalent de cinq climatiseurs qui tourneraient pendant 20h : utile pour rafraîchir une rue !</br>" +
                "Planter quelques arbres, c’est sympa, mais les effets seront visibles d’ici quelques années. Bon choix cependant !",
            "temperature": -1,
            "happiness": 1,
            "money": -1,
            "nextQuestion": 2,
            "image": "boul1"
        },
            {
                "prompt": "Planter beaucoup d’arbres mais ronger sur une voie de circulation",
                "positive": "POSITIF </br>- Réduction rapide de la température. </br>- Apporte de l'ombre.",
                "negative": "NEGATIF </br>- Met du temps à avoir un effet significatif </br>- Mécontentement de la population. </br>- Une partie des arbres meurt avec le temps.",
                "explanation": "Planter des arbres en ville est une solution pour lutter contre les îlots de chaleur. Mais les racines entrent en conflit avec ce qu’il y a dans le sous-sol : les câbles de fibre optique, les canalisations, parfois les parkings ou les métros… Il faut donc prendre cela en compte et étudier les sols, ce qui est coûteux.</br>" +
                    "En plus, \"un arbre planté dans un sol tassé, pavé, sans place suffisante pour ses racines pousse deux fois moins vite\", explique à BFMTV.com Marjorie Musy, directrice de recherche au Centre d'études et d'expertise sur les risques, l'environnement, la mobilité et l'aménagement.</br>" +
                    "Prendre de la place sur la route, c’est une solution. Mais gare au mécontentement des adeptes des véhicules à moteur !",
                "temperature": -2,
                "happiness": -1,
                "money": -2,
                "nextQuestion": 2,
                "image": "boul2"
            }]
    },
    2: {
        "question": "Que voulez-vous faire sur ce parking ?",
        "choices": [{
            "prompt": "Planter des arbres directement sur le parking",
            "positive": "POSITIF </br>- Solution rapide",
            "negative": "NEGATIF </br>- Peu efficace",
            "explanation": "Le sol n’a pas été préparé en amont, il est perméable. \"Un arbre planté dans un sol tassé, pavé, sans place suffisante pour ses racines pousse deux fois moins vite, a moitié moins de feuilles et évapore quatre fois moins\", explique à BFMTV.com Marjorie Musy, directrice de recherche au Centre d'études et d'expertise sur les risques, l'environnement, la mobilité et l'aménagement.</br>"+
                "Des jeunes pousses d’arbres vont mettre longtemps à atteindre leur âge adulte. La croissance d’un arbre est comprise entre 30 et 60 cm par an.</br>" +
                "L’idée est là, mais avant d’être efficace contre la canicule, on aura le temps d’en voir passer d’autres.",
            "temperature": -1,
            "happiness": -2,
            "money": -1,
            "nextQuestion": 4,
            "image": "parking1"
        },
            {
                "prompt": "Destruction de la chaussée et déperméabilisation pour planter des arbres",
                "positive": "POSITIF </br>- Les arbres ont de la place",
                "negative": "NEGATIF </br>- Moins de stationnements pour les voitures",
                "explanation": "En voilà une idée! Préparer le sol pour planter correctement les arbres… \"Un arbre planté dans un sol tassé, pavé, sans place suffisante pour ses racines pousse deux fois moins vite, a moitié moins de feuilles et évapore quatre fois moins\", explique à BFMTV.com Marjorie Musy, directrice de recherche au Centre d'études et d'expertise sur les risques, l'environnement, la mobilité et l'aménagement.</br>"+
                    "Il serait donc judicieux de rendre le sol de nouveau perméable, même si sa composition n’est pas toujours adaptée à la croissance des arbres…</br>" +
                    "Et alors que dire des places de parkings supprimées? Coups de klaxons assurés!",
                "temperature": 1,
                "happiness": -2,
                "money": -2,
                "nextQuestion": 3,
                "image": "parking2"
            }]
    },
    3: {
        "question": "Comment planter ces arbres ?",
        "choices": [{
            "prompt": "Avec un parc exotique",
            "positive": [],
            "negative": [],
            "explanation": "On a tous besoin d’évasion. Mais créer un parc exotique, pas sûr que ce soit très productif. On parle alors de verdissement. Ok, c’est agréable de se promener sous des palmiers. Mais la biodiversité ne peut pas s’adapter à ce genre d’espèces. Il s’agit davantage de notions d’urbanismes que de préservation de l’environnement.</br>Au moins, ça attire les curieux !",
            "temperature": -1,
            "happiness": 3,
            "money": -2,
            "nextQuestion": 4,
            "image": null
        },
            {
                "prompt": "Implanter une forêt naturelle",
                "positive": [],
                "negative": [],
                "explanation": "C’est sûrement LA solution la plus efficace pour lutter contre les fortes chaleurs. On parle alors de renaturation, un mot associé à “réparation”. Il désigne le processus par lequel la nature se réinstalle spontanément dans la ville. Il s'agit de restaurer le bon état écologique des sites à travers des opérations d'aménagement, de gestion des espaces et de sensibilisation des usagers.</br>"+
                    "L’Agence régionale de la biodiversité d’Île-de-France distingue trois étapes dans la renaturalisation : la reconquête de la biodiversité, l’adaptation aux changements climatiques et l’amélioration de la santé et du cadre de vie.</br>" +
                    "Objectif : redonner à la nature ses droits !",
                "temperature": -2,
                "happiness": 1,
                "money": 1,
                "nextQuestion": 4,
                "image": null
            }]
    }
}

app.get('/question/:questionId', function (req, res) {
    const questionId = parseInt(req?.params?.questionId, 10);
    const data = prompts[questionId];
    res.json(data);
});

// Export our API
module.exports = app;
