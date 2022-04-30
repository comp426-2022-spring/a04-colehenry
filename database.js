const Database = require('better-sqlite3');
const db = new Database('log.db');

//initialized? 
const stmt = db.prepare(`
    SELECT name FROM sqlite_master WHERE type='table' and name='userinfo';`
    );

let row = stmt.get();

//if not already, initialize db
if (row === undefined) {
    console.log('Log db currently empty. Creating log db...')

    const sqlInit = `
        CREATE TABLE accesslog ( id INTEGER NOT NULL PRIMARY KEY, 
            remoteaddr TEXT, remoteuser TEXT, time INTEGER, 
            method TEXT, url TEXT, protocol TEXT, 
            httpversion TEXT, status INTEGER, 
            referer TEXT, useragent TEXT);
    `;

    db.exec(sqlInit)
    console.log('Your database has been initialized.');
} else {
    console.log("Log db exists");
}

module.exports = db;

