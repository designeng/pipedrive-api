define(["backbone", "marionette"], function(Backbone, Marionette) {
  var AppRouterController;
  AppRouterController = Marionette.Object.extend({
    initialize: function() {},
    showProfilesList: function() {
      return console.log("showProfilesList");
    }
  });
  return function() {
    return new Marionette.AppRouter({
      controller: new AppRouterController,
      appRoutes: {
        "profiles": "showProfilesList"
      }
    });
  };
});
