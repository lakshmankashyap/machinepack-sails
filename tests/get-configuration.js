var assert = require('assert');
var MPSails = require('../');
var lifecycle = require('./helpers/lifecycle');

describe('machinepack-sails: get-configuration', function() {

  var app;
  before(function(done) {
    lifecycle.loadSails(function(err, _sails) {
      if (err) {return done(err);}
      app = _sails;
      return done();
    });
  });

  after(function(done) {
    lifecycle.lowerSails(app, done);
  });

  it ('should return the correct value when called with an existing `sails.config` key', function() {
    var value = MPSails.getConfiguration({key: 'log.level'}).setEnvironment({sails: app}).execSync();
    assert.equal(value, 'error');
  });

  it ('should return trigger the `noSuchConfig` exit when called with a non-existent `sails.config` key', function(done) {
    MPSails.getConfiguration({key: 'blog.level'}).setEnvironment({sails: app}).exec({
      success: function() {
        throw new Error('Triggered `success` exit instead of `noSuchConfig`!');
      },
      error: done,
      noSuchConfig: function(err){return done();}
    });
  });

});


