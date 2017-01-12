'use strict';

//ar mysql = require('mysql');
var logger = require('log4js').getLogger('Server');
var userManager = require("./models/userManager.js");
/*
var connection = mysql.createConnection({
    host: 'localhost',
    port : '3306',
    user: 'root',
    password: 'admin',
    database: 'pictionnary'
});*/

var express = require('express');
var root = express();

root.get('/', function(req, res){
    res.redirect('/login');
});

root.get('/login', function(req, res){
    res.render('login');
});

root.post('/login', function (req, res) {
    var result = userManager.login(req.body.username,req.body.password);
    logger.info("resultat de la requête:",result);
    if(result==true)
      res.redirect('/profile');
    else
      res.render('login',{error:"identifiant ou mot de passe incorrect"});
    /*connection.connect();
    connection.query('SELECT nom, prenom from users where email="'+req.body.username+'" and password="'+req.body.password+'"', function (err, rows, fields) {
        if (!err){
            logger.info('Le résultat de la requête:', rows);
            res.redirect('/profile');
          }
        else{
            logger.error(err);
            res.render('login',{error:"identifiant ou mot de passe incorrect"});
          }
    });*/

});

root.get('/register', function (req, res) {
    res.render('register');
});

/* On affiche le profile  */
root.get('/profile', function (req, res) {
      res.render('profile');
});

module.exports = root;
