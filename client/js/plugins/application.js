define(['underscore', 'marionette'], function(_, Marionette) {
  return function(options) {
    var addControllerFacet, createApplicationFactory, pluginInstance, withRegionsFacet;
    createApplicationFactory = function(resolver, compDef, wire) {
      var app;
      app = new Marionette.Application();
      app.on("start", function() {
        return Backbone.history.start();
      });
      return resolver.resolve(app);
    };
    withRegionsFacet = function(resolver, facet, wire) {
      facet.target.addRegions(facet.options);
      return resolver.resolve(facet.target);
    };
    addControllerFacet = function(resolver, facet, wire) {
      return wire(facet.options).then(function(controller) {
        controller.regions = facet.target.getRegions();
        controller.regionManager = facet.target._regionManager;
        facet.target.controller = controller;
        return resolver.resolve(facet.target);
      });
    };
    pluginInstance = {
      factories: {
        createApplication: createApplicationFactory
      },
      facets: {
        withRegions: {
          "ready": withRegionsFacet
        },
        addController: {
          "ready": addControllerFacet
        }
      }
    };
    return pluginInstance;
  };
});
