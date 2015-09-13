var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(function() {
  var PerspectiveController;
  return PerspectiveController = (function() {
    function PerspectiveController() {
      this.showInRegion = __bind(this.showInRegion, this);
    }

    PerspectiveController.prototype.showInRegion = function(regionName, view) {
      return this[regionName].show(view);
    };

    return PerspectiveController;

  })();
});
