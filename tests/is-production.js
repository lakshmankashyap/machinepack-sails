var assert = require('assert');
var MPSails = require('../');
var lifecycle = require('./helpers/lifecycle');

describe('machinepack-sails: is-production', function() {

  describe('when the app is not in the production environment', function() {

    var app;
    after(function(done) {
      lifecycle.lowerSails(app, done);
    });

    it ('should return `false` when the app is not in the production environment', function(done) {

      lifecycle.loadSails(function(err, _sails) {
        if (err) {return done(err);}
        app = _sails;
        var value = MPSails.isProduction().setEnvironment({sails: app}).execSync();
        assert.equal(value, false);
        return done();
      });
    });

  });

  describe('when the app is in the production environment', function() {

    var app;
    after(function(done) {
      lifecycle.lowerSails(app, done);
    });

    it ('should return `true` when the app is not in the production environment', function(done) {

      lifecycle.loadSails({environment: 'production'}, function(err, _sails) {
        if (err) {return done(err);}
        app = _sails;
        var value = MPSails.isProduction().setEnvironment({sails: app}).execSync();
        assert.equal(value, true);
        return done();
      });
    });

  });
});


