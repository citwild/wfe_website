/**
 * Created by milesdowe on 4/20/16.
 */

var bcrypt = require('bcryptjs'),
    Q      = require('q');

var AuthUtil = function () {};

AuthUtil.saveAccount = function saveAccount(data, pool) {
    //encrypt sensitive info
    data.password = bcrypt.hashSync( data.password, 10 );
    pool.insertAccount(account);
};

AuthUtil.validatePassword = function (email, password, mysql) {
    var deferred = Q.defer();
    mysql.getAccountByEmail(email)
        .then(function (rows) {
            // get first (and only) row of user info
            var hash = rows[0].password;
            if (bcrypt.compareSync(password, hash)) {
                deferred.resolve(rows[0]);
            } else {
                deferred.resolve(false);
            }
        });
    console.log('returning deferred promise: ', deferred.promise);
    return deferred.promise;
};
// function validatePassword(data, pool) {
//     var rows = pool.getAccountByEmail(data.email);
//     console.log(rows);
// };

module.exports = AuthUtil;