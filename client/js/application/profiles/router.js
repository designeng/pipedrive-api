define(["backbone", "marionette", "backbone.radio"], function(Backbone, Marionette, Radio) {
  var AppRouterController, globalChannel;
  globalChannel = Radio.channel('global');
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
