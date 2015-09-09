define(["wire", "when"], function(wire, When) {
  var activateModuleSpy, sandboxCoreSpec, sandboxDeferred, sendMessageSpy, triggerOneRouteSpy;
  sandboxDeferred = When.defer();
  activateModuleSpy = jasmine.createSpy("activateModuleSpy");
  triggerOneRouteSpy = jasmine.createSpy("triggerOneRouteSpy");
  sendMessageSpy = jasmine.createSpy("triggerOneRouteSpy");
  define('sandbox/modules/moduleOne/controller', function() {
    var ModuleOneController;
    return ModuleOneController = (function() {
      function ModuleOneController() {}

      ModuleOneController.prototype.sendMessage = function(message) {
        sendMessageSpy(message);
        return sandboxDeferred.resolve();
      };

      return ModuleOneController;

    })();
  });
  define('sandbox/modules/moduleOne', {
    $plugins: ['wire/debug', 'plugins/sandbox'],
    sandbox: {
      createSandbox: {
        api: {
          sendMessage: {
            $ref: 'controller.sendMessage'
          }
        }
      }
    },
    controller: {
      create: 'sandbox/modules/moduleOne/controller'
    }
  });
  define('sandbox/core/controller', function() {
    var CoreController;
    return CoreController = (function() {
      function CoreController() {}

      CoreController.prototype.activateModule = function(sandbox, args) {
        activateModuleSpy();
        return sandbox.sendMessage(args[0]);
      };

      CoreController.prototype.triggerOneRoute = function(id) {
        triggerOneRouteSpy(id);
        return this.activateModule("moduleOne", id);
      };

      return CoreController;

    })();
  });
  sandboxCoreSpec = {
    $plugins: ['wire/debug', 'plugins/container/register'],
    appController: {
      create: "sandbox/core/controller",
      properties: {
        moduleOne: {
          $ref: 'moduleOne'
        }
      },
      registerInContainer: {
        sandboxIntercessors: ['activateModule']
      }
    },
    moduleOne: {
      wire: {
        spec: 'sandbox/modules/moduleOne',
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
    return it("sendMessageSpy should be called with id 123", function(done) {
      var _this = this;
      this.ctx.appController.triggerOneRoute(123);
      return When(sandboxDeferred.promise).then(function() {
        expect(triggerOneRouteSpy).toHaveBeenCalledWith(123);
        expect(activateModuleSpy).toHaveBeenCalled();
        expect(sendMessageSpy).toHaveBeenCalledWith(123);
        return done();
      });
    });
  });
});
