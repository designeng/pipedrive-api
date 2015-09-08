var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["underscore", "backbone", "marionette", "when", "meld", "api"], function(_, Backbone, Marionette, When, meld, api) {
  var AppController, _ref;
  return AppController = (function(_super) {
    __extends(AppController, _super);

    function AppController() {
      this.onRoute = __bind(this.onRoute, this);
      _ref = AppController.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    AppController.prototype.removers = [];

    AppController.prototype.contextHash = {};

    AppController.prototype.currentRootFragment = null;

    AppController.prototype.initialize = function() {
      this.removers.push(meld.around(this, 'showEntityList', this.provideModuleSandbox));
      return this.removers.push(meld.around(this, 'showEntityDetailes', this.provideModuleSandbox));
    };

    AppController.prototype.showPreloader = function() {
      return this.regions.mainAreaRegion.show(this.preloader);
    };

    AppController.prototype.wrapModuleContextInSandbox = function(moduleContext) {
      var prop, sandbox;
      sandbox = {};
      for (prop in moduleContext) {
        if (_.isFunction(moduleContext[prop]) && moduleContext.hasOwnProperty(prop)) {
          sandbox[prop] = moduleContext[prop].bind(moduleContext);
        }
      }
      return sandbox;
    };

    AppController.prototype.provideModuleSandbox = function(joinpoint) {
      var context, id, moduleName,
        _this = this;
      moduleName = joinpoint.args[0];
      id = joinpoint.args[1];
      context = this.contextHash[moduleName];
      if (context == null) {
        return When(this[moduleName]()).then(function(moduleContext) {
          _this.contextHash[moduleName] = moduleContext;
          return joinpoint.proceed(_this.wrapModuleContextInSandbox(moduleContext), id);
        });
      } else {
        return joinpoint.proceed(this.wrapModuleContextInSandbox(context), id);
      }
    };

    AppController.prototype.onDestroy = function() {
      return _.each(this.removers, function(remover) {
        return remover.remove();
      });
    };

    AppController.prototype.onRoute = function(name, path, opts) {
      this.rootFragmentMutation(path.split("/")[0]);
      if (path !== "*notFound") {
        return this.notFoundPage.hide();
      }
    };

    AppController.prototype.rootFragmentMutation = function(rootFragment) {
      var _ref1;
      if (this.currentRootFragment !== rootFragment) {
        if ((_ref1 = this.contextHash[this.currentRootFragment]) != null) {
          _ref1.destroy();
        }
        delete this.contextHash[this.currentRootFragment];
        return this.currentRootFragment = rootFragment;
      }
    };

    AppController.prototype.profilesModuleHandler = function(personId) {
      var _this = this;
      return When(this.showEntityList("profiles")).then(function() {
        return _this.showEntityDetailes("profiles", personId);
      });
    };

    AppController.prototype.dealsModuleHandler = function(dealId) {
      var _this = this;
      return When(this.showEntityList("deals")).then(function() {
        return _this.showEntityDetailes("deals", dealId);
      });
    };

    AppController.prototype.notFoundHandler = function() {
      return this.notFoundPage.show();
    };

    AppController.prototype.showEntityList = function(sandbox) {
      return sandbox.showList();
    };

    AppController.prototype.showEntityDetailes = function(sandbox, id) {
      return sandbox.showDetailes(id);
    };

    return AppController;

  })(Marionette.Object);
});
