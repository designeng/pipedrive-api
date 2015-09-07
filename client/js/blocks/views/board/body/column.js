var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['marionette', 'blocks/views/board/body/cell'], function(Marionette, ColumnCellView) {
  var ColumnView, _ref;
  return ColumnView = (function(_super) {
    __extends(ColumnView, _super);

    function ColumnView() {
      _ref = ColumnView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ColumnView.prototype.tagName = 'td';

    ColumnView.prototype.childViewContainer = 'ul';

    ColumnView.prototype.childView = ColumnCellView;

    ColumnView.prototype.template = '<ul></ul>';

    return ColumnView;

  })(Marionette.CompositeView);
});
