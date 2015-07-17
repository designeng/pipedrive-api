define(["marionette", "./forkItemView", "./contributorItemView", "components/list/collections/forks", "components/list/collections/contributors"], function(Marionette, ForkItemView, ContributorItemView, ForksCollection, ContributorsCollection) {
  var ListCollectionView;
  return ListCollectionView = Marionette.CollectionView.extend({
    tagName: "div",
    className: "accordion",
    initialize: function() {
      return this.onRenderCallback = Marionette.getOption(this, "onRenderCallback");
    },
    getChildView: function(item) {
      if (item.get("id")) {
        return ForkItemView;
      } else {
        return ContributorItemView;
      }
    },
    setCollection: function(mode) {
      if (mode === "contributors") {
        this.collection = new ContributorsCollection();
        this.collection.fetch();
      }
      if (mode === "forks") {
        this.collection = new ForksCollection();
        return this.collection.fetch();
      }
    },
    onRender: function() {
      return this.onRenderCallback();
    }
  });
});
