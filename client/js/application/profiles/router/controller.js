define(["backbone", "marionette"], function(Backbone, Marionette) {
  var AppRouterController;
  return AppRouterController = Marionette.Object.extend({
    initialize: function() {},
    showProfilesList: function() {
      return this.sidebar.showList(this.profilesList);
    }
  });
});
