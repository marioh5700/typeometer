const pwhash = require("./pwhash.js");
const Joi = require('joi');
var express = require('express');
var app = express();
var session = require('express-session');
var cors = require('cors');
var sqlite3 = require('sqlite3').verbose();

app.use(session({
    secret: 'not@very@inspiring@:(',
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 3600000}
}));
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'https://typeometer.herokuapp.com'
}));

let db = new sqlite3.Database('stats.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the stats database.');
});

app.get('/', (req, res) => {
    let sql = `SELECT wpm FROM wpm_history WHERE username="${req.session.username}" ORDER BY id`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
});

app.post('/postrun', (req, res) => {
    let sql = `INSERT INTO wpm_history (wpm, username) 
            VALUES (?, ?)`;
    
    db.run(sql, [req.body.wpm, req.session.username], (err) => {
        if (err) {
            return console.log(err.message);
          }

        sql = `SELECT COUNT(*) FROM wpm_history AS count WHERE username="${req.session.username}"`;
        let deleteNumber = 0;

        db.all(sql, [], (err, countObj) => {
            console.log(countObj);
            if (countObj[0][Object.keys(countObj[0])[0]] > 10) {
                deleteNumber = countObj[0][Object.keys(countObj[0])[0]] - 10;
            

                sql = `DELETE FROM wpm_history WHERE username="${req.session.username}" AND id IN (SELECT id FROM wpm_history order by id LIMIT ` + deleteNumber + ")";

                db.run(sql, [], function(err) {
                    if (err) {
                    return console.error(err.message);
                    }
                    console.log(`Row(s) deleted ${this.changes}`);
                });
            } else {
                console.log(`No rows deleted`);
            }
        });
        res.send(`You sent: ${req.body.wpm}`);
    });
});

app.post('/login', (req, res) => {
    let sql = `SELECT username, hash FROM userbase WHERE username="${req.body.username}"`;
    db.get(sql, [], (err, userObj) => {
        if (err) {
            res.send(false);
        } else if (!userObj) {
            res.send(false);
        } else {
            let match = pwhash.compareHash(req.body.password, userObj.hash);
            if (match) {
                req.session.username = userObj.username;
            }
            res.send(match);
        }
    });

});

app.get('/logout', function (req, res) {
    req.session.destroy();
    res.send(false);
});

app.get('/checkLogged', function (req, res) {
    if (typeof req.session.username === 'undefined') {
        res.send(false);
    } else {
        res.send(true);
    }
});

app.post('/register', (req, res) => {
    let sql = `SELECT username FROM userbase WHERE username="${req.body.username}"`;
    db.all(sql, [], (err, userObj) => {
        if (userObj.length > 0) {
            res.send(false);
        } else {
            let sql = `INSERT INTO userbase (username, hash) VALUES (?, ?)`;
            db.run(sql, [req.body.username, pwhash.getHashedPass(req.body.password)], (err) => {
                if (err) {
                    return console.log(err.message);
                }
                res.send(true);
            });
        }
    });

});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`istening on port ${port}...`))