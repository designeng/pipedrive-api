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

    AppController.prototype.initialize = function() {
      _.bindAll(this, 'onRoute', 'showProfilesList', 'showProfileDetailes');
      this.removers.push(meld.before(this, 'showProfileDetailes', this.showProfilesList));
      return this.removers.push(meld.before(this, 'showDealsDetailes', this.showDealsList));
    };

    AppController.prototype.onDestroy = function() {
      return _.each(this.removers, function(remover) {
        return remover.remove();
      });
    };

    AppController.prototype.onRoute = function(name, path, opts) {
      var moduleName;
      moduleName = path.split("/")[0];
      return When(this[moduleName]()).then(function(moduleContext) {});
    };

    AppController.prototype.showProfilesList = function() {
      return this.showEntityList("profiles");
    };

    AppController.prototype.showProfileDetailes = function(personId) {
      return this.showEntityDetailes("profiles", personId);
    };

    AppController.prototype.showDealsList = function() {
      return this.showEntityList("deals");
    };

    AppController.prototype.showDealsDetailes = function(dealId) {
      return this.showEntityDetailes("deals", dealId);
    };

    AppController.prototype.showEntityList = function(moduleName) {
      return When(this[moduleName]()).then(function(moduleContext) {
        return moduleContext.showList();
      });
    };

    AppController.prototype.showEntityDetailes = function(moduleName, id) {
      console.debug("PROFILES", this.profiles);
      return When(this[moduleName]()).then(function(moduleContext) {
        moduleContext.activateById(id);
        return moduleContext.showDetailes(id);
      });
    };

    return AppController;

  })(Marionette.Object);
});
