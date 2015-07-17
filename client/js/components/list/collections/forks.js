define(["backbone"], function(Backbone) {
  var Fork, ForksCollection;
  Fork = Backbone.Model.extend({});
  return ForksCollection = Backbone.Collection.extend({
    url: "https://api.github.com/repos/marionettejs/backbone.marionette/forks",
    model: Fork,
    comparator: function(model) {
      var date;
      date = new Date(model.get("created_at"));
      return -date.getTime();
    }
  });
});
