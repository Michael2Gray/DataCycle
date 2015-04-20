/*************************SET-UP**************************/
var express = require('express'),
    jcDecauxAPI = require('./routes/jcDecauxAPI'),
    stations = require('./routes/stations');

var app = express();

/**********************CONFIGURATION**************************/
var port = process.env.PORT || 3004;
app.use(express.static(__dirname + '/public'));

/**********************ROUTE HANDLING**************************/
app.get('/jcDecauxAPI', jcDecauxAPI.findAll);
app.get('/jcDecauxAPI/:number', jcDecauxAPI.findByNumber);
app.get('/stations/:number', stations.findByNumber);

/**********************START APP**************************/
app.listen(port);
console.log('Server Listening on port: ' + port);



