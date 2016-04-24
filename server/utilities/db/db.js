/**
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
    var result;
    this.connPool.getConnection(function (err, conn) {
        if (err) console.log(err);
        conn.query('SELECT * FROM user_account', function (err, rows) {
            if (!err) {
                result = rows;
                console.log('Retrieved rows: ', rows);
            } else {
                console.log('Error retrieving all accounts');
            }
        });
        conn.release();
    });
    return result;
};

// save account to user_account table
DB.prototype.insertAccount = function insertAccount(data) {
    this.connPool.getConnection(function (err, conn) {
        if (err) console.log(err);
        conn.query('INSERT INTO user_account SET ?', data, function(err) {
            if (!err)
                console.log('User info successfully added');
            else
                console.log('Error inserting account; Account info: ', data);
        });
        conn.release();
    });
};

// get password based on email and password combination
DB.prototype.getAccountByEmail = function getAccountByEmail(email) {
    var result;
    this.connPool.getConnection(function (err, conn) {
        if (err) console.log(err);
        conn.query({
            sql   : 'SELECT * FROM user_account WHERE email = ?',
            values: [email]
        }, function(err, rows) {
            if (!err) {
                result = rows;
                console.log('User info successfully retrieved: ', rows);
            } else {
                console.log('Error retrieving account with email: ', email);
            }
        });
        conn.release();
    });
    return result;
};


DB.prototype.closeConnection = function closeConnection() {
    this.connPool.end();
    console.log('MySQL connection successfully closed.');
};

module.exports = DB;