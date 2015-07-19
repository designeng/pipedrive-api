var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['backbone', 'api', './item'], function(Backbone, api, ItemView) {
  var ListView, _ref;
  return ListView = (function(_super) {
    __extends(ListView, _super);

    function ListView() {
      _ref = ListView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ListView.prototype.tagName = 'ul';

    ListView.prototype.className = 'listView';

    ListView.prototype.childView = ItemView;

    ListView.prototype.initialize = function() {};

    ListView.prototype.setChildTemplate = function(tpl) {
      return this.childTemplate = tpl;
    };

    ListView.prototype.childViewOptions = function(model, index) {
      return {
        template: this.childTemplate
      };
    };

    ListView.prototype.onBeforeRender = function() {
      return this.collection.fetch();
    };

    ListView.prototype.onRender = function() {
      return console.debug('RENDERED ListView');
    };

    return ListView;

  })(Marionette.CollectionView);
});
