var express = require('express');
var mysql = require('mysql');
var crypt = require('bcrypt-nodejs');
var crypto = require('crypto-js/sha1');


var routes = express.Router();

var index = '../views/index.html';

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ratnadeep',
    database: 'site'
});

connection.connect();

routes.post('/', (req, res)=>{
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var username = req.body.username;
    var password = req.body.password;
    var hash = crypto(password).toString();
    var selectQuery = 'SELECT * from user where username=(?)';
    var insertQuery = 'INSERT INTO user(firstname,lastname,username,password) VALUES (?,?,?,?)';
    var countQuery = 'SELECT COUNT(*) AS namesCount FROM user';

    var token = crypt.hashSync(password + username);
    console.log(crypto("Hello").toString());
    console.log(hash);
    console.log(token);
    connection.query(selectQuery, [ username ], (err, rows, fields)=>{
        if(rows.length > 0){
            res.send("Username present");
        }else{
            connection.query(insertQuery, [ firstname, lastname, username, hash ], (err, rows, fields)=>{
                if(err) throw err;
                res.send({
                    "reply": true
                });
            })
        }
    });
});

module.exports = routes;