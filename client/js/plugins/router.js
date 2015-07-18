define(['underscore', 'marionette'], function(_, Marionette) {
  return function(options) {
    var createRouterFactory, pluginInstance;
    createRouterFactory = function(resolver, compDef, wire) {
      var essentialProperties, opt, _i, _len;
      essentialProperties = ['controller', 'routes'];
      for (_i = 0, _len = essentialProperties.length; _i < _len; _i++) {
        opt = essentialProperties[_i];
        if (compDef.options[opt] == null) {
          throw new Error('#{opt} option should be provided for createRouter factory!');
        }
      }
      return wire(compDef.options.controller).then(function(routerController) {
        var router;
        router = new Marionette.AppRouter({
          controller: routerController,
          appRoutes: compDef.options.routes
        });
        return resolver.resolve(router);
      });
    };
    pluginInstance = {
      factories: {
        createRouter: createRouterFactory
      }
    };
    return pluginInstance;
  };
});
