var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["underscore", "backbone", "backbone.radio", "marionette", "meld", "api"], function(_, Backbone, Radio, Marionette, meld, api) {
  var DealsController, _ref;
  return DealsController = (function(_super) {
    __extends(DealsController, _super);

    function DealsController() {
      _ref = DealsController.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    DealsController.prototype.activateById = function(id) {
      return this.list.channel.trigger("deals:list:activate", id);
    };

    return DealsController;

  })(Marionette.Object);
});