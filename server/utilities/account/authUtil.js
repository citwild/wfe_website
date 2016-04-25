/**
 * AuthUtil is an authorization utility that is helps validate users
 * when they attempt to log in.
 * 
 * Created by milesdowe on 4/20/16.
 */

var bcrypt = require('bcryptjs'),
    Q      = require('q');

var AuthUtil = function () {};

AuthUtil.saveAccount = function saveAccount(data, db) {
    //encrypt sensitive info
    data.password = bcrypt.hashSync( data.password, 10 );
    db.insertAccount(account);
};

AuthUtil.validatePassword = function (email, password, db) {
    var deferred = Q.defer();
    db.getAccountByEmail(email)
        .then(function (rows) {
            // get first (and only) row of user info
            var hash = rows[0].password;
            if (bcrypt.compareSync(password, hash)) {
                deferred.resolve(rows[0]);
            } else {
                deferred.resolve(false);
            }
        });
    return deferred.promise;
};

AuthUtil.parsePermissions = function (user) {
    var permissions = JSON.parse('[' + user.permissions + ']');
    console.log(permissions);
};

module.exports = AuthUtil;