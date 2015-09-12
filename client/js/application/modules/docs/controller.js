var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["marionette", "./models/markdownModel"], function(Marionette, MarkdownModel) {
  var DocsController, _ref;
  return DocsController = (function(_super) {
    __extends(DocsController, _super);

    function DocsController() {
      _ref = DocsController.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    DocsController.prototype.initialize = function() {
      return _.bindAll(this, 'showList', 'showDetailes');
    };

    DocsController.prototype.showList = function() {
      return this.listRegion.show(this.list);
    };

    DocsController.prototype.showDetailes = function(id) {
      if (id) {
        this.markdownLayout.fetchMarkdownDocument(id);
      }
      return id;
    };

    DocsController.prototype.activateById = function(id) {
      return this.list.activateById(id);
    };

    return DocsController;

  })(Marionette.Object);
});
