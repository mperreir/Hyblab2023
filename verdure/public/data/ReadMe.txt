Ce document à pour but de vous expliquer comment est organisé le fichier data.json.
Ce fichier permet de modifier les textes des différentes questions ainsi que les réponses associées. 

Organisation du document : 

Le document est organisé en 7 questions :
 1 - Question du boulevard
 2 - Question du parking 1
 3 - Question du parking 2
 4 - Question de le place 1
 5 - Question de la place 2 CAS DE LA RIVIERE 
 6 - Question de la place 3 CAS SANS LA RIVIERE 
 7 - Question de la friche


 Chacunes de ces questions a la même forme : 

Exemple de la question 1 :
  "1": {
    "question": "Que voulez-vous faire sur ce boulevard ?",
    "choices": [{
      "prompt": "Planter des arbres",
      "positive": "<p class=\"positive-titles\">POSITIF</p> <ul><li>Réduction de la température.</li></ul>",
      "negative": "<p class=\"negative-titles\">NEGATIF</p> <ul><li> Rogne un peu de l'espace public.</li></ul>",
      "explanation": "Planter des arbres en ville est une solution pour lutter contre les îlots de chaleur. Les arbres apportent de l’ombre et compensent avec les milieux urbains à base de béton, d’asphalte ou de goudron. L’arbre bloque la lumière du soleil, fait de l’ombre et transpire par ses feuilles, ce qui crée de l’humidité et permet d’assurer une climatisation naturelle.</br>Une étude menée par l’Ademe (Agence de l'environnement et de la maîtrise de l'énergie) en juin 2022 démontre qu’un arbre mature peut évaporer jusqu’à 450 litres d’eau par jour. C’est l’équivalent de cinq climatiseurs qui tourneraient pendant 20h : utile pour rafraîchir une rue !</br>Planter quelques arbres, c’est sympa, mais les effets seront visibles d’ici quelques années. Bon choix cependant !",
      "temperature": -1,
      "happiness": 1,
      "money": -1,
      "nextQuestion": 2,
      "image": "boulevard1"
    },
      {
        "prompt": "Planter beaucoup d’arbres mais rogner sur une voie de circulation",
        "positive": "<p class=\"positive-titles\">POSITIF</p> <ul><li> Réduction rapide de la température.</li> <li>Apporte de l'ombre.</li></ul>",
        "negative": "<p class=\"negative-titles\">NEGATIF</p> <ul><li>Met du temps à avoir un effet significatif.</li> <li>Mécontentement des automobilistes.</li> <li>Une partie des arbres meurt avec le temps.</li></ul>",
        "explanation": "Planter des arbres en ville est une solution pour lutter contre les îlots de chaleur. Mais les racines entrent en conflit avec ce qu’il y a dans le sous-sol : les câbles de fibre optique, les canalisations, parfois les parkings ou les métros… Il faut donc prendre cela en compte et étudier les sols, ce qui est coûteux.</br>En plus, \"un arbre planté dans un sol tassé, pavé, sans place suffisante pour ses racines pousse deux fois moins vite\", explique Marjorie Musy, directrice de recherche au Centre d'études et d'expertise sur les risques, l'environnement, la mobilité et l'aménagement.</br>Prendre de la place sur la route, c’est une solution. Mais gare au mécontentement des adeptes des véhicules à moteur !",
        "temperature": -2,
        "happiness": -1,
        "money": -2,
        "nextQuestion": 2,
        "image": "boulevard2"
      }]
  }

Explication des champs et comment les modifier : 
	- "question" : C'est la question qui est posé. Pour modifier : Simplement changer le texte
     - "choices" : Comporte les différents choix en lien avec la question. Chaque choix est organiser de la même façon
     - "prompt" : C'est le titre de la réponse que l'on choisi. Pour modifier : Simplement changer le texte
     - "positive" : Ce sont les aspects positifs lié à ce choix. Pour modifer : Ne pas toucher à toutes les bornes <p></p><ul><li>..., Modifier le texte entre ces bornes, si l'on souhaite ajouter des points le faire entre des bornes <li>"votre texte"</li> 
        Exemple de modif : "positive": "<p class=\"positive-titles\">LES BONS POINTS</p> <ul><li>Réduction de la température.</li><li>Les gens sont plus heureux.</li></ul>"
     - "negative" : Comme positif mais pour les aspects négatifs
     - "explanation" : C'est la longue explication qui apparaît lorsque l'on fait voir plus. Pour modif : Changer le texte
     - "temperature", "happiness", "money" : variation des indicateurs. Pour modifier : Changer la valeur (à éviter)
     - "nextQuestion" et "image" : NE PAS MODIFIER