var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['backbone', 'marionette', 'hbs!templates/board'], function(Backbone, Marionette, board) {
  var BoardView, _ref;
  return BoardView = (function(_super) {
    __extends(BoardView, _super);

    function BoardView() {
      _ref = BoardView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    BoardView.prototype.tagName = 'table';

    BoardView.prototype.template = board;

    BoardView.prototype.initialize = function() {
      return console.debug("BoardView......");
    };

    return BoardView;

  })(Marionette.CompositeView);
});
