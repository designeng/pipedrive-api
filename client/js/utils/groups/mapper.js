define(["backbone"], function(Backbone) {
  return function(item, index) {
    return {
      id: index,
      collection: new Backbone.Collection(item)
    };
  };
});
