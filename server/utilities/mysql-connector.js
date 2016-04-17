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
    
    this.queryAllAccounts = function queryAllAccounts() {
        this.connection.query('SELECT * from user_account', function(err, rows, fields){
            if (!err) {
                console.log('Retrieved rows: ', rows);
            } else {
                console.log('Error performing query.');
            }
        });
    };

    this.closeConnection = function closeConnection() {
        this.connection.end();
        console.log('MySQL connection successfully closed.');
    }
}

exports.connector = new connector();