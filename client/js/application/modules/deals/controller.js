var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["marionette"], function(Marionette) {
  var DealsController, _ref;
  return DealsController = (function(_super) {
    __extends(DealsController, _super);

    function DealsController() {
      this.createDetails = __bind(this.createDetails, this);
      this.createList = __bind(this.createList, this);
      _ref = DealsController.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    DealsController.prototype.createList = function() {
      return this.sandbox.channel.request("list:ready", "deals", this.list);
    };

    DealsController.prototype.createDetails = function(id) {
      this.sandbox.channel.request("details:ready", "deals", this.dealsBoard.boardLayout);
      this.dealsBoard.activateById(id);
      return this.activateById(id);
    };

    DealsController.prototype.activateById = function(id) {
      return this.list.activateById(id);
    };

    return DealsController;

  })(Marionette.Object);
});
