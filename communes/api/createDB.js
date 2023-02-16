const fs = require("fs");
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./communes.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the communes.db SQLite database.');
});

db.run(`
    CREATE TABLE IF NOT EXISTS INJMETHANE5  (
        Annee_prod int,
        Prod_methane_annuel float,
        Commune varchar(255),
        Code_insee_epci int,
        Region varchar(255),
        Departement varchar(255),
        Coordonnees int[],
        Production int,
        Production_th float,
        capacite_th float,
        code_insee_region int,
        code_insee_commune int,
        type_site varchar(255),
        code_insee_departement int,
        date_mes varchar(255),
        code_tech_site varchar(255),
        EPCI int,
        reseau varchar(255),
        type_reseau varchar(255),
        nom_site varchar(255),
        PRIMARY KEY (Code_insee_epci, Annee_prod))
`,(err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('table INJMETHANE5 created successfully.');
})

const csv = require('csv-parser');
const results = [];

fs.createReadStream('./data/biomethane.csv')
    .pipe(csv({
        separator: ';',
        mapHeaders: ({header, index}) => header.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(' ', '_')}))
    .on('data', (data) => results.push(data))
    .on('end', () => {
        const stmt = db.prepare("INSERT or IGNORE INTO INJMETHANE5 (Annee_prod, Prod_methane_annuel, Commune, Code_insee_epci, Region, Departement, Coordonnees, Production, Production_th, capacite_th, code_insee_region, code_insee_commune, type_site, code_insee_departement, date_mes, code_tech_site, EPCI, reseau, type_reseau, nom_site) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        results.forEach((row) => {
            const values = Object.values(row);
            stmt.run(values);
        });
        stmt.finalize();
    }
);