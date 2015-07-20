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

    ApplicationController.prototype.currentPersonId = void 0;

    ApplicationController.prototype.initialize = function() {
      return _.bindAll(this, 'onRoute', 'showProfilesList', 'showProfileDetailes');
    };

    ApplicationController.prototype.onRoute = function(name, path, opts) {
      console.debug("onRoute triggered", opts[0]);
      this.currentPersonId = opts[0];
      return this.profilesChannel.trigger("profiles:list:activate", opts[0]);
    };

    ApplicationController.prototype.profilesDefault = function() {
      this.profilesCollection.fetch();
      this.profilesList.setChildTemplate(this.profilesListItemTemplate);
      return this.regions.sidebarRegion.show(this.profilesList);
    };

    ApplicationController.prototype.showProfilesList = function() {
      return this.profilesDefault();
    };

    ApplicationController.prototype.showProfileDetailes = function(id) {
      var _this = this;
      this.regions.mainAreaRegion.empty();
      this.profilesCollection.on('sync', function(collection, resp, options) {
        var model, personProfile;
        model = collection.find(function(model) {
          return model.get('id') === parseInt(id);
        });
        if (model) {
          personProfile = new _this.PersonProfile({
            model: model
          });
          personProfile.onRender = function() {
            var personProfileDeals;
            personProfileDeals = new _this.PersonProfileDeals({
              personId: _this.currentPersonId
            });
            return personProfile.dealsRegion.show(personProfileDeals);
          };
          return _this.regions.mainAreaRegion.show(personProfile);
        } else {
          return _this.regions.mainAreaRegion.show(new _this.BlankProfile);
        }
      });
      return this.profilesDefault();
    };

    return ApplicationController;

  })(Marionette.Object);
});
