var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["underscore", "backbone", "backbone.radio", "marionette", "when", "meld", "api"], function(_, Backbone, Radio, Marionette, When, meld, api) {
  var AppController, _ref;
  return AppController = (function(_super) {
    __extends(AppController, _super);

    function AppController() {
      _ref = AppController.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    AppController.prototype.removers = [];

    AppController.prototype.initialize = function() {
      this.profilesListIsRendered = false;
      this.dealsListIsRendered = false;
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
      return When(this.profiles()).then(function(profilesContext) {
        return profilesContext.activateById(opts[0]);
      });
    };

    AppController.prototype.renderList = function(entities) {
      var _this = this;
      return When(this[entities]()).then(function(moduleContext) {
        console.debug("LIST>>>>>", entities, moduleContext[entities + "List"]);
        return _this.regions.sidebarRegion.show(moduleContext[entities + "List"]);
      });
    };

    AppController.prototype.showProfilesList = function() {
      this.dealsListIsRendered = !this.dealsListIsRendered;
      if (!this.profilesListIsRendered) {
        this.renderList("profiles");
        return this.profilesListIsRendered = true;
      }
    };

    AppController.prototype.showProfileDetailes = function(personId) {
      return When(this.profiles()).then(function(profilesContext) {
        return profilesContext.showProfileDetailes(personId);
      });
    };

    AppController.prototype.showDealsList = function() {
      this.profilesListIsRendered = !this.profilesListIsRendered;
      if (!this.dealsListIsRendered) {
        this.renderList("deals");
        return this.dealsListIsRendered = true;
      }
    };

    AppController.prototype.showDealsDetailes = function(dealId) {
      return When(this.deals()).then(function(dealsContext) {
        return dealsContext.showDealsDetailes(dealId);
      });
    };

    return AppController;

  })(Marionette.Object);
});
