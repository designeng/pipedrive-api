var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['marionette', 'hbs!application/profiles/templates/profilesListItem'], function(Marionette, listItemTemplate) {
  var ListItemTemplateView, _ref;
  return ListItemTemplateView = (function(_super) {
    __extends(ListItemTemplateView, _super);

    function ListItemTemplateView() {
      _ref = ListItemTemplateView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ListItemTemplateView.prototype.tagName = "li";

    return ListItemTemplateView;

  })(Marionette.ItemView);
});
