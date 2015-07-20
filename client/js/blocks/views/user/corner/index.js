var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['backbone', 'marionette', 'api', 'hbs!application/profiles/templates/userCorner'], function(Backbone, Marionette, api, userCornerTemplate) {
  var UserCornerModel, UserCornerView, _ref, _ref1;
  UserCornerModel = (function(_super) {
    __extends(UserCornerModel, _super);

    function UserCornerModel() {
      _ref = UserCornerModel.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    UserCornerModel.prototype.url = api.getUserCornerUrl();

    UserCornerModel.prototype.parse = function(resp) {
      console.debug("resp", resp);
      return resp.data;
    };

    return UserCornerModel;

  })(Backbone.Model);
  return UserCornerView = (function(_super) {
    __extends(UserCornerView, _super);

    function UserCornerView() {
      _ref1 = UserCornerView.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    UserCornerView.prototype.tagName = "div";

    UserCornerView.prototype.className = "user-corner";

    UserCornerView.prototype.template = userCornerTemplate;

    UserCornerView.prototype.initialize = function() {
      this.model = new UserCornerModel();
      return this.model.fetch();
    };

    UserCornerView.prototype.onBeforeRender = function() {
      console.debug("onBeforeRender");
      return console.debug("@model", this.model);
    };

    return UserCornerView;

  })(Marionette.ItemView);
});
