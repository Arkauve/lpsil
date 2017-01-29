'user strict';
var logger = require('log4js').getLogger('Server');
var CryptoJS = require("crypto-js");

module.exports = {
    // fonction de vérification du login et du mot de passe
    // datas correspond à un json avec les données (le login et le mot de passe)
    // mot de passe hashé en SHA256 dans la base de données
    login: function(datas, callback) {
        var login = datas.login;
        var pwd = datas.pwd;
        var requete = "Select * from users where u_email='" + login +
            "' and u_password='" + CryptoJS.SHA256(pwd) + "'";
        var res = global.connection.query(requete, function(err, rows) {
            if (!err) {
                callback(rows.length == 1, rows[0]);
            } else {
                logger.info('Une erreur est survenue :  ', err);
                callback(err);
            }
        });
    },
    register: function(datas, callback) {
        var email = datas.email;
        var password = datas.password;
        var nom = datas.nom;
        if (nom == "")
            nom = null;
        else {
            nom = "'" + nom + "'";
        }
        var prenom = datas.prenom;
        if (prenom == "")
            prenom = null;
        else {
            prenom = "'" + prenom + "'";
        }
        var tel = datas.tel;
        if (tel == "")
            tel = null;
        else {
            tel = "'" + tel + "'";
        }
        var website = datas.website;
        if (website == "")
            website = null;
        else {
            website = "'" + website + "'";
        }
        var sexe = datas.sexe;
        if (sexe == "")
            sexe = null;
        else {
            sexe = "'" + sexe + "'";
        }
        var birthdate = datas.birthdate;
        if (birthdate == "")
            birthdate = null;
        else {
            birthdate = "'" + birthdate + "'";
        }
        var ville = datas.ville;
        if (ville == "")
            ville = null;
        else {
            ville = "'" + ville + "'";
        }
        var taille = datas.taille;
        if (taille == "")
            taille = null;
        var couleur = datas.couleur;
        if (couleur == "")
            couleur = null;
        else {
            couleur = "'" + couleur.substring(1) + "'";
        }
        var profilepic = datas.profilepic;
        if (profilepic == "")
            profilepic = null;
        else {
            profilepic = "'" + profilepic + "'";
        }
        var res = global.connection.query("INSERT INTO users (u_email, u_password, u_nom, u_prenom, u_tel, u_website, u_sexe, u_birthdate, u_ville, u_taille, u_couleur, u_profilepic) " +
            " VALUES('" + email + "','" + CryptoJS.SHA256(password) + "'," + nom + "," + prenom + "," + tel + "," + website + "," + sexe + "," + birthdate + "," + ville + "," + taille + "," + couleur + "," + profilepic + ")",
            function(err) {
                if (!err) {
                    callback(true);
                } else {
                    logger.info('Une erreur est survenue :  ', err);
                    callback(err);
                }
            });
    },
    getUser: function(email, callback) {
        var res = global.connection.query("Select * from users where u_email='" + email + "'", function(err, rows) {
            if (!err) {
                if (rows.length == 1)
                    logger.info("L'id du resultat de la requête: ", rows[0].u_id);
                callback(rows.length == 1, rows[0]);
            } else {
                logger.info('Une erreur est survenue :  ', err);
                callback(err);
            }
        });
    },
    editProfile: function(datas, callback) {
        var id = datas.id;
        var email = datas.email;
        var nom = datas.nom;
        if (nom == "")
            nom = null;
        else {
            nom = "'" + nom + "'";
        }
        var prenom = datas.prenom;
        if (prenom == "")
            prenom = null;
        else {
            prenom = "'" + prenom + "'";
        }
        var tel = datas.tel;
        if (tel == "")
            tel = null;
        else {
            tel = "'" + tel + "'";
        }
        var website = datas.website;
        if (website == "")
            website = null;
        else {
            website = "'" + website + "'";
        }
        var sexe = datas.sexe;
        if (sexe == "")
            sexe = null;
        else {
            sexe = "'" + sexe + "'";
        }
        var birthdate = datas.birthdate;
        if (birthdate == "")
            birthdate = null;
        else {
            birthdate = "'" + birthdate + "'";
        }
        var ville = datas.ville;
        if (ville == "")
            ville = null;
        else {
            ville = "'" + ville + "'";
        }
        var taille = datas.taille;
        if (taille == "")
            taille = null;
        var couleur = datas.couleur;
        if (couleur == "")
            couleur = null;
        else {
            couleur = "'" + couleur.substring(1) + "'";
        }
        var profilepic = datas.profilepic;
        if (profilepic == "")
            profilepic = null;
        else {
            profilepic = "'" + profilepic + "'";
        }
        var requete = "Update users SET u_email='" + email + "', u_nom=" + nom + ", u_prenom=" + prenom + ", u_tel=" + tel +
            ", u_website=" + website + ", u_sexe=" + sexe + ", u_birthdate=" + birthdate + ", u_ville=" + ville +
            ", u_taille=" + taille + ", u_couleur=" + couleur + ", u_profilepic=" + profilepic +
            " WHERE u_id=" + id;
        var res = global.connection.query(requete,
            function(err) {
                if (!err) {
                    callback(true);
                } else {
                    logger.info('Une erreur est survenue lors de la requete: ', requete);
                    logger.info('ERREUR : ', err);
                    callback(err);
                }
            });
    },
    findFacebook: function(datas, callback) {
        var facebook_id = datas.facebook_id;
        var requete = "SELECT u.* " +
            " From facebook f inner join users u on f.f_u_id = u.u_id " +
            " WHERE f.f_id=" + facebook_id;
        var res = global.connection.query(requete,
            function(err, rows) {
                if (!err) {
                    if (rows.length == 1)
                        callback(true, rows[0]);
                    else
                        callback(false);
                } else {
                    logger.info('Une erreur est survenue lors de la requete: ', requete);
                    logger.info('ERREUR : ', err);
                    callback(err);
                }
            }
        );
    },
    registerFacebook: function(datas, callback) {
        var email = datas.facebook_email;
        var nom = datas.facebook_name;
        var prenom = datas.facebook_firstname;
        var profilepic = datas.facebook_photo;
        var facebook_id = datas.facebook_id;
        var facebook_token = datas.facebook_token;

        var requete = "INSERT INTO users (u_email, u_nom, u_prenom) " +
            " VALUES('" + email + "','" + nom + "','" + prenom + "')";
        var u_id;
        var user;
        var res = global.connection.query(requete,
            function(err, rows) {
                if (!err) {
                  u_id = rows.insertId;
                  logger.info("Enregistrement réussi", u_id);
                  console.log("id : ", u_id);
                  var requete = "INSERT INTO facebook (f_id, f_u_id) " +
                      " VALUES('" + facebook_id + "'," + u_id + ")";
                  var res = global.connection.query(requete,
                      function(err, rows) {
                          if (!err) {
                              callback(null, u_id);
                          } else {
                              logger.info('Une erreur est survenue lors de la requete: ', requete);
                              logger.info('ERREUR : ', err);
                              callback(err);
                          }
                      }
                  );
                } else {
                    logger.info('Une erreur est survenue lors de la requete: ', requete);
                    logger.info('ERREUR : ', err);
                    callback(err);
                }
            }
        );
    }
}
