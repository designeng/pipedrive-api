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

    AppController.prototype.showProfilesList = function() {
      return console.debug("RouterController::showProfilesList");
    };

    AppController.prototype.showProfileDetailes = function(id) {
      return console.debug("RouterController::showProfileDetailes", id);
    };

    AppController.prototype.showDealsList = function() {
      return console.debug("RouterController::showDealsList");
    };

    AppController.prototype.showDealsDetailes = function(id) {
      return console.debug("RouterController::showDealsDetailes", id);
    };

    return AppController;

  })();
});
