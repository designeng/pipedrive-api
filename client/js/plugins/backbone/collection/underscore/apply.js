define(['underscore', 'backbone'], function(_, Backbone) {
  return function(options) {
    var applyMethods, applyToFactory, pluginInstance;
    applyMethods = function(_collection, methods) {
      return _.reduce(methods, function(collection, method) {
        var methodArgs, methodName;
        if (_.isObject(method)) {
          methodName = _.keys(method)[0];
          methodArgs = method[methodName];
        } else if (_.isString(method)) {
          methodName = method;
        }
        if (!collection[methodName]) {
          throw new Error("There is no method '" + methodName + "' in underscore library!");
        }
        return collection[methodName](methodArgs);
      }, _collection);
    };
    applyToFactory = function(resolver, compDef, wire) {
      return wire(compDef.options).then(function(options) {
        var _collection,
          _this = this;
        _collection = options.collection;
        if (!_collection.length) {
          return _collection.on('sync', function(collection) {
            return resolver.resolve(applyMethods(collection, options.methods));
          });
        } else {
          return resolver.resolve(applyMethods(collection, options.methods));
        }
      });
    };
    pluginInstance = {
      factories: {
        applyTo: applyToFactory
      }
    };
    return pluginInstance;
  };
});
