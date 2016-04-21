/**
 * Created by milesdowe on 4/20/16.
 */

var encryptUtil = require('./utilities/encryptUtil').encryptUtil,
    mysql = require('./utilities/mysql-connector').connector;

function accountUtil( config ) {

    this.saveAccount = function saveAccount( account ) {
        //open connection
        db = config.dbInfo;
        mysql.createConnection(db.host, db.user, db.password, db.database);
        //encrypt sensitive info
        account.password
        //save to db
        //close
        mysql.closeConnection();
    }
}

exports.accountUtil = new accountUtil();