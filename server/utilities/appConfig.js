/**
 * Created by Miles on 4/16/2016.
 */
var fs = require('fs');

var configFileLocation = process.env.HOME + '/config.json';

function conf() {
    var dbInfo;
    var adminEmails;
    
    this.init = function init() {
        var config = JSON.parse(fs.readFileSync(configFileLocation, 'utf-8'));
        
        this.adminEmails = config.adminEmails;
        this.dbInfo      = config.db;
    };
}


exports.conf = new conf();