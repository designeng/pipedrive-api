define(["wire"], function(wire) {
  var applicationCore;
  define('routerController', function() {
    var RouterController;
    return RouterController = (function() {
      function RouterController() {}

      RouterController.prototype.showProfilesList = function() {};

      RouterController.prototype.showProfileDetailes = function() {};

      return RouterController;

    })();
  });
  define('appController', function() {
    var AppController;
    return AppController = (function() {
      function AppController() {}

      AppController.prototype.onRoute = function() {};

      return AppController;

    })();
  });
  applicationCore = {
    $plugins: ["wire/debug", "plugins/marionette/router"],
    appController: {
      create: "appController"
    },
    routerController: {
      create: "routerController"
    },
    router: {
      createRouter: {
        controller: {
          $ref: 'routerController'
        },
        routes: {
          'profiles': 'showProfilesList',
          'profiles/:id': 'showProfileDetailes'
        }
      },
      onRoute: {
        $ref: 'appController.onRoute'
      }
    }
  };
  return describe("application core", function() {
    beforeEach(function(done) {
      var _this = this;
      return wire(applicationCore).then(function(ctx) {
        _this.ctx = ctx;
        return done();
      }).otherwise(function(err) {
        return console.log("ERROR", err);
      });
    });
    return it("application core should have router", function(done) {
      expect(this.ctx.router).toBeDefined();
      return done();
    });
  });
});
