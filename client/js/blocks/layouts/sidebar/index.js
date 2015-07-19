var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['blocks/layouts/base/layout', 'hbs!blocks/layouts/sidebar/template'], function(BaseLayout, sidebarTemplate) {
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

    return Sidebar;

  })(BaseLayout);
});
