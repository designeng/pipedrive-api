var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(function() {
  var PerspectiveController;
  return PerspectiveController = (function() {
    function PerspectiveController() {
      this.showInRegion = __bind(this.showInRegion, this);
    }

    PerspectiveController.prototype.onReady = function(channel) {
      var _this = this;
      channel.on("list:ready", function(list) {
        return _this.showInRegion("sidebarRegion", list);
      });
      return channel.on("details:ready", function(details) {
        return _this.showInRegion("mainAreaRegion", details);
      });
    };

    PerspectiveController.prototype.showInRegion = function(regionName, view) {
      return this[regionName].show(view);
    };

    return PerspectiveController;

  })();
});
