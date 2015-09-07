var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['marionette', 'moment', 'hbs!templates/boardBodyCell'], function(Marionette, moment, boardBodyCell) {
  var ColumnCellView, _ref;
  return ColumnCellView = (function(_super) {
    __extends(ColumnCellView, _super);

    function ColumnCellView() {
      _ref = ColumnCellView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ColumnCellView.prototype.tagName = "li";

    ColumnCellView.prototype.className = "board-body-column-item";

    ColumnCellView.prototype.template = boardBodyCell;

    ColumnCellView.prototype.activeCellClass = "activeCell";

    ColumnCellView.prototype.ui = {
      'additionalInfo': '.board-body-cell-additional-info'
    };

    ColumnCellView.prototype.templateHelpers = {
      addTime: function() {
        return moment(this.add_time).format("DD MM YYYY");
      },
      stageChangeTime: function() {
        return moment(this.stage_change_time).format("DD MM YYYY");
      }
    };

    ColumnCellView.prototype.toggleActive = function(id) {
      if (parseInt(id) === parseInt(this.model.get("id"))) {
        this.$el.toggleClass(this.activeCellClass);
        return this.additionalInfo("show");
      } else {
        this.$el.removeClass(this.activeCellClass);
        return this.additionalInfo("hide");
      }
    };

    ColumnCellView.prototype.additionalInfo = function(state) {
      var effect;
      if (state === "show") {
        effect = "fast";
      }
      return this.ui.additionalInfo[state](effect);
    };

    return ColumnCellView;

  })(Marionette.ItemView);
});
