var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["underscore", "marionette"], function(_, Marionette) {
  var BaseLayout, _ref;
  return BaseLayout = (function(_super) {
    __extends(BaseLayout, _super);

    function BaseLayout() {
      _ref = BaseLayout.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    BaseLayout.prototype.displayQueue = [];

    BaseLayout.prototype.appendToDisplay = function(displayObject) {
      return this.displayQueue.push(displayObject);
    };

    BaseLayout.prototype.onRender = function() {
      var _this = this;
      return _.each(this.displayQueue, function(obj) {
        return _this.getRegion(obj.regionName).show(obj.view);
      });
    };

    return BaseLayout;

  })(Marionette.LayoutView);
});
