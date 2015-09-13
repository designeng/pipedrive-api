var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["marionette"], function(Marionette) {
  var ProfilesController, _ref;
  return ProfilesController = (function(_super) {
    __extends(ProfilesController, _super);

    function ProfilesController() {
      _ref = ProfilesController.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ProfilesController.prototype.createList = function() {
      return console.debug("profile create list", this.sandbox);
    };

    ProfilesController.prototype.createDetails = function() {};

    return ProfilesController;

  })(Marionette.Object);
});
