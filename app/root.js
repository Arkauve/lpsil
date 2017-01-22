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

root.get('/', function(req, res) {
    res.redirect('/login');
});

root.get('/login', function(req, res) {
    res.render('login');
});

root.post('/login', function(req, res) {
    userManager.login(req.body.username, req.body.password, function(clb, row) {
        logger.info("connection:", clb);
        if (clb == true) {
            session.open = true;
            session.id = row.u_id;
            session.email = row.u_email;
            session.nom = row.u_nom;
            session.prenom = row.u_prenom;
            session.sexe = row.u_sexe;
            session.tel = row.u_tel;
            session.birthdate = row.u_birthdate;
            session.ville = row.u_ville;
            session.taille = row.u_taille;
            session.couleur = row.u_couleur;
            session.website = row.u_website;
            session.profilepic = row.u_profilepic;
            res.redirect('/profile');
        } else
            res.render('login', {
                error: "identifiant ou mot de passe incorrect"
            });
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

root.get('/register', function(req, res) {
    res.render('register');
});

root.post('/register', function(req, res) {
    userManager.register(req.body.email, req.body.password, req.body.nom, req.body.prenom, req.body.tel, req.body.website, req.body.sexe, req.body.birthdate, req.body.ville, req.body.taille, req.body.couleur, req.body.profilepic, function(clb) {
        logger.info("connection:", clb);
        if (clb == true) {
            userManager.getUser(req.body.email, function(clb, row) {
                if (clb == true) {
                    session.open = true;
                    session.id = row.u_id;
                    session.email = row.u_email;
                    session.nom = row.u_nom;
                    session.prenom = row.u_prenom;
                    session.sexe = row.u_sexe;
                    session.tel = row.u_tel;
                    session.birthdate = row.u_birthdate;
                    session.ville = row.u_ville;
                    session.taille = row.u_taille;
                    session.couleur = row.u_couleur;
                    session.website = row.u_website;
                    session.profilepic = row.u_profilepic;
                    res.redirect('/profile');
                } else
                    res.render('register', {
                        error: "une erreur s'est produite"
                    });
            });
        } else
            res.render('register', {
                error: "une erreur s'est produite"
            });
    });
});

//redirection vers le profil de l'utilisateur
root.get('/profile', function(req, res) {
    if (session.open) {
        res.render('profile', {
            id: session.id,
            email: session.email,
            nom: session.nom,
            prenom: session.prenom,
            sexe: session.sexe,
            tel: session.tel,
            birthdate: session.birthdate,
            website: session.website,
            ville: session.ville,
            taille: session.taille,
            couleur: session.couleur,
            profilepic: session.profilepic
        });
    } else {
        res.redirect('/login');
    }
});

root.get('/editProfile', function(req, res) {
    if (session.open) {
        res.render('editProfile', {
            id: session.id,
            email: session.email,
            nom: session.nom,
            prenom: session.prenom,
            sexe: session.sexe,
            tel: session.tel,
            birthdate: session.birthdate,
            website: session.website,
            ville: session.ville,
            taille: session.taille,
            couleur: session.couleur,
            profilepic: session.profilepic
        });
    } else {
        res.redirect('/login');
    }
});

root.post('/editProfile', function(req, res) {
    userManager.editProfile(session.id, req.body.email, req.body.nom, req.body.prenom, req.body.tel, req.body.website, req.body.sexe, req.body.birthdate, req.body.ville, req.body.taille, req.body.couleur, req.body.profilepic, function(clb) {
        logger.info("connection:", clb);
        if (clb == true) {
            userManager.getUser(req.body.email, function(clb, row) {
                if (clb == true) {
                    session.open = true;
                    session.id = row.u_id;
                    session.email = row.u_email;
                    session.nom = row.u_nom;
                    session.prenom = row.u_prenom;
                    session.sexe = row.u_sexe;
                    session.tel = row.u_tel;
                    session.birthdate = row.u_birthdate;
                    session.ville = row.u_ville;
                    session.taille = row.u_taille;
                    session.couleur = row.u_couleur;
                    session.website = row.u_website;
                    session.profilepic = row.u_profilepic;
                    res.redirect('/profile');
                } else
                    res.render('editProfile', {
                        error: "une erreur s'est produite"
                    });
            });
        } else {
            if (session.open) {
                res.render('editProfile', {
                    id: session.id,
                    email: session.email,
                    nom: session.nom,
                    prenom: session.prenom,
                    sexe: session.sexe,
                    tel: session.tel,
                    birthdate: session.birthdate,
                    website: session.website,
                    ville: session.ville,
                    taille: session.taille,
                    couleur: session.couleur,
                    profilepic: session.profilepic,
                    error: "une erreur s'est produite"
                });
            } else {
                res.redirect('/login');
            }
        }
    });
});

root.get('/paint', function(req, res) {
    if (session.open) {
        res.render('paint', {
            id: session.id,
            couleur: session.couleur
        });
    } else {
        res.redirect('/login');
    }
});

root.post('/paint', function(req, res) {
    if (session.open) {
      userManager.savePaint(session.id, req.body.drawingCommands, req.body.picure, function(clb) {
          if (clb == true) {
              logger.info("--sauvegarde de la painture--");
              res.redirect('/profile');
          } else
              res.render('paint', {
                  id: session.id,
                  couleur: session.couleur,
                  error: "une erreur s'est produite"
                });
        });
    } else {
        res.redirect('/login');
    }
});

root.get('/logout', function(req, res) {
    session.open = false;
    session.id = null;
    res.redirect('/login');
});

module.exports = root;
