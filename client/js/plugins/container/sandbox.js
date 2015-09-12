define(['underscore', 'backbone.radio'], function(_, Radio) {
  return function() {
    var createSandboxFactory, pluginInstance;
    createSandboxFactory = function(resolver, compDef, wire) {
      return wire(compDef.options.api).then(function(api) {
        var sandbox;
        sandbox = {};
        _.each(api, function(method, methodName) {
          return sandbox[methodName] = method;
        });
        return resolver.resolve(sandbox);
      });
    };
    pluginInstance = {
      factories: {
        createSandbox: createSandboxFactory
      }
    };
    return pluginInstance;
  };
});
