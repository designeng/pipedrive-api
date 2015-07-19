define(function() {
  var AppRouterController;
  return AppRouterController = (function() {
    function AppRouterController() {}

    AppRouterController.prototype.showProfilesList = function() {
      return this.profilesChannel.trigger("profiles:list:show");
    };

    AppRouterController.prototype.showProfile = function(id) {
      return this.profilesChannel.trigger("profiles:person:show", id);
    };

    return AppRouterController;

  })();
});
