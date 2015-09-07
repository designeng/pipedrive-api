var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['marionette'], function(Marionette) {
  var HeaderCellView, _ref;
  return HeaderCellView = (function(_super) {
    __extends(HeaderCellView, _super);

    function HeaderCellView() {
      _ref = HeaderCellView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    HeaderCellView.prototype.tagName = "th";

    HeaderCellView.prototype.className = "header-list-item";

    return HeaderCellView;

  })(Marionette.ItemView);
});
