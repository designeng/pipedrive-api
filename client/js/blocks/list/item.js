var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["backbone"], function(Backbone) {
  var ListItemView, _ref;
  return ListItemView = (function(_super) {
    __extends(ListItemView, _super);

    function ListItemView() {
      _ref = ListItemView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ListItemView.prototype.tagName = "li";

    return ListItemView;

  })(Marionette.ItemView);
});
