var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(["wire", "when", "backbone.radio"], function(wire, When, Radio) {
  var interactWithModuleSpy, radioChannelCommunicationSpy, sandboxCoreSpec, sandboxDeferred, sendMessageSpy, triggerOneRouteSpy;
  sandboxDeferred = When.defer();
  interactWithModuleSpy = jasmine.createSpy("interactWithModuleSpy");
  triggerOneRouteSpy = jasmine.createSpy("triggerOneRouteSpy");
  sendMessageSpy = jasmine.createSpy("triggerOneRouteSpy");
  radioChannelCommunicationSpy = jasmine.createSpy("radioChannelCommunicationSpy");
  define('sandbox/modules/moduleOne/controller', function() {
    var ModuleOneController;
    return ModuleOneController = (function() {
      function ModuleOneController() {
        this.sendMessage = __bind(this.sendMessage, this);
      }

      ModuleOneController.prototype.sendMessage = function(message) {
        this.channel.trigger("to:container:from:one", "Hello from moduleOne");
        sendMessageSpy(message);
        return sandboxDeferred.resolve();
      };

      return ModuleOneController;

    })();
  });
  define('sandbox/modules/moduleOne', {
    $plugins: ['wire/debug', 'plugins/container/sandbox'],
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
      create: 'sandbox/modules/moduleOne/controller',
      properties: {
        channel: {
          $ref: '_radio.channel'
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
        triggerOneRouteSpy(id);
        return this.interactWithModule("moduleOne", id);
      };

      CoreController.prototype.listenToModule = function() {
        return this.container.containerChannel.on("to:container:from:one", function(data) {
          return radioChannelCommunicationSpy(data);
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
    return it("sendMessageSpy should be called with id 123", function(done) {
      var _this = this;
      this.ctx.appController.triggerOneRoute(123);
      return When(sandboxDeferred.promise).then(function() {
        expect(triggerOneRouteSpy).toHaveBeenCalledWith(123);
        expect(interactWithModuleSpy).toHaveBeenCalled();
        expect(sendMessageSpy).toHaveBeenCalledWith(123);
        expect(radioChannelCommunicationSpy).toHaveBeenCalledWith("Hello from moduleOne");
        return done();
      });
    });
  });
});
