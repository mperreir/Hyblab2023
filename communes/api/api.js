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
        requete = 'SELECT B.code_insee_departement AS Departement, B.Production as Production FROM BIOMETHANE B RIGHT OUTER JOIN DEPARTEMENT D ON B.code_insee_departement = D.Code_departement GROUP BY D.Code_departement';
    } else if (energy === "la-friche") {
        // requete = 'SELECT D.Code_departement, COUNT(*), SUM(S.Puissance) FROM DEPARTEMENT D LEFT OUTER JOIN SOLAIRE S ON D.Code_departement = S.Code_departement WHERE S.Date_de_la_donnee LIKE "2021%" GROUP BY D.Code_departement';
        requete = 'SELECT D.Code_departement AS Departement, COUNT(*) AS Nombre, SUM(S.Puissance) AS Production FROM SOLAIRE S RIGHT OUTER JOIN DEPARTEMENT D ON S.Code_departement = D.Code_departement GROUP BY D.Code_departement'
    } else if (energy === "la-riviere") {
        requete = 'SELECT H.Code_Departement AS Departement, COUNT(*) AS Nombre, SUM(H.Puissance) AS Production FROM HYDRAULIQUE H RIGHT OUTER JOIN DEPARTEMENT D ON H.Code_Departement = D.Code_departement GROUP BY D.Code_departement';
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


app.get('/score/:codepostal', function ( req, res ) {
    let code = req.params.codepostal;
    let epci;

    epci = 'WITH b AS (SELECT Code_insee_epci as epci, SUM(Production) as prod FROM BIOMETHANE GROUP BY Code_insee_epci), e AS (SELECT Code_EPCI as epci, SUM(Puissance) as prod FROM EOLIEN GROUP BY Code_EPCI), h AS ( SELECT Code_EPCI as epci, SUM(Puissance) as prod FROM HYDRAULIQUE GROUP BY Code_EPCI), i AS ( SELECT Code_EPCI as epci, SUM(Capacite_production) as prod FROM INJMETHANE GROUP BY Code_EPCI), s AS ( SELECT Code_EPCI as epci, SUM(Puissance) as prod FROM SOLAIRE GROUP BY Code_EPCI), epci AS ( SELECT DISTINCT siren, total_pop_tot FROM ville), siren_to_score AS ( SELECT v.siren as epci, v.total_pop_tot as pop, CAST(COALESCE(b.prod, 0) as FLOAT) / v.total_pop_tot as b_prod, CAST(COALESCE(e.prod, 0) as FLOAT) / v.total_pop_tot as e_prod, CAST(COALESCE(h.prod, 0) as FLOAT) / v.total_pop_tot as h_prod, CAST(COALESCE(i.prod, 0) as FLOAT) / v.total_pop_tot as i_prod, CAST(COALESCE(s.prod, 0) as FLOAT) / v.total_pop_tot as s_prod FROM epci v LEFT OUTER JOIN b ON v.siren = b.epci LEFT OUTER JOIN e ON v.siren = e.epci LEFT OUTER JOIN h ON v.siren = h.epci LEFT OUTER JOIN i ON v.siren = i.epci LEFT OUTER JOIN s ON v.siren = s.epci), max AS ( SELECT epci, b_prod + e_prod * (SELECT MAX(b_prod) / MAX(e_prod) FROM siren_to_score) + h_prod * (SELECT MAX(b_prod) / MAX(h_prod) FROM siren_to_score) + i_prod * (SELECT MAX(b_prod) / MAX(i_prod) FROM siren_to_score) + s_prod * (SELECT MAX(b_prod) / MAX(s_prod) FROM siren_to_score) as sum FROM siren_to_score ), calcul_score AS ( SELECT epci, (sum * (80 - 40) / 20000) + 40 as score FROM max) SELECT ville.code_postal, calcul_score.score FROM VILLE LEFT JOIN calcul_score ON VILLE.siren = calcul_score.epci WHERE ville.code_postal = ?;';

    db.all(epci, [code], (err, rows) => {
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

    /*
    // Generate random integer between 22 and 84
    let code = req.params.codepostal
    let score = Math.floor(Math.random() * (84 - 70 + 1) + 70);
    if (code.length === 5 && code.split('').every(char => char >= '0' && char <= '9' )) {
        const output = {
            score: score
        }
        res.json(output);
    }
    // Check if all the characters from the code are digits
    res.status(500).send('Internal Server Error');

     */
});




// Export our API
module.exports = app;
