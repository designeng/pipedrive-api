var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["underscore", "backbone", "backbone.radio", "marionette", "meld", "api"], function(_, Backbone, Radio, Marionette, meld, api) {
  var ProfilesModuleController, _ref;
  return ProfilesModuleController = (function(_super) {
    __extends(ProfilesModuleController, _super);

    function ProfilesModuleController() {
      _ref = ProfilesModuleController.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ProfilesModuleController.prototype.removers = [];

    ProfilesModuleController.prototype.initialize = function() {
      this.profilesListIsRendered = false;
      _.bindAll(this, 'onRoute', 'showProfilesList', 'showProfileDetailes');
      return this.removers.push(meld.before(this, 'showProfileDetailes', this.showProfilesList));
    };

    ProfilesModuleController.prototype.onDestroy = function() {
      return _.each(this.removers, function(remover) {
        return remover.remove();
      });
    };

    ProfilesModuleController.prototype.onRoute = function(name, path, opts) {
      return this.profilesChannel.trigger("profiles:list:activate", opts[0]);
    };

    ProfilesModuleController.prototype.renderProfilesList = function() {
      return this.regions.sidebarRegion.show(this.profilesList);
    };

    ProfilesModuleController.prototype.showProfilesList = function() {
      if (!this.profilesListIsRendered) {
        this.renderProfilesList();
        return this.profilesListIsRendered = true;
      }
    };

    ProfilesModuleController.prototype.showProfileDetailes = function(personId) {
      var model, personProfile;
      model = this.profilesCollection.find(function(model) {
        return model.get('id') === parseInt(personId);
      });
      if (model) {
        personProfile = new this.PersonProfile({
          model: model,
          PersonProfileDeals: this.PersonProfileDeals,
          personId: personId
        });
        return this.regions.mainAreaRegion.show(personProfile);
      } else {
        return this.regions.mainAreaRegion.show(new this.BlankProfile);
      }
    };

    return ProfilesModuleController;

  })(Marionette.Object);
});
