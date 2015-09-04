var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['marionette'], function(Marionette) {
  var ListItemView, _ref;
  return ListItemView = (function(_super) {
    __extends(ListItemView, _super);

    function ListItemView() {
      _ref = ListItemView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ListItemView.prototype.tagName = "li";

    ListItemView.prototype.className = "list-item";

    ListItemView.prototype.templateHelpers = {
      organizationName: function() {
        var _ref1;
        return ((_ref1 = this.organization) != null ? _ref1.name : void 0) || this.org_name;
      }
    };

    return ListItemView;

  })(Marionette.ItemView);
});
