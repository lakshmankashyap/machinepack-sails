module.exports = {


  friendlyName: 'Get Configuration',


  description: 'Retrieve the value of the specified Sails configuration setting.',


  extendedDescription: 'Looks for the specified key (using dot notation) under the `sails.config` object.  If the key does not exist, returns through the `noSuchConfig` exit.',


  habitat: 'sails',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {

    key: {
      friendlyName: 'Config key',
      description: 'The `sails.config` key to retrieve the value of.',
      extendedDescription: 'Use dot notation to retrieve nested keys, e.g. "log.level" to retrieve the value of `sails.config.log.level`".',
      example: 'log.level',
      required: true
    },

    expectedOutput: {
      friendlyName: 'Example result',
      description: 'Optional example to use to determine the expected output type.',
      extendedDescription: 'If an example result is provided, the retrieved configuration value will be cast to the example\'s type.',
      example: '===',
      isExemplar: true
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Config value',
      outputDescription: 'The value of the specified `sails.config` key.',
      like: 'expectedOutput'
    },

    noSuchConfig: {
      friendlyName: 'No such configuration',
      description: 'The specified key could not be found in the `sails.config` object.'
    }

  },


  fn: function(inputs, exits, env) {

    // Import `lodash`.
    var _ = require('lodash');

    // Ensure `env.sails`, returning through the `error` exit
    // if it cannot be found or is not an object.
    if (!_.isObject(env.sails) || env.sails.constructor.name !== 'Sails') {
      return exits.error(new Error('No Sails application object could be found in the machine environment!'));
    }

    // Check whether the sails config has the specified key.
    if (!_.has(env.sails.config, inputs.key)) {
      // If not, return through the `noSuchConfig` exit.
      return exits.noSuchConfig(new Error('The specified config key (`'+inputs.key+'`) could not be found. '+
                                          'Check that it is defined in your Sails app\'s configuration. '+
                                          'Also, if this is production-only or development-only config, '+
                                          'be sure that this app is running in the appropriate Sails environment. '+
                                          'See http://sailsjs.org/documentation/concepts/configuration for more info.'
                                          ));
    }

    // Retrieve the specified configuration value.
    var value = _.get(env.sails.config, inputs.key);

    // Return it through the `success` exit.
    return exits.success(value);

  }


};
