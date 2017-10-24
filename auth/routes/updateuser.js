var express = require('express');
var routes = express.Router();
var mysql = require('mysql');
var crypto = require('crypto-js/sha1');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ratnadeep',
    database: 'site'
});

connection.connect();

routes.put('/',(req, res)=>{
    res.send("No id provided")
});

routes.put("/:id", (req, res)=>{
    res.send("What to change?");
})

routes.put('/firstname/:id/:firstname', (req, res)=>{
    var id = req.params.id;
    var firstname = req.params.firstname;
    var updateQuery = 'UPDATE user SET firstname=(?) where id=(?)';
    connection.query(updateQuery, [ firstname, id ], (err, rows, fields)=>{
        if(err) throw err;
        console.log(firstname);
        res.send("Okay");
    });
});

routes.put('/password/:id/:password', (req, res)=>{
    var id = req.params.id;
    var password = req.params.password;
    var cryptoPass = crypto(password).toString();
    var updateQuery = 'UPDATE user SET password=(?) where id=(?)';
    connection.query(updateQuery, [ cryptoPass, id ], (err, rows, fields)=>{
        res.send("Okay-password");
    });
});

routes.put('/lastname/:id/:lastname', (req, res)=>{
    var id = req.params.id;
    var lastname = req.params.lastname;
    var updateQuery = 'UPDATE user SET lastname=(?) where id=(?)';
    connection.query(updateQuery, [ lastname, id ], (err, rows, fields)=>{
        res.send("Okay-lastname");
    });
});

routes.put('/username/:id/:username',(req, res)=>{
    var id = req.params.id;
    var username = req.params.username;
    var selectQuery = 'SELECT username FROM user WHERE username=(?)';
    var updateQuery = 'UPDATE user SET username=(?) WHERE id=(?)';
    connection.query(selectQuery, [ username ], (err, rows, field)=>{
        if(rows.length > 0){
            res.send("Username already present");
        } else {
            connection.query(updateQuery, [username, id ],(xerr, xrows, xfields)=>{
                res.send("Okay-user");
            });
        }
    });
});

/*
Add only if needed it makes api more complicated
routes.put('/bulk/:firstname/:lastname/:password', (req, res)=>{

});

routes.put('/bulklp/:lastname/:password', (req, res)=>{
    
});

routes.put('/bulkfp/:firstname/:password', (req, res)=>{
    
});
*/

module.exports = routes;