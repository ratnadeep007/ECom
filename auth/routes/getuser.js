var express = require('express');
var mysql = require('mysql');

var routes = express.Router();

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ratnadeep',
    database: 'site'
});

connection.connect();

routes.get('/',(req, res)=>{
    var userdata = [];
    connection.query('SELECT * from user', (err, rows, fields)=>{
        if(err) throw err;
        for(var i=0; i<rows.length; i++){
            /*var username = [{
                "username": rows[i].username,
                "firstname": rows[i].firstname,
                "lastname": rows[i].lastname,
            }]*/
            userdata.push({
                "username": rows[i].username,
                "firstname": rows[i].firstname,
                "lastname": rows[i].lastname,
                "password": rows[i].password
            }) 
        }
        res.send(userdata);
    });
});


routes.get('/:id', (req,res,next)=>{
    connection.query('SELECT * from user where id=(?)', req.params.id ,(err, rows, fields)=>{
        if(err) throw err;
        var username = {
            "username": rows[0].username,
            "firstname": rows[0].firstname,
            "lastname": rows[0].lastname,
        }
        res.send(username);
    });
});

module.exports = routes;