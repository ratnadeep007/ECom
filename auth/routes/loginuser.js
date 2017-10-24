var express = require('express');
var routes = express.Router();
var mysql = require('mysql');
var crypt = require('bcrypt-nodejs');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ratnadeep',
    database: 'site'
});

connection.connect();

routes.get('/:username/:password', (req, res)=>{
    var usrPass = 'SELECT token from user where username=(?) and password=(?)';
    var username = req.params.usernam;
    var hash =  crypt.hashSync(req.params.password);
    console.log(hash);

    connection.query(usrPass, [ username, hash ], (err, rows, fields)=>{
        if(err) throw console.log('error');
        if(rows.length < 0){
            res.send('error');
        }else{
            var token = {
                "username": rows[0].username,
                "firstname": rows[0].firstname,
                "lastname": rows[0].lastname
            }
            res.send(token);
        }
    });
});


routes.get('/:id',(req, res,next)=>{
    var idQuery = 'SELECT token from user where id=(?)';

    connection.query(idQuery, req.params.id, (err, rows, fields)=>{
        if(err) console.log('error');
        if(rows.length < 0){
            res.send("error");
        }else{
            var token = {
                "token": rows[0].token
            }
            res.send(token);
        }
    });
});

module.exports = routes;