var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["marionette"], function(Marionette) {
  var DealsController, _ref;
  return DealsController = (function(_super) {
    __extends(DealsController, _super);

    function DealsController() {
      _ref = DealsController.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    DealsController.prototype.initialize = function() {
      return _.bindAll(this, 'showList', 'showDealDetailes');
    };

    DealsController.prototype.showList = function() {
      return this.listRegion.show(this.list);
    };

    DealsController.prototype.showDealDetailes = function(id) {
      this.dealsBoard.activateById(id);
      this.activateById(id);
      return id;
    };

    DealsController.prototype.activateById = function(id) {
      this.list.activateById(id);
      return this.sandbox.channel.request("item:activated", "deals", id);
    };

    return DealsController;

  })(Marionette.Object);
});
