'use strict';

var logger = require('log4js').getLogger('Server');
var userManager = require("./models/userManager.js");
var paintManager = require("./models/paintManager.js");
var session = require('express-session');
var dateformat = require('dateformat');

var express = require('express');
var root = express();

root.use(passport.initialize());

function setSession(row) {
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
}

root.get('/', function(req, res) {
    res.redirect('/login');
});

root.get('/login', function(req, res) {
    res.render('login');
});

root.post('/login', function(req, res) {
    var datas = {
        "login": req.body.username,
        "pwd": req.body.password
    };
    userManager.login(datas, function(clb, row) {
        logger.info("connection:", clb);
        if (clb == true) {
            setSession(row);
            res.redirect('/profile');
        } else
            res.render('login', {
                error: "identifiant ou mot de passe incorrect"
            });
    });
});

root.get('/register', function(req, res) {
    res.render('register');
});

root.post('/register', function(req, res) {
    var datas = {
        "email": req.body.email,
        "password": req.body.password,
        "nom": req.body.nom,
        "prenom": req.body.prenom,
        "tel": req.body.tel,
        "website": req.body.website,
        "sexe": req.body.sexe,
        "birthdate": req.body.birthdate,
        "ville": req.body.ville,
        "taille": req.body.taille,
        "couleur": req.body.couleur,
        "profilepic": req.body.profilepic
    };
    userManager.register(datas, function(clb) {
        logger.info("connection:", clb);
        if (clb == true) {
            userManager.getUser(req.body.email, function(clb, row) {
                if (clb == true) {
                    setSession(row);
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

root.get('/auth/facebook', passport.authenticate('facebook', {
    scope: 'email'
}));

// handle the callback after facebook has authenticated the user
root.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/'
    })
);

//redirection vers le profil de l'utilisateur
root.get('/profile', function(req, res) {
    if (session.open) {
        paintManager.getPaints(session.id, function(clb, rows) {
            paintManager.getFindPaints(session.id, function(clb, paints) {
                if (clb == true) {
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
                        profilepic: session.profilepic,
                        pictures: rows,
                        findedPictures: paints
                    });
                } else
                    res.render('profile', {
                        error: "une erreur s'est produite"
                    });
            });
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
            birthdate: dateformat(session.birthdate, "yyyy-mm-dd"),
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
    var datas = {
        "id": session.id,
        "email": req.body.email,
        "password": req.body.password,
        "nom": req.body.nom,
        "prenom": req.body.prenom,
        "tel": req.body.tel,
        "website": req.body.website,
        "sexe": req.body.sexe,
        "birthdate": req.body.birthdate,
        "ville": req.body.ville,
        "taille": req.body.taille,
        "couleur": req.body.couleur,
        "profilepic": req.body.profilepic
    };
    userManager.editProfile(datas, function(clb) {
        logger.info("connection:", clb);
        if (clb == true) {
            userManager.getUser(req.body.email, function(clb, row) {
                if (clb == true) {
                    setSession(row);
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
        var datas = {
            "id": session.id,
            "drawingCommands": req.body.drawingCommands,
            "picture": req.body.picture,
            "dificulte": req.body.dificulte,
            "reponse": req.body.reponse
        };
        paintManager.savePaint(datas, function(clb) {
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

root.get('/guess', function(req, res) {
    if (session.open) {
        paintManager.getPaint(req.query.idPicture, function(clb, row) {
            if (clb == true) {
                res.render('guess', {
                    id : row.d_id,
                    commands: row.d_commandes
                });
            } else
                res.redirect('/profile');
        });

    } else {
        res.redirect('/login');
    }
})

root.get('/guessPicture', function(req, res) {
    if (session.open) {
        if(req.query.PictureId == session.id)
            res.redirect('/play');
        paintManager.getPaint(req.query.PictureId, function(clb, row) {
            if (clb == true) {
                res.render('guessPicture', {
                    id : req.query.PictureId,
                    commands: row.d_commandes,
                    event : req.body.event
                });
            } else
                res.redirect('/play');
        });

    } else {
        res.redirect('/login');
    }
})

root.post('/guessPicture', function(req, res) {
    if (session.open) {
        paintManager.getPaint(req.body.id, function(clb, row) {
            if (clb == true) {
                if(row.d_reponse==req.body.reponse) {
                    logger.info("Bonne réponse");
                    var datas = {
                        userId : session.id,
                        pictureId : req.body.id
                    };
                    paintManager.setWinner(datas, function (clb) {
                        if(clb)
                            res.redirect('/play');
                        else {
                            res.render('guessPicture', {
                                commands: row.d_commandes,
                                error: "une erreur c'est produite"
                            });
                        }
                    })
                }
                else {
                    logger.info("Mauvaise réponse");
                    res.render('guessPicture', {
                        commands: row.d_commandes,
                        event: "Raté ! mauvaise réponse"
                    });
                }
            }else
                res.redirect('login', {
                    error: "une erreur c'est produite"
                });
        });

    } else {
        res.redirect('/login');
    }
})

root.get('/play', function(req, res) {
    if (session.open) {
        paintManager.getAllPaints(session.id, function(clb, rows) {
            if (clb == true) {
                if(req.body.event)
                    res.render('play', {
                        pictures: rows,
                        event : req.query.event
                    });
                else
                    res.render('play', {
                        pictures: rows
                    });
            } else
                res.redirect('/profile');
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
