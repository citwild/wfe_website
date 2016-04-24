/**
 * Created by Miles on 4/16/2016.
 */
var fs = require('fs');

var configFileLocation = process.env.HOME + '/config.json';

var ConfigUtil = function() {};

ConfigUtil.prototype.dbInfo = {};
ConfigUtil.prototype.adminEmails = [];

// Read in configuration file and initialize object
ConfigUtil.init = function init() {
    var config = JSON.parse(fs.readFileSync(configFileLocation, 'utf-8'));

    this.adminEmails = config.adminEmails;
    this.dbInfo      = config.db;
};


module.exports = ConfigUtil;