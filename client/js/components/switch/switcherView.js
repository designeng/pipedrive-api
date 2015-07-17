define(["marionette", "backbone", "underscore", "hbs!components/switch/switcherView"], function(Marionette, Backbone, _, switcherViewTemplate) {
  var SwitcherView;
  return SwitcherView = Marionette.ItemView.extend({
    template: switcherViewTemplate,
    setSwitcherState: function(state) {
      return this.ui.state.text(state);
    },
    ui: {
      "switcher": "#switcher-ui",
      "item": "ul.dropdown li",
      "state": "span.switcher-current-state"
    },
    events: {
      "click @ui.switcher": "onSwitcherClick",
      "click @ui.item": "onItemSelect"
    },
    onSwitcherClick: function(event) {
      $(event.target).toggleClass('active');
      return event.stopPropagation();
    },
    onItemSelect: function(event) {
      this.ui.state.text($(event.target).text().toLowerCase());
      return this.$el.find(".switcher-wrapper").removeClass('active');
    }
  });
});
