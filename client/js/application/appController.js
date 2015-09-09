var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["marionette", "when"], function(Marionette, When) {
  var AppController, _ref;
  return AppController = (function(_super) {
    __extends(AppController, _super);

    function AppController() {
      this.onRoute = __bind(this.onRoute, this);
      _ref = AppController.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    AppController.prototype.currentRootFragment = null;

    AppController.prototype.showPreloader = function(preloader) {
      return this.regions.mainAreaRegion.show(preloader);
    };

    AppController.prototype.listenToDealsModule = function() {
      return this.container.containerChannel.on("deals:id:activated", function(id) {
        return console.debug("ACTIVATED ITEM: ", id);
      });
    };

    AppController.prototype.onRoute = function(name, path, opts) {
      this.rootFragmentMutation(path.split("/")[0]);
      if (path !== "*notFound") {
        return this.notFoundPageLayer.hide();
      }
    };

    AppController.prototype.rootFragmentMutation = function(rootFragment) {
      if (this.currentRootFragment !== rootFragment) {
        this.container.destroyModule(this.currentRootFragment);
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
      return this.notFoundPageLayer.show();
    };

    AppController.prototype.showEntityList = function(sandbox) {
      return sandbox.showList();
    };

    AppController.prototype.showEntityDetailes = function(sandbox, args) {
      return sandbox.showDetailes(args[0]);
    };

    return AppController;

  })(Marionette.Object);
});
