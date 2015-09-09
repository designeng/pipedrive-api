define(['underscore', 'backbone.radio'], function(_, Radio) {
  return function() {
    var createSandboxFactory, eventsFlowFacet, pluginInstance;
    createSandboxFactory = function(resolver, compDef, wire) {
      return wire(compDef.options.api).then(function(api) {
        var sandbox;
        sandbox = {};
        if (sandbox.emitter == null) {
          sandbox.emitter = Radio.channel("application");
        }
        _.each(api, function(method, methodName) {
          return sandbox[methodName] = method;
        });
        return resolver.resolve(sandbox);
      });
    };
    eventsFlowFacet = function(resolver, facet, wire) {
      return wire(facet.options).then(function(options) {
        return resolver.resolve(facet.target);
      });
    };
    pluginInstance = {
      factories: {
        createSandbox: createSandboxFactory
      },
      facets: {
        eventsFlow: {
          "configure": eventsFlowFacet
        }
      }
    };
    return pluginInstance;
  };
});
