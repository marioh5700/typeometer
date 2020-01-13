const Joi = require('joi');
const express = require('express');
var app = express();
var cors = require('cors');
var sqlite3 = require('sqlite3').verbose();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));

let db = new sqlite3.Database('stats.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the stats database.');
});

app.get('/', (req, res) => {
    let sql = `SELECT Wpm wpm FROM wpm_history
           ORDER BY id`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
});

app.post('/postrun', (req, res) => {
    let sql = `INSERT INTO wpm_history (wpm) 
            VALUES (?)`;
    
    db.run(sql, [req.body.wpm], (err) => {
        if (err) {
            return console.log(err.message);
          }

        res.send(`You sent: ${req.body.wpm}`);

        sql = `SELECT COUNT(*) FROM wpm_history AS count`;
        let deleteNumber = 0;

        db.all(sql, [], (err, countObj) => {
            deleteNumber = countObj[0][Object.keys(countObj[0])[0]] - 10;

            sql = "DELETE FROM wpm_history WHERE id IN (SELECT id FROM wpm_history order by id LIMIT " + deleteNumber + ")";

            db.run(sql, [], function(err) {
                if (err) {
                return console.error(err.message);
                }
                console.log(`Row(s) deleted ${this.changes}`);
            });
        });
    });
});

//PORT
//process.env.PORT
const port = 5000;
app.listen(port, () => console.log(`istening on port ${port}...`))