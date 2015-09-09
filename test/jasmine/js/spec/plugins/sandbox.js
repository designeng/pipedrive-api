var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["wire", "when", "marionette"], function(wire, When) {
  var activateModuleSpy, sandboxCoreSpec, triggerOneRouteSpy;
  activateModuleSpy = jasmine.createSpy("activateModuleSpy");
  triggerOneRouteSpy = jasmine.createSpy("triggerOneRouteSpy");
  define('sandbox/modules/one/controller', function() {
    var OneController, _ref;
    return OneController = (function(_super) {
      __extends(OneController, _super);

      function OneController() {
        _ref = OneController.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      OneController.prototype.onReady = function() {
        return this.trigger("onready:send:something");
      };

      return OneController;

    })(Marionette.Object);
  });
  define('sandbox/modules/two/controller', function() {
    var TwoController, _ref;
    return TwoController = (function(_super) {
      __extends(TwoController, _super);

      function TwoController() {
        _ref = TwoController.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      TwoController.prototype.sendMessage = function() {
        return console.debug("sendMessage");
      };

      return TwoController;

    })(Marionette.Object);
  });
  define('sandbox/core/controller', function() {
    var CoreController, _ref;
    return CoreController = (function(_super) {
      __extends(CoreController, _super);

      function CoreController() {
        _ref = CoreController.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      CoreController.prototype.activateModule = function(id) {
        console.debug("activateModuleSpy...", id);
        return activateModuleSpy(id);
      };

      CoreController.prototype.triggerOneRoute = function(id) {
        var _this = this;
        triggerOneRouteSpy(id);
        return When(this.activateModule("two")).then(function(res) {
          _this.activateModule("two", id);
          return console.debug("RESULT:::", res);
        });
      };

      return CoreController;

    })(Marionette.Object);
  });
  define('sandbox/modules/one', {
    $plugins: ['wire/debug', 'plugins/sandbox'],
    sandbox: {
      createSandbox: {
        api: {}
      },
      eventsFlow: []
    },
    controller: {
      create: 'sandbox/modules/one/controller',
      ready: {
        onReady: {}
      }
    }
  });
  define('sandbox/modules/two', {
    $plugins: ['wire/debug', 'plugins/sandbox'],
    sandbox: {
      createSandbox: {
        api: {
          sendMessage: {
            $ref: 'controller.sendMessage'
          }
        }
      },
      eventsFlow: ["two:message"]
    },
    controller: {
      create: 'sandbox/modules/two/controller'
    }
  });
  sandboxCoreSpec = {
    $plugins: ['wire/debug', 'plugins/container/register'],
    appController: {
      create: "sandbox/core/controller",
      properties: {
        one: {
          $ref: 'one'
        },
        two: {
          $ref: 'two'
        }
      },
      registerInContainer: {
        api: ['activateModule']
      },
      ready: {
        triggerOneRoute: 123
      }
    },
    one: {
      wire: {
        spec: 'sandbox/modules/one',
        defer: true
      }
    },
    two: {
      wire: {
        spec: 'sandbox/modules/two',
        defer: true
      }
    }
  };
  return describe("sandbox plugin", function() {
    beforeEach(function(done) {
      var _this = this;
      return wire(sandboxCoreSpec).then(function(ctx) {
        _this.ctx = ctx;
        return done();
      }).otherwise(function(err) {
        return console.log("ERROR", err);
      });
    });
    it("triggerOneRouteSpy called with id 123", function(done) {
      expect(triggerOneRouteSpy).toHaveBeenCalledWith(123);
      return done();
    });
    it("activateModuleSpy called", function(done) {
      expect(activateModuleSpy).toHaveBeenCalled();
      return done();
    });
    return it("activateModuleSpy called", function(done) {
      expect(activateModuleSpy).toHaveBeenCalled();
      return done();
    });
  });
});
