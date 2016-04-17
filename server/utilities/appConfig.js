/**
 * Created by Miles on 4/16/2016.
 */
var fs = require('fs');

var configFileLocation = process.env.HOME + '/config.json';

var AppConfig = function() {};
AppConfig.prototype.config = {};
AppConfig.prototype.init = function() {
    this.config = JSON.parse(fs.readFileSync(configFileLocation, 'utf-8'));
};

// var AppConfigurations = {
//     configurations: {},
//     init: function init() {
//         configurations = JSON.parse(fs.readFileSync(configFileLocation, 'utf-8'));
//     }
// };

exports.AppConfig = new AppConfig();