// functions.js/
var bcrypt = require('bcryptjs'),
    Q = require('q'),
    DB = require('./utilities/db/db'),
    config = require('./config.js'), //config file contains all tokens and other private info
    db = require('orchestrate')(config.db); //config.db holds Orchestrate token

//used in local-signup strategy
exports.localReg = function (username, password) {
    var deferred = Q.defer();
    var hash = bcrypt.hashSync(password, 8);
    var user = {
        "username": username,
        "password": hash,
        "avatar": "http://placehold.it/25x25"
    }
    //check if username is already assigned in our database
    db.get('local-users', username)
        .then(function (result) { //case in which user already exists in db
            console.log('username already exists');
            deferred.resolve(false); //username already exists
        })
        .fail(function (result) {//case in which user does not already exist in db
            console.log(result.body);
            if (result.body.message == 'The requested items could not be found.') {
                console.log('Username is free for use');
                db.put('local-users', username, user)
                    .then(function () {
                        console.log("USER: " + user);
                        deferred.resolve(user);
                    })
                    .fail(function (err) {
                        console.log("PUT FAIL:" + err.body);
                        deferred.reject(new Error(err.body));
                    });
            } else {
                deferred.reject(new Error(result.body));
            }
        });

    return deferred.promise;
};
