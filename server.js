var express = require('express');
var morgan = require('morgan'); // Charge le middleware de logging
var logger = require('log4js').getLogger('Server');
var favicon = require('serve-favicon'); // Charge le middleware de favicon
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var app = express();

global.connection = require("./app/service/bdd/bddConnection.js").connection();
global.connection.connect();

// aucune session n'est crée
session.open = false;

// config
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined')); // Active le middleware de logging

app.use(express.static(__dirname + '/public')); // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)

/*
app.use(function (req, res) { // Répond enfin
    res.send('Hello world!');
});*/

logger.info('server start');

/* On affiche le formulaire d'enregistrement */

app.use(require('./app/root.js'));

app.listen(1313);
