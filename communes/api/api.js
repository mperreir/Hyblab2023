'use strict';

const app = require( 'express' )();
const path = require('path');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./communes/api/communes3.db', sqlite3.OPEN_READWRITE, function (err) {
    if (err) {
        console.error(err + '\n' + 'run "npm run createDB" to create a database file');
        // Pas de problème pour faire un appel synchrone ici : on est dans la phase
        // d'initialisation du serveur et pas dans le traitement de requêtes.
        require('process').exit(-1);
    }
});

/*
// Sample endpoint that sends the partner's name
app.get('/topic', function ( req, res ) {
    let topic;

    // Get partner's topic from folder name
    topic = path.basename(path.join(__dirname, '/..'))
    // Send it as a JSON object
    res.json({'topic':topic});
} );
*/
/* app.get('/energy/:name', function ( req, res ) {
    let energy = req.params.name;

    console.log(energy);

    db.all('SELECT * FROM INJMETHANE5', function (err, rows) {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
        else {
            res.json(rows);
        }
    });
}); */


app.get('/energy/:name', function ( req, res ) {
    let energy = req.params.name;
    let requete;
    // console.log(energy);
    if (energy === "la-ville") {
        // SQL Query to get the sum of all Production for every code_insee_commune by department;
        requete = 'SELECT D.Code_departement AS Departement, COUNT(*) AS Nombre, SUM(I.Capacite_production) AS Production FROM INJMETHANE I RIGHT OUTER JOIN DEPARTEMENT D ON I.Code_Departement = D.Code_departement GROUP BY D.Code_departement';
    } else if (energy === "la-mer") {
        requete = 'SELECT D.Code_departement AS Departement, COUNT(*) AS Nombre, SUM(E.Puissance) AS Production FROM EOLIEN E RIGHT OUTER JOIN DEPARTEMENT D ON E.Code_departement = D.Code_departement GROUP BY D.Code_departement';
    } else if (energy === "la-campagne-et-la-foret") {
        requete = 'SELECT B.code_insee_departement AS Departement, B.Production FROM BIOMETHANE B RIGHT OUTER JOIN DEPARTEMENT D ON B.code_insee_departement = D.Code_departement GROUP BY D.Code_departement';
    } else if (energy === "la-friche") {
        // requete = 'SELECT D.Code_departement, COUNT(*), SUM(S.Puissance) FROM DEPARTEMENT D LEFT OUTER JOIN SOLAIRE S ON D.Code_departement = S.Code_departement WHERE S.Date_de_la_donnee LIKE "2021%" GROUP BY D.Code_departement';
        requete = 'SELECT D.Code_departement AS Departement, COUNT(*) AS Nombre, SUM(S.Puissance) AS Production FROM SOLAIRE S RIGHT OUTER JOIN DEPARTEMENT D ON S.Code_departement = D.Code_departement GROUP BY D.Code_departement'
    } else if (energy === "la-riviere") {
        requete = 'SELECT D.Code_departement AS Departement, COUNT(*) AS Nombre, SUM(I.Capacite_production) AS Production FROM INJMETHANE I RIGHT OUTER JOIN DEPARTEMENT D ON I.Code_Departement = D.Code_departement GROUP BY D.Code_departement';
    }

    db.all(requete, [], (err, rows) => {
        // listen for the error event
        process.on('error', (err) => {
            // error handling code
            console.error(err);
        });
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            // console.log(requete);
            res.json(rows);
        }
    });
});





app.get('/energy/:name/:number', function ( req, res ) {
    let energy = req.params.name;
    let num_dep = parseInt(req.params.number);
    let requete;

    if (typeof num_dep === "string") {
        num_dep = parseInt(num_dep);
    }
    if (energy === "biomethane") {
        // SQL Query to get the sum of all Production for every code_insee_commune by department
        // requete = 'SELECT COUNT(*),SUM(BIOMETHANE.Code_insee_epci) FROM BIOMETHANE GROUP BY BIOMETHANE.Departement';
        // requete = 'SELECT SUM(BIOMETHANE.Production), BIOMETHANE.Departement FROM BIOMETHANE GROUP BY BIOMETHANE.Departement';
        // requete = 'SELECT COUNT(BIOMETHANE.code_insee_commune), BIOMETHANE.Commune, BIOMETHANE.code_insee_commune, BIOMETHANE.Production FROM BIOMETHANE INNER JOIN DEPARTEMENT ON BIOMETHANE.code_insee_departement = DEPARTEMENT.Code_departement GROUP BY code_insee_departement HAVING BIOMETHANE.code_insee_departement = "22" ORDER BY BIOMETHANE.Departement';
        requete = 'SELECT DISTINCT BIOMETHANE.code_insee_commune AS Commune, BIOMETHANE2021.Production FROM BIOMETHANE WHERE BIOMETHANE.code_insee_departement = ?';
    } else if (energy === "eolien") {
        requete = 'SELECT DISTINCT EOLIEN.Code_Insee_Commune AS Commune, EOLIEN.Puissance FROM EOLIEN WHERE EOLIEN.Code_Insee_Departement = ?';
    } else if (energy === "igrm") {
        requete = 'SELECT BIOMETHANE.Coordonnees FROM BIOMETHANE WHERE BIOMETHANE.Annee_prod = 2021 AND BIOMETHANE.Region = "Bretagne"';
    } else if (energy === "solaire") {
        requete = 'SELECT DISTINCT SOLAIRE.Code_Insee_Commune AS Commune, SOLAIRE.Puissance FROM SOLAIRE WHERE SOLAIRE.Code_departement = ?';
    } else if (energy === "inj_biomethane") {
        requete = 'SELECT DISTINCT INJMETHANE.Code_Commune AS Commune, INJMETHANE.Capacite_production AS Production FROM INJMETHANE WHERE INJMETHANE.Code_Departement = ?';
    }

    db.all(requete, [num_dep], (err, rows) => {
        // listen for the error event
        process.on('error', (err) => {
            // error handling code
            console.error(err);
        });
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(rows);
        }
    });
});




// Export our API
module.exports = app;