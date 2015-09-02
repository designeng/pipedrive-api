define(function() {
  var RouterController;
  return RouterController = (function() {
    function RouterController() {}

    RouterController.prototype.showProfilesList = function() {
      return console.debug("RouterController::showProfilesList");
    };

    RouterController.prototype.showProfileDetailes = function(id) {
      return console.debug("RouterController::showProfileDetailes", id);
    };

    RouterController.prototype.showDealsList = function() {
      return console.debug("RouterController::showDealsList");
    };

    RouterController.prototype.showDealsDetailes = function(id) {
      return console.debug("RouterController::showDealsDetailes", id);
    };

    return RouterController;

  })();
});
