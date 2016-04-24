/**
 * Created by milesdowe on 4/23/16.
 */
var schemas = require('./schemas'),
    _ = require('lodash'),
    db = require('../db/db');

var UserAccount = function(data) {
    this.data = data;
};

UserAccount.prototype.data = {};

UserAccount.prototype.changePassword = function changePassword(password, pool) {

};

// set data of account, sanitize data
// TODO: check values for malicious entries
UserAccount.prototype.setData = function setData(data) {
    data = data || {};
    userSchema = schemas.userAccount;
    this.data =  _.pick(_.defaults(data, userSchema), _.keys(userSchema));
};

module.exports = UserAccount;