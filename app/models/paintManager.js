'user strict';
var logger = require('log4js').getLogger('Server');
var CryptoJS = require("crypto-js");

module.exports = {
    savePaint: function(datas, callback) {
        var requete = "INSERT INTO drawings (`d_commandes`,`d_image`,`d_reponse`,`d_dificulte`,`d_fk_u_id`)" +
            " VALUES('" + datas.drawingCommands + "','" + datas.picture + "', '" + datas.reponse + "', " + datas.dificulte + ", " + datas.id + ")";
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
    getPaints: function(id, callback) {
        var requete = "SELECT * FROM drawings WHERE `d_fk_u_id` = "+id;
        var res = global.connection.query(requete,
            function(err, rows) {
                if (!err) {
                    callback(true, rows);
                } else {
                    logger.info('Une erreur est survenue lors de la requete: ', requete);
                    logger.info('ERREUR : ', err);
                    callback(err);
                }
            });
    },
    getAllPaints: function(id, callback) {
        var requete = "SELECT * FROM drawings WHERE d_fk_u_id !="+id;
        var res = global.connection.query(requete,
            function(err, rows) {
                if (!err) {
                    callback(true, rows);
                } else {
                    logger.info('Une erreur est survenue lors de la requete: ', requete);
                    logger.info('ERREUR : ', err);
                    callback(err);
                }
            });
    },
    getPaint: function(id, callback) {
        var requete = "SELECT * FROM drawings WHERE `d_id` = "+id;
        var res = global.connection.query(requete,
            function(err, rows) {
                if (!err) {
                    callback(rows.length == 1, rows[0]);
                } else {
                    logger.info('Une erreur est survenue lors de la requete: ', requete);
                    logger.info('ERREUR : ', err);
                    callback(err);
                }
            });
    },
    setWinner : function(datas, callback){
        var requete = "INSERT INTO winner (`w_d_id`,`w_u_id`)" +
            " VALUES('" + datas.pictureId + "','" + datas.userId + "')";
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
    },
    getFindPaints : function(id, callback){
        var requete = "SELECT d.* FROM winner w inner join drawings d on w.w_d_id=d.d_id WHERE `w_u_id` = "+id;
        var res = global.connection.query(requete,
            function(err, rows) {
                if (!err) {
                    callback(true, rows);
                } else {
                    logger.info('Une erreur est survenue lors de la requete: ', requete);
                    logger.info('ERREUR : ', err);
                    callback(err);
                }
            });
    }
}
