var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['marionette', 'moment', 'hbs!application/profiles/templates/userCorner'], function(Marionette, moment, userCornerTemplate) {
  var UserCornerView, _ref;
  return UserCornerView = (function(_super) {
    __extends(UserCornerView, _super);

    function UserCornerView() {
      _ref = UserCornerView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    UserCornerView.prototype.tagName = "div";

    UserCornerView.prototype.className = "user-corner";

    UserCornerView.prototype.template = userCornerTemplate;

    UserCornerView.prototype.templateHelpers = {
      pphone: function() {}
    };

    return UserCornerView;

  })(Marionette.ItemView);
});
