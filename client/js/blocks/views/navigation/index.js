var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['marionette'], function(Marionette) {
  var Navigation, _ref;
  return Navigation = (function(_super) {
    __extends(Navigation, _super);

    function Navigation() {
      _ref = Navigation.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Navigation.prototype.showNavigation = function(view) {};

    return Navigation;

  })(Marionette.LayoutView);
});
