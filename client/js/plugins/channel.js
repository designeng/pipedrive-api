define(['underscore', 'backbone.radio'], function(_, Radio) {
  return function(options) {
    var channelEventsFacet, createChannelFactory, pluginInstance;
    createChannelFactory = function(resolver, compDef, wire) {
      return resolver.resolve(Radio.channel(compDef.options.name));
    };
    channelEventsFacet = function(resolver, facet, wire) {
      return wire(facet.options).then(function(onDef) {
        _.each(onDef, function(method, eventName) {
          return facet.target.on(eventName, method);
        });
        return resolver.resolve(facet.target);
      });
    };
    pluginInstance = {
      factories: {
        createChannel: createChannelFactory
      },
      facets: {
        channelEvents: {
          "ready": channelEventsFacet
        }
      }
    };
    return pluginInstance;
  };
});
