var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('stats.db');

db.serialize(function() {
    db.run("CREATE TABLE if not exists wpm_history (id INTEGER PRIMARY KEY AUTOINCREMENT, wpm INTEGER)");

});

db.close();