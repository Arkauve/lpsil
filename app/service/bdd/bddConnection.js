var mysql = require('mysql');
var logger = require('log4js').getLogger('Server');

exports.connection = Connection;

function Connection(){
  var connection = mysql.createConnection({
      host: 'localhost',
      port : '3306',
      user: 'root',
      password: 'admin',
      database: 'pictionnary'
  });
  return connection;
}


var con = Connection();

con.connect();

con.query('SELECT * from users', function (err, rows, fields) {
    if (!err){
      if(rows.length>1)
        logger.info('La requete est excuté sans problème');
      else
        logger.info('ERREUR : la table users est vide !');
      }
    else
        logger.error(err);
});

con.end();
