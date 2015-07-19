define(["backbone", "marionette"], function(Backbone, Marionette) {
  var AppRouterController;
  return AppRouterController = Marionette.Object.extend({
    initialize: function() {},
    showProfilesList: function() {
      this.profilesList.setChildTemplate(this.profilesListItemTemplate);
      return this.sidebar.appendToDisplay({
        regionName: 'list',
        view: this.profilesList
      });
    }
  });
});
