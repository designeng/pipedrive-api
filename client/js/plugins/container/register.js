var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(["underscore", "backbone.radio", "when", "meld"], function(_, Radio, When, meld) {
  var Container;
  Container = (function() {
    function Container() {
      this.registerModuleSandbox = __bind(this.registerModuleSandbox, this);
    }

    Container.prototype.removers = [];

    Container.prototype.modules = {};

    Container.prototype.channel = Radio.channel("container");

    Container.prototype.startModule = function(module, moduleName) {
      var moduleChannel,
        _this = this;
      moduleChannel = Radio.channel(moduleName);
      moduleChannel.reply("default", function(requestName, args) {
        return _this.channel.trigger(requestName, args);
      });
      return When.promise(function(resolve, reject) {
        return module({
          sandbox: {
            literal: {
              channel: moduleChannel
            }
          }
        }).then(function(context) {
          return resolve(context);
        });
      });
    };

    Container.prototype.stopModule = function(name) {
      var _ref;
      if (Radio._channels[name]) {
        Radio.reset(name);
      }
      if ((_ref = this.modules[name]) != null) {
        _ref.destroy();
      }
      return delete this.modules[name];
    };

    Container.prototype.registerModuleSandbox = function(joinpoint) {
      var args, context, moduleName,
        _this = this;
      moduleName = joinpoint.args[0];
      args = _.rest(joinpoint.args);
      context = this.modules[moduleName];
      if (context == null) {
        return this.startModule(joinpoint.target[moduleName], moduleName).then(function(moduleContext) {
          _this.modules[moduleName] = moduleContext;
          return moduleContext.wire(moduleContext.publicApi).then(function(api) {
            _.each(api, function(method, methodName) {
              return moduleContext.sandbox[methodName] = method;
            });
            return joinpoint.proceed(moduleContext.sandbox, args);
          });
        });
      } else {
        return joinpoint.proceed(context.sandbox, args);
      }
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
      Radio.reset();
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
