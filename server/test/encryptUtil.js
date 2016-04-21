var assert = require('chai').assert;

var encryptUtil = require('../utilities/encryptUtil').encryptUtil;

describe('encryptUtil', function() {
    describe('encryptPassword', function() {
        it('should create a hashed password', function() {
            var result = encryptUtil.encryptString("test");
            console.log(result);
            assert(result);
        });

        it('should decrypt the hashed password', function() {
            var hash = encryptUtil.encryptString("test");
            assert(encryptUtil.compareString("test", hash));
        });
    });
});