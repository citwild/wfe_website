/**
 * Created by milesdowe on 4/20/16.
 */

var bcrypt = require('bcrypt'),
    mysql = require('./utilities/db/mysql-connector').connector;

function accountUtil( config ) {
    var config;

    this.config = config;

    this.saveAccount = function saveAccount(account) {
        //open connection
        db = conf.dbInfo;
        mysql.createConnection(db.host, db.user, db.password, db.database);
        //encrypt sensitive info
        account.password = bcrypt.hashSync( account.password, 10 );
        //save to database
        mysql.insertAccount(account);
        //close
        mysql.closeConnection();
    };

    this.validatePassword = function validatePassword(account) {

    };
}

exports.accountUtil = new accountUtil();