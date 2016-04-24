/**
 * Created by milesdowe on 4/20/16.
 */

var bcrypt = require('bcryptjs');

var AuthUtil = function () {};

AuthUtil.saveAccount = function saveAccount(data, pool) {
    //encrypt sensitive info
    data.password = bcrypt.hashSync( data.password, 10 );
    pool.insertAccount(account);
};

AuthUtil.validatePassword = function validatePassword(data, pool) {
    var rows = pool.getAccountByEmail(data.email);
    console.log(rows);
};

module.exports = AuthUtil();