var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["underscore", "backbone", "marionette", "when", "meld", "api"], function(_, Backbone, Marionette, When, meld, api) {
  var AppController, _ref;
  return AppController = (function(_super) {
    __extends(AppController, _super);

    function AppController() {
      _ref = AppController.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    AppController.prototype.removers = [];

    AppController.prototype.contextHash = {};

    AppController.prototype.currentRootFragment = null;

    AppController.prototype.initialize = function() {
      _.bindAll(this, 'onRoute');
      this.removers.push(meld.around(this, 'showEntityList', this.provideModuleContext));
      return this.removers.push(meld.around(this, 'showEntityDetailes', this.provideModuleContext));
    };

    AppController.prototype.provideModuleContext = function(joinpoint) {
      var context, id, moduleName,
        _this = this;
      moduleName = joinpoint.args[0];
      id = joinpoint.args[1];
      context = this.contextHash[moduleName];
      if (context == null) {
        return When(this[moduleName]()).then(function(moduleContext) {
          _this.contextHash[moduleName] = moduleContext;
          return joinpoint.proceed(moduleContext, id);
        });
      } else {
        return joinpoint.proceed(context, id);
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

    AppController.prototype.notFound = function() {
      return this.notFoundPage.show();
    };

    AppController.prototype.showProfilesModule = function(personId) {
      var _this = this;
      return When(this.showEntityList("profiles")).then(function() {
        return _this.showEntityDetailes("profiles", personId);
      });
    };

    AppController.prototype.showDealsModule = function(dealId) {
      var _this = this;
      return When(this.showEntityList("deals")).then(function() {
        return _this.showEntityDetailes("deals", dealId);
      });
    };

    AppController.prototype.showEntityList = function(moduleContext) {
      return moduleContext.showList();
    };

    AppController.prototype.showEntityDetailes = function(moduleContext, id) {
      moduleContext.activateById(id);
      return moduleContext.showDetailes(id);
    };

    return AppController;

  })(Marionette.Object);
});
