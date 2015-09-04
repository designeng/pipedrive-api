var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['backbone', 'marionette', 'blocks/views/base/collectionView', 'hbs!templates/boardBody'], function(Backbone, Marionette, CollectionView, boardBody) {
  var BoardBodyView, _ref;
  return BoardBodyView = (function(_super) {
    __extends(BoardBodyView, _super);

    function BoardBodyView() {
      _ref = BoardBodyView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    BoardBodyView.prototype.tagName = 'table';

    BoardBodyView.prototype.template = boardBody;

    BoardBodyView.prototype.initialize = function() {
      return console.debug("BoardView......");
    };

    return BoardBodyView;

  })(CollectionView);
});