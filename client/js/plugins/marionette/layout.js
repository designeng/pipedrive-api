define(['underscore', 'marionette'], function(_, Marionette) {
  return function(options) {
    var createLayoutFactory, pluginInstance, showInRegionFacet;
    createLayoutFactory = function(resolver, compDef, wire) {
      var layout;
      layout = new Marionette.LayoutView();
      return wire(compDef.options).then(function(options) {
        if (options.fromTemplate) {
          layout.template = options.fromTemplate;
        }
        layout.addRegions(options.withRegions);
        return resolver.resolve(layout);
      });
    };
    showInRegionFacet = function(resolver, facet, wire) {
      return wire(facet.options).then(function(options) {
        _.each(options, function(view, region) {
          return facet.target.onBeforeShow = function() {
            return facet.target.showChildView(region, view);
          };
        });
        return resolver.resolve(facet.target);
      });
    };
    pluginInstance = {
      factories: {
        createLayout: createLayoutFactory
      },
      facets: {
        showInRegion: {
          "ready": showInRegionFacet
        }
      }
    };
    return pluginInstance;
  };
});
