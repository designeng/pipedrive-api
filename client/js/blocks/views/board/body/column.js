var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['marionette', 'blocks/views/board/header/item', 'hbs!templates/boardBodyCell'], function(Marionette, ItemView, cell) {
  var ColumnView, _ref;
  return ColumnView = (function(_super) {
    __extends(ColumnView, _super);

    function ColumnView() {
      _ref = ColumnView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ColumnView.prototype.tagName = "ul";

    ColumnView.prototype.className = "column-item";

    ColumnView.prototype.childView = ItemView;

    ColumnView.prototype.childViewOptions = function(model, index) {
      return {
        template: cell
      };
    };

    return ColumnView;

  })(Marionette.CollectionView);
});