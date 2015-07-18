var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['marionette', 'hbs!blocks/mainArea/template'], function(Marionette, mainAreaTemplate) {
  var MainArea, _ref;
  return MainArea = (function(_super) {
    __extends(MainArea, _super);

    function MainArea() {
      _ref = MainArea.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    MainArea.prototype.template = mainAreaTemplate;

    MainArea.prototype.showView = function(view) {
      return console.debug("------MainArea", view);
    };

    return MainArea;

  })(Marionette.LayoutView);
});
