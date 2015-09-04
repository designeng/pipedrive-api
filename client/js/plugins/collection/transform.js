define(['underscore'], function(_) {
  return function(options) {
    var pluginInstance, transformFactory;
    transformFactory = function(resolver, compDef, wire) {
      return wire(compDef.options).then(function(options) {
        var _this = this;
        return options.collection.on('sync', function(collection) {
          var grouped;
          grouped = _.groupBy(collection.models, function(model) {
            return model.get(options.groupBy);
          });
          return resolver.resolve(grouped);
        });
      });
    };
    pluginInstance = {
      factories: {
        transform: transformFactory
      }
    };
    return pluginInstance;
  };
});
