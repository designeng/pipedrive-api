define(['underscore', 'meld'], function(_, meld) {
  return function(options) {
    var destroyFacet, pluginInstance, registerApiFacet;
    registerApiFacet = function(resolver, facet, wire) {
      return wire(facet.options).then(function(options) {
        var api, container;
        container = options.container;
        api = options.api;
        if (container.removers == null) {
          container.removers = [];
        }
        _.each(options.api, function(method) {
          return container.removers.push(meld.around(facet.target, method, container.provideModuleSandbox));
        });
        facet.target.container = container;
        return resolver.resolve(facet.target);
      });
    };
    destroyFacet = function(resolver, facet, wire) {
      _.each(facet.target.container.removers, function(remover) {
        return remover.remove();
      });
      return resolver.resolve();
    };
    pluginInstance = {
      facets: {
        register: {
          "ready": registerApiFacet,
          "destroy": destroyFacet
        }
      }
    };
    return pluginInstance;
  };
});
