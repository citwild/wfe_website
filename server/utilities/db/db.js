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
    try {
        this.connPool.getConnection(function (err, connection) {
            connection.query('SELECT * FROM user_account', function (err, rows, fields) {
                if (!err)
                    console.log('Retrieved rows: ', rows);
                else
                    console.log('Error retrieving all accounts');
            });
            connection.release();
        });
    } catch(err) {
        console.log('Failed to get a connection: ', err);
    }
};

// save account to user_account table
DB.prototype.insertAccount = function insertAccount(data) {
    this.connPool.getConnection(function (err, connection) {
        var query = 'INSERT INTO user_account ' +
            '( first_name, last_name, email, password, permissions ) '
            + 'VALUES (\'' + data.firstName + '\', \'' + data.lastName + '\', \''
            + data.email + '\', \'' + data.password + '\', \'' + data.permissions + '\')';

        connection.query(query, function(err, rows, fields) {
            if (!err)
                console.log('User info successfully added');
            else
                console.log('Error inserting account; Account info: ', data);
        });
        connection.release();
    });
};

// get password based on email and password combination
DB.prototype.getAccountByEmailAndPass = function getAccountByEmailAndPass(email, pass) {
    this.connPool.getConnection(function (err, connection) {
        var query = 'SELECT * FROM user_account WHERE email = \'' + email + '\' and password = \'' + pass + '\'';

        connection.query(query, function(err, rows, fields) {
            if (!err)
                console.log('User info successfully retrieved: ', rows);
            else
                console.log('Error retrieving account with email and password: ', email, pass);
        });
        connection.release();
    });
};


DB.prototype.closeConnection = function closeConnection() {
    this.connPool.end();
    console.log('MySQL connection successfully closed.');
};

module.exports = DB;