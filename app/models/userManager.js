'user strict';
var logger = require('log4js').getLogger('Server');

module.exports = {
  login : function (login, pwd){
    global.connection.connect();
    var res = global.connection.query("Select id, nom, prenom from users where email='"+login+"' and password='"+pwd+"'", function (err, rows) {
        if (!err){
          logger.info('Le résultat de la requête: ', rows);
          if(rows.length==1)
            return true;
        }
        if(err)
          logger.info('Une erreur est survenue :  ', err);
        });
    return false;
  }
}
