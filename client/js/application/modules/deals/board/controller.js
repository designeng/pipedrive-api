var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["underscore"], function(_) {
  var BoardController, _ref;
  return BoardController = (function(_super) {
    __extends(BoardController, _super);

    function BoardController() {
      _ref = BoardController.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    BoardController.prototype.onReady = function() {
      return console.debug("GROUPS", this.groups);
    };

    return BoardController;

  })(Marionette.Object);
});
