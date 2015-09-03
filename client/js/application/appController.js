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
      console.debug("name, path, opts", name, path, opts);
      return When(this.profiles()).then(function(profilesContext) {
        return profilesContext.activateById(opts[0]);
      });
    };

    AppController.prototype.showProfilesList = function() {
      return When(this.profiles()).then(function(profilesContext) {
        return profilesContext.showProfilesList();
      });
    };

    AppController.prototype.showProfileDetailes = function(personId) {
      return When(this.profiles()).then(function(profilesContext) {
        return profilesContext.showProfileDetailes(personId);
      });
    };

    AppController.prototype.showDealsList = function() {
      return When(this.deals()).then(function(dealsContext) {
        return dealsContext.showDealsList();
      });
    };

    AppController.prototype.showDealsDetailes = function(dealId) {
      return When(this.deals()).then(function(dealsContext) {
        return dealsContext.showDealsDetailes(dealId);
      });
    };

    return AppController;

  })(Marionette.Object);
});
