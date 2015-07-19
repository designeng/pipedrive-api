var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["underscore", 'marionette', 'hbs!blocks/sidebar/template'], function(_, Marionette, sidebarTemplate) {
  var Sidebar, _ref;
  return Sidebar = (function(_super) {
    __extends(Sidebar, _super);

    function Sidebar() {
      _ref = Sidebar.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Sidebar.prototype.template = sidebarTemplate;

    Sidebar.prototype.regions = {
      list: '.list'
    };

    Sidebar.prototype.displayQueue = [];

    Sidebar.prototype.onRender = function() {
      var _this = this;
      return _.each(this.displayQueue, function(obj) {
        return _this.getRegion(obj.regionName).show(obj.view);
      });
    };

    Sidebar.prototype.appendToDisplay = function(displayObject) {
      return this.displayQueue.push(displayObject);
    };

    return Sidebar;

  })(Marionette.LayoutView);
});
