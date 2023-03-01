'use strict';

const sqlite3 = require('sqlite3');

let singleton = null;
let db;

module.exports = function (param) {
    if (!singleton) {
        db = new sqlite3.Database(param, (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Connect to the database');
        });

        singleton = {
            Vote: {
                fromId: (id) => dbget('SELECT * FROM vote WHERE id = ?', [id]),

                getAll: () => dball('SELECT * FROM vote ORDER BY sumNote/(nbVote+1) DESC'),

                addVote: (id, note) => dbrun('UPDATE vote SET nbVote = nbVote + 1, sumNote = sumNote + note WHERE id = ?', [id])
            }
        } 
    }

    function dbget(sql, ...params) {
        return new Promise(function (resolve, reject) {
            db.prepare(sql).get(...params, function (err, row) {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    }

    function dball(sql, ...params) {
        return new Promise(function (resolve, reject) {
            db.prepare(sql).all( ...params, function (err, row) {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    }

    function dbrun(sql, ...params) {
        return new Promise(function (resolve, reject) {
            db.prepare(sql).run( ...params, function (err) {
                if (err) {
                    reject(err);
                }
                resolve({success: true});
            });
        });
    }

    return singleton;
};
