'use strict';

//ar mysql = require('mysql');
var logger = require('log4js').getLogger('Server');
var userManager = require("./models/userManager.js");
var session = require('express-session');
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
    userManager.login(req.body.username,req.body.password, function(clb, row){
      logger.info("connection:",clb);
      if(clb==true){
        session.open = true;
        session.id = row.id;
        session.email = row.email;
        session.nom = row.nom;
        session.prenom = row.prenom;
        session.sexe = row.sexe;
        session.tel = row.tel;
        session.birthdate = row.birthdate;
        session.taille = row.taille;
        session.couleur = row.couleur;
        session.website = row.website;
        session.profilepic = row.profilepic;
        res.redirect('/profile');
      }
      else
        res.render('login',{error:"identifiant ou mot de passe incorrect"});
    });
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

root.post('/register',function(req,res){
  userManager.register(req.body.email, req.body.password, req.body.nom, req.body.prenom, req.body.tel, req.body.website, req.body.sexe, req.body.birthdate, req.body.ville, req.body.taille, req.body.couleur, req.body.profilepic, function(clb){
    logger.info("connection:",clb);
    if(clb==true){
      userManager.getUser(req.body.email,function(clb, row){
        if(clb==true){
          session.open = true;
          session.id = row.id;
          session.email = row.email;
          session.nom = row.nom;
          session.prenom = row.prenom;
          session.sexe = row.sexe;
          session.tel = row.tel;
          session.birthdate = row.birthdate;
          session.taille = ro.taille;
          session.couleur = row.couleur;
          session.website = row.website;
          session.profilepic = row.profilepic;
          res.redirect('/profile');
        }
        else
          res.render('register',{error:"une erreur s'est produite"});
      });
    }
    else
      res.render('register',{error:"une erreur s'est produite"});
  });
});

//redirection vers le profil de l'utilisateur
root.get('/profile', function (req, res) {
  if(session.open){
      res.render('profile',{
        id : session.id,
        email : session.email,
        nom : session.nom,
        prenom : session.prenom,
        sexe : session.sexe,
        tel : session.tel,
        birthdate : session.birthdate,
        website : session.website,
        taille : session.taille,
        couleur : session.couleur,
        profilepic : session.profilepic
      });
  }
  else {
    res.redirect('/login');
  }
});

root.get('/editProfile', function (req, res) {
  if(session.open){
      res.render('editProfile',{
        email : session.email,
        nom : session.nom,
        prenom : session.prenom,
        sexe : session.sexe,
        tel : session.tel,
        birthdate : session.birthdate,
        website : session.website,
        taille : session.taille,
        couleur : session.couleur,
        profilepic : session.profilepic
      });
  }
  else {
    res.redirect('/login');
  }
});

root.get('/logout', function (req, res) {
  session.open=false;
  session.id=null;
  res.redirect('/login');
});

module.exports = root;
