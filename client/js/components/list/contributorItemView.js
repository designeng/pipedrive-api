define(["jquery", "underscore", "marionette", "hbs!components/list/contributor"], function($, _, Marionette, contributorTemplate) {
  var ContributorItemView;
  return ContributorItemView = Marionette.ItemView.extend({
    tagName: "div",
    className: "accordion-section",
    template: contributorTemplate,
    templateHelpers: {
      avatar50x50: function() {
        return this.author.avatar_url + "&s=50";
      },
      additions: function() {
        return _.reduce(this.weeks, function(result, obj) {
          return result + obj.a;
        }, 0);
      },
      deletions: function() {
        return _.reduce(this.weeks, function(result, obj) {
          return result + obj.d;
        }, 0);
      }
    },
    behaviors: {
      accordion: {}
    },
    onBeforeRender: function() {
      var author;
      author = this.model.get("author");
      return this.model.set("avatar150x150", author.avatar_url + "&s=150");
    },
    getEntityType: function() {
      return "contributor";
    },
    getEntityId: function() {
      var author;
      author = this.model.get("author");
      return author.login;
    }
  });
});
