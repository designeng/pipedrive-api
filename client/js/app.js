define(["backbone", "marionette", "handlebars", "meld", "behaviors/index", "components/preloader/index"], function(Backbone, Marionette, Handlebars, meld, Behaviors, preloaderComponent) {
  var AppRouterController, app, appRouter, hidePreloader, loadInstance, showPreloader;
  Marionette.TemplateCache.prototype.compileTemplate = function(rawTemplate) {
    return Handlebars.compile(rawTemplate);
  };
  Marionette.Behaviors.behaviorsLookup = function() {
    return Behaviors;
  };
  hidePreloader = function() {
    return preloaderComponent.hide();
  };
  showPreloader = function() {
    return preloaderComponent.show();
  };
  loadInstance = function(ViewClass, beforeRenderCallback, afterRenderCallback) {
    beforeRenderCallback();
    return new ViewClass({
      onRenderCallback: afterRenderCallback
    });
  };
  app = new Marionette.Application();
  AppRouterController = Marionette.Object.extend({
    _populateList: function(collectionMode) {},
    initialize: function() {},
    showProfilesList: function() {
      return console.log("showProfilesList");
    }
  });
  appRouter = new Marionette.AppRouter({
    controller: new AppRouterController,
    appRoutes: {
      "profiles": "showProfilesList"
    }
  });
  app.on("start", function() {
    Backbone.history.start();
    if (Backbone.history.getFragment() !== "profiles") {
      return appRouter.navigate("#/profiles");
    }
  });
  return app;
});
