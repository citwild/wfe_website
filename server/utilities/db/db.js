/**
 * DB is a MySQL utility object that contains a pool of database connections
 * and methods to perform queries on the different schemas.
 * 
 * Created by Miles on 4/17/2016.
 */

var mysql = require('mysql');

var DB = function() {};

DB.prototype.connPool = undefined;

DB.prototype.createPool = function createPool(host, user, password, database) {
    try {
        this.connPool = mysql.createPool({
            host     : host,
            user     : user,
            password : password,
            database : database
        });
    } catch(err) {
        console.log("There was an error connecting to the MySQL database: ", err);
    }
};

// for testing/demonstration purposes
DB.prototype.getAllAccounts = function getAllAccounts() {
    var connPool = this.connPool;
    return new Promise(function(success, failure) {
        connPool.getConnection(function (err, conn) {
            if (err) failure(conn);
            conn.query('SELECT * FROM user_account', function (err, rows) {
                if (!err) {
                    success(rows);
                } else {
                    failure(rows);
                }
            });
            conn.release();
        });
    });
};

// save account to user_account table
DB.prototype.insertAccount = function insertAccount(data) {
    var connPool = this.connPool;
    return new Promise(function(success, failure) {
        connPool.getConnection(function (err, conn) {
            if (err) failure(conn);
            conn.query('INSERT INTO user_account SET ?', data, function(err) {
                if (!err)
                    success();
                else
                    failure();
            });
            conn.release();
        });
    });
};

// get password based on email and password combination
DB.prototype.getAccountByEmail = function getAccountByEmail(email) {
    var connPool = this.connPool;
    return new Promise(function(success, failure) {
        connPool.getConnection(function (err, conn) {
            if (err) failure(conn);
            conn.query({
                sql   : 'SELECT * FROM user_account WHERE email = ?',
                values: [email]
            }, function(err, rows) {
                if (!err)
                    success(rows);
                else
                    failure(rows);
            });
            conn.release();
        });
    });
};

DB.prototype.closeConnection = function closeConnection() {
    this.connPool.end();
    console.log('MySQL connection successfully closed.');
};

module.exports = DB;