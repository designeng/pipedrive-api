var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['blocks/views/base/collectionView', 'hbs!templates/boardHeader', './cell'], function(CollectionView, boardHeader, HeaderCellView) {
  var BoardHeaderView, _ref;
  return BoardHeaderView = (function(_super) {
    __extends(BoardHeaderView, _super);

    function BoardHeaderView() {
      _ref = BoardHeaderView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    BoardHeaderView.prototype.tagName = "tr";

    BoardHeaderView.prototype.template = boardHeader;

    BoardHeaderView.prototype.childView = HeaderCellView;

    return BoardHeaderView;

  })(CollectionView);
});
