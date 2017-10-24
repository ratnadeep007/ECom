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

routes.delete('/:id', (req, res)=>{
    var id = req.params.id;
    var deleteQuery = 'DELETE FROM user where id=(?)';

    connection.query(deleteQuery, id, (err, rows, fields)=>{
        if (err) throw err;
        var ret = {
            "reply": true
        }
        res.send(ret);
    });
});

module.exports = routes;