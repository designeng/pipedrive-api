define(function() {
  var AppController;
  return AppController = (function() {
    function AppController() {}

    AppController.prototype.onReady = function(deals) {
      return console.debug("DEALS::::", deals());
    };

    AppController.prototype.onRoute = function() {
      return console.debug("onRoute");
    };

    AppController.prototype.showProfilesList = function() {};

    AppController.prototype.showProfileDetailes = function() {};

    AppController.prototype.showDealsList = function() {
      return console.debug("showDealsList");
    };

    return AppController;

  })();
});
