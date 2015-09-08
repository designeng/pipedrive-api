var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(["underscore", "when", "meld"], function(_, When, meld) {
  var Container;
  return Container = (function() {
    function Container() {
      this.provideModuleSandbox = __bind(this.provideModuleSandbox, this);
      this.wrapModuleContextInSandbox = __bind(this.wrapModuleContextInSandbox, this);
    }

    Container.prototype.contextHash = {};

    Container.prototype.wrapModuleContextInSandbox = function(moduleContext) {
      var prop, sandbox;
      sandbox = {};
      for (prop in moduleContext) {
        if (_.isFunction(moduleContext[prop]) && moduleContext.hasOwnProperty(prop)) {
          sandbox[prop] = moduleContext[prop].bind(moduleContext);
        }
      }
      return sandbox;
    };

    Container.prototype.provideModuleSandbox = function(joinpoint) {
      var args, context, moduleName,
        _this = this;
      moduleName = joinpoint.args[0];
      args = _.rest(joinpoint.args);
      context = this.contextHash[moduleName];
      if (context == null) {
        return When(joinpoint.target[moduleName]()).then(function(moduleContext) {
          _this.contextHash[moduleName] = moduleContext;
          return joinpoint.proceed(_this.wrapModuleContextInSandbox(moduleContext), args);
        });
      } else {
        return joinpoint.proceed(this.wrapModuleContextInSandbox(context), args);
      }
    };

    Container.prototype.destroyModule = function(name) {
      var _ref;
      if ((_ref = this.contextHash[name]) != null) {
        _ref.destroy();
      }
      return delete this.contextHash[name];
    };

    return Container;

  })();
});
