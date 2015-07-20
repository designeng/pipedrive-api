define(['underscore', 'marionette'], function(_, Marionette) {
  return function(options) {
    var addControllerFacet, createApplicationFactory, pluginInstance, showInRegionFacet;
    createApplicationFactory = function(resolver, compDef, wire) {
      var app;
      app = new Marionette.Application();
      app.on("start", function() {
        return Backbone.history.start();
      });
      return wire(compDef.options).then(function(options) {
        app.addRegions(options.withRegions);
        return resolver.resolve(app);
      });
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
        controller.regions = facet.target._regionManager._regions;
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
