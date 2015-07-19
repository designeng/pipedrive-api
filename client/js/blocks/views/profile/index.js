var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['marionette'], function(Marionette) {
  var ProfileView, _ref;
  return ProfileView = (function(_super) {
    __extends(ProfileView, _super);

    function ProfileView() {
      _ref = ProfileView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ProfileView.prototype.tagName = "div";

    return ProfileView;

  })(Marionette.ItemView);
});
