var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["backbone", "marionette"], function(Backbone, Marionette) {
  var ApplicationController, _ref;
  return ApplicationController = (function(_super) {
    __extends(ApplicationController, _super);

    function ApplicationController() {
      _ref = ApplicationController.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ApplicationController.prototype.initialize = function() {
      return _.bindAll(this, 'showList', 'showPersonProfile');
    };

    ApplicationController.prototype.profilesDefault = function() {
      this.profilesList.setChildTemplate(this.profilesListItemTemplate);
      return this.regions.sidebarRegion.show(this.profilesList);
    };

    ApplicationController.prototype.showList = function() {
      return this.profilesDefault();
    };

    ApplicationController.prototype.showPersonProfile = function(id) {
      return this.profilesDefault();
    };

    return ApplicationController;

  })(Marionette.Object);
});
