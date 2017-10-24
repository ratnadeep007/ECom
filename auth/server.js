var express = require('express');
var ejs = require('ejs');
var cors = require('cors');
var getuser = require('./routes/getuser');
var postuser = require('./routes/postuser');
var login = require('./routes/loginuser');
var deleteuser = require('./routes/deleteuser');
var updateuser = require('./routes/updateuser');

var port = 3000;

var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use('/about', express.static('./views/pages/about.html'));
app.use('/using', express.static('./views/pages/using.html'))
app.use('/getuser', getuser);
app.use('/postuser', postuser);
app.use('/deleteuser', deleteuser);
app.use('/updateuser', updateuser);
app.use('/postuser', express.static('./views/index.html'))
app.use('/', express.static('./views'));


app.use(bodyParser.json());

app.listen(port);