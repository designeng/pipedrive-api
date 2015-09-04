var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['marionette'], function(Marionette) {
  var CollectionView, _ref;
  return CollectionView = (function(_super) {
    __extends(CollectionView, _super);

    function CollectionView() {
      _ref = CollectionView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    CollectionView.prototype.childViewOptions = function(model, index) {
      return {
        template: this.childTemplate
      };
    };

    return CollectionView;

  })(Marionette.CollectionView);
});