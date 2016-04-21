/**
 * Created by Miles on 4/16/2016.
 */
var fs = require('fs');

var configFileLocation = process.env.HOME + '/config.json';

function configUtil() {
    var dbInfo;
    var adminEmails;
    
    this.init = function init() {
        var config = JSON.parse(fs.readFileSync(configFileLocation, 'utf-8'));
        
        this.adminEmails = config.adminEmails;
        this.dbInfo      = config.db;
    };
}


exports.configUtil = new configUtil();