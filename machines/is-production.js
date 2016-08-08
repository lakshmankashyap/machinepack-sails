module.exports = {


  friendlyName: 'Is production?',


  description: 'Determine whether a Sails application is running in the production environment.',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {

  },


  exits: {

    success: {
      outputFriendlyName: 'Is production?',
      outputDescription: 'Whether or not the Sails app is running in the production environment.',
      outputExample: true
    },

  },


  fn: function(inputs, exits, env) {

    // Import `lodash`.
    var _ = require('lodash');

    // Ensure `env.sails`, returning through the `error` exit
    // if it cannot be found or is not an object.
    if (!_.isObject(env.sails) || env.sails.constructor.name !== 'Sails') {
      return exits.error(new Error('No Sails application object could be found in the machine environment!'));
    }

    // Return whether or not the environment is 'production'
    // through the `success` exit.
    return exits.success(env.sails.config.environment === 'production');

  },



};
