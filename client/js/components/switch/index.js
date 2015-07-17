define(["marionette", "./switcherView", "hbs!components/switch/switchLayout"], function(Marionette, SwitcherView, switchLayoutTemplate) {
  var SwitchLayout, switchComponent, switcherView;
  switcherView = new SwitcherView();
  SwitchLayout = Marionette.LayoutView.extend({
    template: switchLayoutTemplate,
    regions: {
      selectControlRegion: "#select-control"
    },
    onRender: function() {
      return this.selectControlRegion.show(switcherView);
    },
    setSwitcherState: function(state) {
      return this.selectControlRegion.currentView.setSwitcherState(state);
    }
  });
  switchComponent = new SwitchLayout();
  return switchComponent;
});
