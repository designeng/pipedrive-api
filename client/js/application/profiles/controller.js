var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["backbone", "marionette", "api"], function(Backbone, Marionette, api) {
  var ApplicationController, _ref;
  return ApplicationController = (function(_super) {
    __extends(ApplicationController, _super);

    function ApplicationController() {
      _ref = ApplicationController.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ApplicationController.prototype.initialize = function() {
      return _.bindAll(this, 'showProfilesList', 'showProfileDetailes');
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
      this.profilesCollection.on('sync', function(collection, resp, options) {
        var model;
        model = collection.find(function(model) {
          return model.get('id') === parseInt(id);
        });
        if (model) {
          return _this.regions.mainAreaRegion.show(new _this.PersonProfile({
            model: model
          }));
        } else {
          return _this.regions.mainAreaRegion.show(new _this.BlankProfile);
        }
      });
      return this.profilesDefault();
    };

    return ApplicationController;

  })(Marionette.Object);
});
