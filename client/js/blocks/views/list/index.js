var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['backbone', 'api', 'blocks/views/base/collectionView', './item'], function(Backbone, api, CollectionView, ItemView) {
  var ListView, _ref;
  return ListView = (function(_super) {
    __extends(ListView, _super);

    function ListView() {
      _ref = ListView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ListView.prototype.tagName = 'ul';

    ListView.prototype.className = 'listView';

    ListView.prototype.activeCellClass = 'active';

    ListView.prototype.childView = ItemView;

    ListView.prototype.activeElements = [];

    ListView.prototype.events = function() {
      return {
        "click li": "activateCurrent"
      };
    };

    ListView.prototype.onBeforeRender = function() {
      return this.entities = this.entity + "s";
    };

    ListView.prototype.activateCurrent = function(event) {
      var currentId, li,
        _this = this;
      li = $(event.target).closest("li");
      currentId = li.find("." + this.entity + "-name").attr("data-id");
      this.items = this.$el.find("li");
      _.each(this.items, function(item) {
        return $(item).removeClass(_this.activeCellClass);
      });
      li.addClass(this.activeCellClass);
      return window.location.href = "#/" + this.entities + "/" + currentId;
    };

    ListView.prototype.activateById = function(id) {
      var _this = this;
      this.items = this.$el.find("li");
      return _.each(this.items, function(item) {
        var $item;
        $item = $(item);
        $item.removeClass(_this.activeCellClass);
        if ($item.find("." + _this.entity + "-name").attr("data-id") === id) {
          return $item.addClass(_this.activeCellClass);
        }
      });
    };

    return ListView;

  })(CollectionView);
});
