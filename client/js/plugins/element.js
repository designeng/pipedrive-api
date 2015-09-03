define(["jquery"], function($) {
  return function(options) {
    var elementResolver, pluginInstance;
    elementResolver = function(resolver, name, refObj, wire) {
      console.debug("NAME:::", name);
      return resolver.resolve($(name));
    };
    return pluginInstance = {
      resolvers: {
        element: elementResolver
      }
    };
  };
});
