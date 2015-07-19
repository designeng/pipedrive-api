define(["backbone", "marionette"], function(Backbone, Marionette) {
  var Application;
  return Application = (function() {
    function Application() {
      var app;
      app = new Marionette.Application();
      app.addRegions({
        navigationRegion: ".navigation",
        sidebarRegion: ".sidebar",
        mainAreaRegion: ".main-area"
      });
      app.on("start", function() {
        Backbone.history.start();
        this.sidebarRegion.show(this.sidebar);
        if (Backbone.history.getFragment() !== "profiles") {
          return this.router.navigate("#/profiles");
        }
      });
      return app;
    }

    return Application;

  })();
});
