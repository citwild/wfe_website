/**
 * Created by Miles on 4/16/2016.
 */

var assert = require('chai').assert;

var configUtil = require('../utilities/configUtil').configUtil;


describe('configUtil', function() {
    describe('init', function() {
        beforeEach(function () {
            configUtil.init();
        });
        
        it('should create an array of administrator emails', function() {
            assert.isArray(configUtil.adminEmails);
        });

        describe('adminEmails', function() {
            it('should have at least one email', function() {
                assert(configUtil.adminEmails.length > 0);
            })
        });
        
        it('should create an object of database info', function() {
            assert.isObject(configUtil.dbInfo);
        });

        describe('dbInfo', function() {
            it('should have a host', function() {
                assert(configUtil.dbInfo.host);
            });
            it('should have a user', function() {
                assert(configUtil.dbInfo.user);
            });
            it('should have a password', function() {
                assert(configUtil.dbInfo.password);
            });
            it('should have a database', function() {
                assert(configUtil.dbInfo.database);
            });
        });
    });
});
