/**
 * Created by Miles on 4/17/2016.
 */

var mysql = require('mysql');

function connector() {
    var connection = undefined;
    this.createConnection = function createConnection(host, user, password, database) {
        try {
            this.connection = mysql.createConnection({
                host     : host,
                user     : user,
                password : password,
                database : database
            });
            this.connection.connect();
        } catch(err) {
            console.log("There was an error connecting to the MySQL database: ", err);
        }
    };

    // for testing/demonstration purposes
    this.queryAllAccounts = function queryAllAccounts() {
        this.connection.query('SELECT * FROM user_account', function(err, rows, fields) {
            if (!err)
                console.log('Retrieved rows: ', rows);
            else
                console.log('Error performing query.');
        });
    };

    // save account to user_account table
    this.insertAccount = function insertAccount() {
        this.connection.query('INSERT INTO', function(err, rows, fields) {

        });
    };

    // get password based on email, validate password?

    this.closeConnection = function closeConnection() {
        this.connection.end();
        console.log('MySQL connection successfully closed.');
    }
}

exports.connector = new connector();