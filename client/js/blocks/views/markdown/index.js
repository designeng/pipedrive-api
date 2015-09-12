var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['backbone', 'marionette', 'showdown', 'hbs!templates/markdown'], function(Backbone, Marionette, showdown, markdownTemplate) {
  var MarkdownView, _ref;
  return MarkdownView = (function(_super) {
    __extends(MarkdownView, _super);

    function MarkdownView() {
      _ref = MarkdownView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    MarkdownView.prototype.tagName = "div";

    MarkdownView.prototype.className = "markdown";

    MarkdownView.prototype.template = markdownTemplate;

    MarkdownView.prototype.initialize = function(options) {
      this.model = options.model || new Backbone.Model();
      return this.converter = new showdown.Converter();
    };

    MarkdownView.prototype.onBeforeRender = function() {
      return this.html = this.converter.makeHtml(this.model.get("text"));
    };

    MarkdownView.prototype.onRender = function() {
      this.$el.html(this.html);
      return console.debug("onRender html", this.html);
    };

    return MarkdownView;

  })(Marionette.LayoutView);
});
