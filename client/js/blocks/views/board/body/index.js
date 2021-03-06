var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['backbone', 'marionette', 'hbs!templates/boardBody'], function(Backbone, Marionette, boardBody) {
  var BoardBodyView, _ref;
  return BoardBodyView = (function(_super) {
    __extends(BoardBodyView, _super);

    function BoardBodyView() {
      _ref = BoardBodyView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    BoardBodyView.prototype.tagName = 'tr';

    BoardBodyView.prototype.template = boardBody;

    BoardBodyView.prototype.cells = [];

    BoardBodyView.prototype.activateById = function(id) {
      if (!this.cells.length) {
        this.cells = _.flatten(_.map(this.getChildren(), function(child) {
          return _.values(child.getChildren());
        }));
      }
      return _.each(this.cells, function(cell) {
        return cell.toggleActive(id);
      });
    };

    return BoardBodyView;

  })(Marionette.CompositeView);
});
