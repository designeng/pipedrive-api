var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['marionette', 'hbs!templates/boardBodyCell'], function(Marionette, boardBodyCell) {
  var BodyColumnItemView, _ref;
  return BodyColumnItemView = (function(_super) {
    __extends(BodyColumnItemView, _super);

    function BodyColumnItemView() {
      _ref = BodyColumnItemView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    BodyColumnItemView.prototype.tagName = "li";

    BodyColumnItemView.prototype.className = "board-body-column-item";

    BodyColumnItemView.prototype.template = boardBodyCell;

    BodyColumnItemView.prototype.onRender = function() {
      return console.debug("MODEL", this.model);
    };

    return BodyColumnItemView;

  })(Marionette.ItemView);
});
