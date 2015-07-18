var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['marionette', 'hbs!blocks/sidebar/template'], function(Marionette, sidebarTemplate) {
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

    Sidebar.prototype.onRender = function() {
      return console.debug("Sidebar RENDERED");
    };

    Sidebar.prototype.showList = function(view) {
      return console.debug("@getRegion('list')", this.getRegion('list'));
    };

    return Sidebar;

  })(Marionette.LayoutView);
});
