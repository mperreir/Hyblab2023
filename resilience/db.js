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
                fromId: (id) => dbget('SELECT * FROM user WHERE id = ?', [id]),

                getAll: () => dball('SELECT * FROM vote ORDER BY nb DESC'),

                addVote: (id) => dbrun('UPDATE vote SET nb = nb + 1 WHERE id = ?', [id])
            }
        } 
    }

    function dbget(sql, ...params) {
        debugLine(sql, ...params);
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
        debugLine(sql, ...params);
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
        debugLine(sql, ...params);
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
