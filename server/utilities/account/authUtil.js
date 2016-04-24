/**
 * Created by milesdowe on 4/20/16.
 */

var bcrypt = require('bcrypt');

var AuthUtil = function () {
    this.saveAccount = function saveAccount(data, pool) {
        //encrypt sensitive info
        data.password = bcrypt.hashSync( data.password, 10 );
        pool.insertAccount(account);
    };

    this.validatePassword = function validatePassword(account) {

    };
}

module.exports = AuthUtil();