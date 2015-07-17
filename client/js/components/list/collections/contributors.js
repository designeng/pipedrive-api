define(["backbone"], function(Backbone) {
  var Contributor, ContributorsCollection;
  Contributor = Backbone.Model.extend({});
  return ContributorsCollection = Backbone.Collection.extend({
    url: "https://api.github.com/repos/marionettejs/backbone.marionette/stats/contributors",
    model: Contributor,
    comparator: function(model) {
      return -model.get("total");
    },
    modelId: function(attrs) {
      return attrs.author.login;
    }
  });
});
