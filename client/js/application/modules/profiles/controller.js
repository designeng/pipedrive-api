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
      this.channel.on("profiles:list:activate", function(id) {
        return _this.list.activateById(id);
      });
      return this.channel.on("profiles:person:details", function(id) {
        return console.debug("ProfilesController:::::profiles:person:details", id);
      });
    };

    return ProfilesController;

  })(Marionette.Object);
});
