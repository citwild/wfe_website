/**
 * Created by Miles on 4/16/2016.
 */

var assert = require('chai').assert;

var AppConfig= require('../utilities/appConfig');


describe('AppConfig', function() {
    // beforeEach(function () {
    //     AppConfigurations.init;
    // });
    
    describe('init', function() {
        it('should create an array of administrator emails', function() {
            AppConfig.init();
            assert.isObject(AppConfig.config);
        });
    });
});
