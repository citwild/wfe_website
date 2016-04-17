/**
 * Created by Miles on 4/16/2016.
 */

var assert = require('chai').assert;

var appConfig = require('../utilities/appConfig').conf;


describe('AppConfig', function() {
    describe('init', function() {
        beforeEach(function () {
            appConfig.init();
        });
        
        it('should create an array of administrator emails', function() {
            assert.isArray(appConfig.adminEmails);
        });

        describe('adminEmails', function() {
            it('should have at least one email', function() {
                assert(appConfig.adminEmails.length > 0);
            })
        })
        
        it('should create an object of database info', function() {
            assert.isObject(appConfig.dbInfo);
        });
        
        describe('dbInfo', function() {
            it('should have a host', function() {
                assert(appConfig.dbInfo.host);
            });
            it('should have a user', function() {
                assert(appConfig.dbInfo.user);
            });
            it('should have a password', function() {
                assert(appConfig.dbInfo.password);
            });
            it('should have a database', function() {
                assert(appConfig.dbInfo.database);
            });
        });
    });
});
