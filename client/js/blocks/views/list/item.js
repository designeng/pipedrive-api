var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['marionette'], function(Marionette) {
  var ListItemTemplateView, _ref;
  return ListItemTemplateView = (function(_super) {
    __extends(ListItemTemplateView, _super);

    function ListItemTemplateView() {
      _ref = ListItemTemplateView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ListItemTemplateView.prototype.tagName = "li";

    ListItemTemplateView.prototype.className = "person-item";

    ListItemTemplateView.prototype.templateHelpers = {
      organizationName: function() {
        var _ref1;
        return (_ref1 = this.organization) != null ? _ref1.name : void 0;
      }
    };

    return ListItemTemplateView;

  })(Marionette.ItemView);
});
