var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(["underscore", "backbone.radio", "when", "meld"], function(_, Radio, When, meld) {
  var Container;
  Container = (function() {
    function Container() {
      this.registerModuleSandbox = __bind(this.registerModuleSandbox, this);
    }

    Container.prototype.removers = [];

    Container.prototype.modules = {};

    Container.prototype.sandboxes = {};

    Container.prototype.containerChannel = Radio.channel("container");

    Container.prototype.registerSandbox = function(moduleName, sandbox) {
      console.debug("sandbox...", moduleName, sandbox);
      return this.sandboxes[moduleName] = sandbox;
    };

    Container.prototype.startModule = function(module) {
      return When.promise(function(resolve, reject) {
        return module({
          _radio: {
            literal: {
              channel: this.containerChannel
            }
          }
        }).then(function(context) {
          return resolve(context);
        });
      });
    };

    Container.prototype.registerModuleSandbox = function(joinpoint) {
      var args, context, moduleName,
        _this = this;
      moduleName = joinpoint.args[0];
      args = _.rest(joinpoint.args);
      context = this.modules[moduleName];
      if (context == null) {
        return this.startModule(joinpoint.target[moduleName]).then(function(moduleContext) {
          _this.modules[moduleName] = moduleContext;
          _this.registerSandbox(moduleName, moduleContext.sandbox);
          return joinpoint.proceed(moduleContext.sandbox, args);
        });
      } else {
        return joinpoint.proceed(context.sandbox, args);
      }
    };

    Container.prototype.destroyModule = function(name) {
      var _ref;
      if ((_ref = this.modules[name]) != null) {
        _ref.destroy();
      }
      return delete this.modules[name];
    };

    return Container;

  })();
  return function(options) {
    var container, destroyFacet, pluginInstance, registerIntercessorsFacet;
    container = new Container();
    registerIntercessorsFacet = function(resolver, facet, wire) {
      return wire(facet.options).then(function(sandboxIntercessors) {
        _.each(sandboxIntercessors, function(method) {
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
        registerIntercessors: {
          "ready": registerIntercessorsFacet,
          "destroy": destroyFacet
        }
      }
    };
    return pluginInstance;
  };
});
