var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['marionette'], function(Marionette) {
  var HeaderItemView, _ref;
  return HeaderItemView = (function(_super) {
    __extends(HeaderItemView, _super);

    function HeaderItemView() {
      _ref = HeaderItemView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    HeaderItemView.prototype.tagName = "th";

    HeaderItemView.prototype.className = "header-list-item";

    return HeaderItemView;

  })(Marionette.ItemView);
});
