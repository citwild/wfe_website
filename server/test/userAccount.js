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
                firstName   : "test",
                lastName    : "testerson",
                email       : "test@test.com",
                password    : "atestpassword",
                permissions : "test",
                garbage     : "shouldn't go in"
            };
            userAccount.setData(testData);
            assert.notProperty(userAccount.data, 'garbage');
            assert.property(userAccount.data, 'firstName');
            assert.property(userAccount.data, 'lastName');
            assert.property(userAccount.data, 'email');
            assert.property(userAccount.data, 'password');
            assert.property(userAccount.data, 'permissions');
        });

        it('should have default values if not provided a property', function() {
            var userAccount = new UserAccount({});
            var testData = {
                firstName: "test",
                email:"test@test.com",
                password:"atestpassword",
                permissions:"test"
            };
            userAccount.setData(testData);
            assert.property(userAccount.data, 'firstName');
            assert.property(userAccount.data, 'lastName');
            assert.property(userAccount.data, 'email');
            assert.property(userAccount.data, 'password');
            assert.property(userAccount.data, 'permissions');
        });
    });
});