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

    ApplicationController.prototype.path = void 0;

    ApplicationController.prototype.initialize = function() {
      return _.bindAll(this, 'onProfilesCollectionSync', 'onRoute', 'showProfilesList', 'showProfileDetailes');
    };

    ApplicationController.prototype.onProfilesCollectionSync = function(collection, resp, options) {
      var model, personId, personProfile;
      personId = options.personId;
      model = collection.find(function(model) {
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

    ApplicationController.prototype.onRoute = function(name, path, opts) {
      return this.profilesChannel.trigger("profiles:list:activate", opts[0]);
    };

    ApplicationController.prototype.profilesDefault = function(personId) {
      this.profilesCollection.fetch({
        personId: personId
      });
      this.profilesList.setChildTemplate(this.profilesListItemTemplate);
      return this.regions.sidebarRegion.show(this.profilesList);
    };

    ApplicationController.prototype.showProfilesList = function() {
      console.debug("showProfilesList");
      return this.profilesDefault();
    };

    ApplicationController.prototype.showProfileDetailes = function(personId) {
      return this.profilesDefault(personId);
    };

    return ApplicationController;

  })(Marionette.Object);
});
