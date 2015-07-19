var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['blocks/layouts/base/layout', 'hbs!blocks/layouts/mainArea/template'], function(BaseLayout, mainAreaTemplate) {
  var MainArea, _ref;
  return MainArea = (function(_super) {
    __extends(MainArea, _super);

    function MainArea() {
      _ref = MainArea.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    MainArea.prototype.template = mainAreaTemplate;

    MainArea.prototype.regions = {
      personProfile: '.person-profile'
    };

    return MainArea;

  })(BaseLayout);
});
