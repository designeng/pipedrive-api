var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(["wire", "when", "backbone.radio"], function(wire, When, Radio) {
  var fromModuleWithNameSpy, interactWithModuleSpy, sandboxCoreSpec, sandboxDeferred, sendMessageSpy;
  sandboxDeferred = When.defer();
  interactWithModuleSpy = jasmine.createSpy("interactWithModuleSpy");
  sendMessageSpy = jasmine.createSpy("sendMessageSpy");
  fromModuleWithNameSpy = jasmine.createSpy("fromModuleWithNameSpy");
  define('sandbox/modules/moduleOne/controller', function() {
    var ModuleOneController;
    return ModuleOneController = (function() {
      function ModuleOneController() {
        this.sendMessage = __bind(this.sendMessage, this);
      }

      ModuleOneController.prototype.sendMessage = function(message) {
        this.sandbox.channel.request("to:container:from:module", "moduleOne", "Hello from moduleOne");
        sendMessageSpy(message);
        return sandboxDeferred.resolve();
      };

      return ModuleOneController;

    })();
  });
  define('sandbox/modules/moduleOne', {
    $plugins: ['wire/debug'],
    publicApi: {
      literal: {
        sendMessage: {
          $ref: 'controller.sendMessage'
        }
      }
    },
    controller: {
      create: 'sandbox/modules/moduleOne/controller',
      properties: {
        sandbox: {
          $ref: 'sandbox'
        }
      }
    }
  });
  define('sandbox/core/controller', function() {
    var CoreController;
    return CoreController = (function() {
      function CoreController() {}

      CoreController.prototype.interactWithModule = function(sandbox, args) {
        interactWithModuleSpy();
        return sandbox.sendMessage(args[0]);
      };

      CoreController.prototype.triggerOneRoute = function(id) {
        return this.interactWithModule("moduleOne", id);
      };

      CoreController.prototype.listenToModule = function() {
        return this.container.channel.on("to:container:from:module", function(name, data) {
          return fromModuleWithNameSpy(name, data);
        });
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
      registerIntercessors: ['interactWithModule'],
      ready: {
        listenToModule: {}
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
    it("intercessor should interact directly with module sandbox", function(done) {
      var _this = this;
      this.ctx.appController.triggerOneRoute(123);
      return When(sandboxDeferred.promise).then(function() {
        expect(interactWithModuleSpy).toHaveBeenCalled();
        expect(sendMessageSpy).toHaveBeenCalledWith(123);
        return done();
      });
    });
    return it("communication module - core", function(done) {
      var _this = this;
      this.ctx.appController.triggerOneRoute(123);
      return When(sandboxDeferred.promise).then(function() {
        expect(fromModuleWithNameSpy).toHaveBeenCalledWith("moduleOne", "Hello from moduleOne");
        return done();
      });
    });
  });
});
