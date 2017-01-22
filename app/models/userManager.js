'user strict';
var logger = require('log4js').getLogger('Server');

module.exports = {
    login: function(login, pwd, callback) {
        var res = global.connection.query("Select * from users where u_email='" + login + "' and u_password='" + pwd + "'", function(err, rows) {
            if (!err) {
                logger.info("L'id du resultat de la requête: ", rows[0].u_id);
                callback(rows.length == 1, rows[0]);
            } else {
                logger.info('Une erreur est survenue :  ', err);
                callback(err);
            }
        });
    },
    register: function(email, password, nom, prenom, tel, website, sexe, birthdate, ville, taille, couleur, profilepic, callback) {
        if (nom == "")
            nom = null;
        else {
            nom = "'" + nom + "'";
        }
        if (prenom == "")
            prenom = null;
        else {
            prenom = "'" + prenom + "'";
        }
        if (tel == "")
            tel = null;
        else {
            tel = "'" + tel + "'";
        }
        if (website == "")
            website = null;
        else {
            website = "'" + website + "'";
        }
        if (sexe == "")
            sexe = null;
        else {
            sexe = "'" + sexe + "'";
        }
        if (birthdate == "")
            birthdate = null;
        else {
            birthdate = "'" + birthdate + "'";
        }
        if (ville == "")
            ville = null;
        else {
            ville = "'" + ville + "'";
        }
        if (taille == "")
            taille = null;

        if (couleur == "")
            couleur = null;
        else {
            couleur = "'" + couleur.substring(1) + "'";
        }
        if (profilepic == "")
            profilepic = null;
        else {
            profilepic = "'" + profilepic + "'";
        }
        var res = global.connection.query("INSERT INTO users (u_email, u_password, u_nom, u_prenom, u_tel, u_website, u_sexe, u_birthdate, u_ville, u_taille, u_couleur, u_profilepic) " +
            " VALUES('" + email + "','" + password + "'," + nom + "," + prenom + "," + tel + "," + website + "," + sexe + "," + birthdate + "," + ville + "," + taille + "," + couleur + "," + profilepic + ")",
            function(err, rows) {
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
                logger.info("L'id du resultat de la requête: ", rows[0].u_id);
                logger.info('date :  ', rows[0].birthdate);
                callback(rows.length == 1, rows[0]);
            } else {
                logger.info('Une erreur est survenue :  ', err);
                callback(err);
            }
        });
    },
    editProfile: function(id, email, nom, prenom, tel, website, sexe, birthdate, ville, taille, couleur, profilepic, callback) {
        if (nom == "")
            nom = null;
        else {
            nom = "'" + nom + "'";
        }
        if (prenom == "")
            prenom = null;
        else {
            prenom = "'" + prenom + "'";
        }
        if (tel == "")
            tel = null;
        else {
            tel = "'" + tel + "'";
        }
        if (website == "")
            website = null;
        else {
            website = "'" + website + "'";
        }
        if (sexe == "")
            sexe = null;
        else {
            sexe = "'" + sexe + "'";
        }
        if (birthdate == "")
            birthdate = null;
        else {
            birthdate = "'" + birthdate + "'";
        }
        if (ville == "")
            ville = null;
        else {
            ville = "'" + ville + "'";
        }
        if (taille == "")
            taille = null;

        if (couleur == "")
            couleur = null;
        else {
            couleur = "'" + couleur.substring(1) + "'";
        }
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
            function(err, rows) {
                if (!err) {
                    callback(true);
                } else {
                    logger.info('Une erreur est survenue lors de la requete: ', requete);
                    logger.info('ERREUR : ', err);
                    callback(err);
                }
            });
    }
}
