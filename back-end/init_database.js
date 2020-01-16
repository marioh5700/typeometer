var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('stats.db');

db.serialize(function() {
    db.run("CREATE TABLE if not exists userbase (user_id INTEGER PRIMARY KEY AUTOINCREMENT, username STRING, hash STRING)");
});
db.serialize(function() {
    db.run("CREATE TABLE if not exists wpm_history (id INTEGER PRIMARY KEY AUTOINCREMENT, wpm INTEGER, username INTEGER, FOREIGN KEY (username) REFERENCES userbase (username) ON DELETE SET NULL);");
});

db.close();