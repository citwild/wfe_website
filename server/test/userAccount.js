/**
 * Created by milesdowe on 4/23/16.
 */
/**
 * Created by Miles on 4/17/2016.
 */

var assert = require('chai').assert,
    UserAccount = require('../utilities/models/userAccount');

describe('UserAccount', function() {
    describe('setData', function () {
        it('should only accept data identified in its schema', function() {
            var userAccount = new UserAccount({});
            var testData = {
                first_name   : "test",
                last_name    : "testerson",
                email       : "test@test.com",
                password    : "atestpassword",
                permissions : "test",
                garbage     : "shouldn't go in"
            };
            userAccount.setData(testData);
            assert.notProperty(userAccount.data, 'garbage');
            assert.property(userAccount.data, 'first_name');
            assert.property(userAccount.data, 'last_name');
            assert.property(userAccount.data, 'email');
            assert.property(userAccount.data, 'password');
            assert.property(userAccount.data, 'permissions');
        });

        it('should have default values if not provided a property', function() {
            var userAccount = new UserAccount({});
            var testData = {
                first_name: "test",
                email:"test@test.com",
                password:"atestpassword",
                permissions:"test"
            };
            userAccount.setData(testData);
            assert.property(userAccount.data, 'first_name');
            assert.property(userAccount.data, 'last_name');
            assert.property(userAccount.data, 'email');
            assert.property(userAccount.data, 'password');
            assert.property(userAccount.data, 'permissions');
        });
    });
});