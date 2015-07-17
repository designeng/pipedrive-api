define(["marionette", "hbs!components/preloader/preloader"], function(Marionette, preloaderTemplate) {
  var PreloaderView;
  PreloaderView = Marionette.ItemView.extend({
    template: preloaderTemplate,
    hide: function() {
      return this.$el.hide();
    },
    show: function() {
      return this.$el.show();
    }
  });
  return new PreloaderView();
});
