define(['underscore', 'marionette'], function(_, Marionette) {
  return function(options) {
    var addControllerFacet, createApplicationFactory, pluginInstance, showInRegionFacet, withRegionsFacet;
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
    showInRegionFacet = function(resolver, facet, wire) {
      return wire(facet.options).then(function(options) {
        _.each(options, function(view, region) {
          return facet.target[region].show(view);
        });
        return resolver.resolve(facet.target);
      });
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
        showInRegion: {
          "ready": showInRegionFacet
        },
        addController: {
          "ready": addControllerFacet
        }
      }
    };
    return pluginInstance;
  };
});
