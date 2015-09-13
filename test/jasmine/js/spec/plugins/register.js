var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(["wire", "when", "backbone.radio"], function(wire, When, Radio) {
  var fromModuleWithNameSpy, sandboxCoreSpec, sandboxDeferred, sendMessageSpy, startModuleSpy;
  sandboxDeferred = When.defer();
  startModuleSpy = jasmine.createSpy("startModuleSpy");
  sendMessageSpy = jasmine.createSpy("sendMessageSpy");
  fromModuleWithNameSpy = jasmine.createSpy("fromModuleWithNameSpy");
  define('sandbox/modules/moduleOne/controller', function() {
    var ModuleOneController;
    return ModuleOneController = (function() {
      function ModuleOneController() {
        this.sendMessage = __bind(this.sendMessage, this);
      }

      ModuleOneController.prototype.sendMessage = function(message) {};

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

      CoreController.prototype.startModule = function(sandbox, args) {
        startModuleSpy(args[0]);
        return sandboxDeferred.resolve(sandbox);
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
      registerIntercessors: ['startModule'],
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
  return describe("register plugin (test suite 2)", function() {
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
      this.ctx.appController.startModule("moduleOne", "some_arg");
      return When(sandboxDeferred.promise).then(function() {
        expect(startModuleSpy).toHaveBeenCalledWith("some_arg");
        return done();
      });
    });
    return it("sandbox should be an object with channel property", function(done) {
      var _this = this;
      this.ctx.appController.startModule("moduleOne");
      return When(sandboxDeferred.promise).then(function(sandbox) {
        expect(sandbox).toBeObject();
        expect(sandbox.channel).toBeObject();
        return done();
      });
    });
  });
});
