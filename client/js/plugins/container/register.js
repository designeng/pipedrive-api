var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(["underscore", "backbone.radio", "when", "meld"], function(_, Radio, When, meld) {
  var Container;
  Container = (function() {
    function Container() {
      this.registerModuleSandbox = __bind(this.registerModuleSandbox, this);
    }

    Container.prototype.removers = [];

    Container.prototype.contextHash = {};

    Container.prototype.modulesApi = {};

    Container.prototype.registerModuleApi = function(moduleName, sandbox) {
      this.modulesApi[moduleName] = sandbox;
      return console.debug("sandbox", sandbox);
    };

    Container.prototype.registerModuleSandbox = function(joinpoint) {
      var args, context, moduleName,
        _this = this;
      console.debug("joinpoint::::", joinpoint);
      moduleName = joinpoint.args[0];
      args = _.rest(joinpoint.args);
      context = this.contextHash[moduleName];
      if (context == null) {
        return When(joinpoint.target[moduleName]()).then(function(moduleContext) {
          _this.contextHash[moduleName] = moduleContext;
          _this.registerModuleApi(moduleName, moduleContext.sandbox);
          return joinpoint.proceed(moduleContext.sandbox, args);
        });
      } else {
        return joinpoint.proceed(context.sandbox, args);
      }
    };

    Container.prototype.destroyModule = function(name) {
      var _ref;
      if ((_ref = this.contextHash[name]) != null) {
        _ref.destroy();
      }
      delete this.contextHash[name];
      return delete this.modulesApi[name];
    };

    return Container;

  })();
  return function(options) {
    var container, destroyFacet, pluginInstance, registerApiFacet;
    container = new Container();
    registerApiFacet = function(resolver, facet, wire) {
      return wire(facet.options).then(function(options) {
        var api;
        api = options.api;
        _.each(options.api, function(method) {
          return container.removers.push(meld.around(facet.target, method, container.registerModuleSandbox));
        });
        facet.target.container = container;
        return resolver.resolve(facet.target);
      });
    };
    destroyFacet = function(resolver, facet, wire) {
      _.each(container.removers, function(remover) {
        return remover.remove();
      });
      return resolver.resolve();
    };
    pluginInstance = {
      facets: {
        registerInContainer: {
          "ready": registerApiFacet,
          "destroy": destroyFacet
        }
      }
    };
    return pluginInstance;
  };
});
