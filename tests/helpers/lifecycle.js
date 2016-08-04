var path = require('path');
var SailsApp = require('sails').Sails;
var _ = require('lodash');

module.exports = {
  loadSails: function(opts, cb) {

    var Sails = new SailsApp();
    var app;
    if (typeof opts === 'function') {
      cb = opts;
      opts = {};
    }

    opts = _.extend({
      hooks: {grunt: false, views: false, session: false},
      log: {level: 'error'},
      globals: false
    }, opts);
    Sails.load(opts, cb);
  },

  lowerSails: function(sails, cb) {
    sails.lower(function(err) {
      if (err) {return cb(err);}
      setTimeout(cb, 500);
    });
  }
};
