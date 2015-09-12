define(['underscore', 'marionette'], function(_, Marionette) {
  return function(options) {
    var createLayoutFactory, pluginInstance, renderInFacet, showInRegionsFacet;
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
    renderInFacet = function(resolver, facet, wire) {
      return wire(facet.options).then(function(region) {
        return resolver.resolve(region.show(facet.target));
      });
    };
    showInRegionsFacet = function(resolver, facet, wire) {
      var noop;
      noop = function() {};
      return wire(facet.options).then(function(options) {
        _.each(options, function(view, region) {
          var err;
          try {
            return facet.target.showChildView(region, view);
          } catch (_error) {
            err = _error;
            return noop();
          }
        });
        return resolver.resolve(facet.target);
      });
    };
    pluginInstance = {
      factories: {
        createLayout: createLayoutFactory
      },
      facets: {
        showInRegions: {
          "ready": showInRegionsFacet
        },
        renderIn: {
          "ready": renderInFacet
        }
      }
    };
    return pluginInstance;
  };
});
