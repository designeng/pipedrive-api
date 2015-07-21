var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["backbone", "backbone.radio", "marionette", "api"], function(Backbone, Radio, Marionette, api) {
  var ApplicationController, _ref;
  return ApplicationController = (function(_super) {
    __extends(ApplicationController, _super);

    function ApplicationController() {
      _ref = ApplicationController.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ApplicationController.prototype.initialize = function() {
      this.profilesListIsRendered = false;
      return _.bindAll(this, 'onRoute', 'showProfilesList', 'showProfileDetailes');
    };

    ApplicationController.prototype.onRoute = function(name, path, opts) {
      return this.profilesChannel.trigger("profiles:list:activate", opts[0]);
    };

    ApplicationController.prototype.renderProfilesList = function() {
      return this.regions.sidebarRegion.show(this.profilesList);
    };

    ApplicationController.prototype.showProfilesList = function() {
      if (!this.profilesListIsRendered) {
        this.renderProfilesList();
        return this.profilesListIsRendered = true;
      }
    };

    ApplicationController.prototype.showProfileDetailes = function(personId) {
      var model, personProfile;
      this.showProfilesList();
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

    return ApplicationController;

  })(Marionette.Object);
});
