'user strict';
var logger = require('log4js').getLogger('Server');

module.exports = {
    login: function(login, pwd, callback) {
        var res = global.connection.query("Select * from users where email='" + login + "' and password='" + pwd + "'", function(err, rows) {
            if (!err) {
                callback(rows.length == 1,rows[0]);
            } else{
                logger.info('Une erreur est survenue :  ', err);
                callback(err);
              }
        });
    },
    register: function(email,password,nom,prenom,tel,website,sexe,birthdate,ville,taille,couleur,profilepic,callback){
      if(nom=="")
        nom=null;
      else {
        nom="'"+nom+"'";
      }
      if(prenom=="")
        prenom=null;
      else {
        prenom="'"+prenom+"'";
      }
      if(tel=="")
        tel=null;
      else {
        tel="'"+tel+"'";
      }
      if(website=="")
        website=null;
      else {
        website="'"+website+"'";
      }
      if(sexe=="")
        sexe=null;
      else {
        sexe="'"+sexe+"'";
      }
      if(birthdate=="")
        birthdate=null;
      else {
        birthdate="'"+birthdate+"'";
      }
      if(ville=="")
        ville=null;
      else {
        ville="'"+ville+"'";
      }
      if(taille=="")
        taille=null;

      if(couleur=="")
        couleur=null;
      else{
        couleur="'"+couleur.substring(1)+"'";
      }
      if(profilepic=="")
        profilepic=null;
      else {
        profilepic="'"+profilepic+"'";
      }
      var res = global.connection.query("INSERT INTO users (email, password, nom, prenom, tel, website, sexe, birthdate, ville, taille, couleur, profilepic) "+
      " VALUES('"+email+"','"+password+"',"+nom+","+prenom+","+tel+","+website+","+sexe+","+birthdate+","+ville+","+taille+","+couleur+","+profilepic+")", function(err, rows) {
          if (!err) {
              callback(true);
          } else{
              logger.info('Une erreur est survenue :  ', err);
              callback(err);
            }
      });
    },
    getUser : function(email, callback) {
        var res = global.connection.query("Select * from users where email='" + email + "'", function(err, rows) {
            if (!err) {
                logger.info("L'id du resultat de la requête: ", rows[0].id);
                callback(rows.length == 1,rows[0]);
            } else{
                logger.info('Une erreur est survenue :  ', err);
                callback(err);
              }
        });
    }
}
