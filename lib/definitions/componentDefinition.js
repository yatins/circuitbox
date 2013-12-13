/*!
 * circuitbox
 * Copyright(c) 2013 Ranganath Kini <oddjobsman@ranganathkini.com>
 * MIT Licensed
 */

(function () {
  'use strict';

  var _ = require('../utils')._;
  var Scopes = require('./../components/scopes');

  var ComponentCreationError = require('./../components/componentCreationError');
  var ComponentDefinitionError = require('./componentDefinitionError');

  module.exports = function ComponentDefinition() {
    var self = this;
    var options = arguments[0] || {};
    var initializerValid = (_.isFunction(options.initializer) || _.isString(options.initializer));

    options.scope = options.scope || Scopes.prototype;

    if (options.initializer && !initializerValid) {
      throw new ComponentDefinitionError(_.sprintf('Initializer for \'%s\' must be a function or string', options.name),
        options.name);
    }

    Object.defineProperties(self, {
      'name': {
        get: function () {
          return options.name;
        }
      },
      'scope': {
        get: function () {
          return options.scope;
        }
      },
      'initializer': {
        get: function () {
          return options.initializer;
        }
      },
      'dependencies': {
        get: function () {
          return options.dependencies;
        }
      },
      'emitter': {
        configurable: true,
        get: function () {
          throw new ComponentCreationError(self.name);
        }
      }
    });
  };

})();