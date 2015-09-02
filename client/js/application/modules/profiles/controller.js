var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["underscore", "backbone", "backbone.radio", "marionette", "meld", "api"], function(_, Backbone, Radio, Marionette, meld, api) {
  var ProfilesController, _ref;
  return ProfilesController = (function(_super) {
    __extends(ProfilesController, _super);

    function ProfilesController() {
      _ref = ProfilesController.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ProfilesController.prototype.onReady = function() {
      var _this = this;
      return this.channel.on("profiles:person:details", function(id) {
        return console.debug("ProfilesController:::::profiles:person:details", id);
      });
    };

    ProfilesController.prototype.activateById = function(id) {
      return this.list.channel.trigger("profiles:list:activate", id);
    };

    ProfilesController.prototype.showProfileDetailes = function(personId) {
      var model, personProfile;
      model = this.collection.find(function(model) {
        return model.get('id') === parseInt(personId);
      });
      if (model) {
        personProfile = new this.PersonProfile({
          model: model,
          PersonProfileDeals: this.PersonProfileDeals,
          personId: personId
        });
        return this.profilesLayout.showChildView("mainAreaRegion", personProfile);
      } else {
        return this.profilesLayout.showChildView("mainAreaRegion", new this.BlankProfile);
      }
    };

    return ProfilesController;

  })(Marionette.Object);
});
