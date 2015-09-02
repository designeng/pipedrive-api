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

    ListView.prototype.events = function() {
      return {
        "click li": "activateCurrent"
      };
    };

    ListView.prototype.onBeforeRender = function() {
      this.collection.add(new Backbone.Model());
      return this.entities = this.entity + "s";
    };

    ListView.prototype.onRender = function() {
      var _this = this;
      return this.channel.on("" + this.entities + ":list:activate", function(id) {
        return _this.activateById(id);
      });
    };

    ListView.prototype.activateCurrent = function(event) {
      var currentId, li;
      li = $(event.target).closest("li");
      currentId = li.find("." + this.entity + "-name").attr("data-id");
      this.items = this.$el.find("li");
      _.each(this.items, function(item) {
        return $(item).removeClass("active");
      });
      li.addClass("active");
      return window.location.href = "#/" + this.entities + "/" + currentId;
    };

    ListView.prototype.activateById = function(id) {
      var _this = this;
      this.items = this.$el.find("li");
      return _.each(this.items, function(item) {
        var $item;
        $item = $(item);
        $item.removeClass("active");
        if (parseInt($item.find("." + _this.entity + "-name").attr("data-id")) === parseInt(id)) {
          return $item.addClass("active");
        }
      });
    };

    ListView.prototype.setChildTemplate = function(tpl) {
      return this.childTemplate = tpl;
    };

    ListView.prototype.childViewOptions = function(model, index) {
      return {
        template: this.childTemplate
      };
    };

    return ListView;

  })(Marionette.CollectionView);
});
