define [
    "marionette"
    "backbone"
    "underscore"
    "hbs!components/switch/switcherView"
], (Marionette, Backbone, _, switcherViewTemplate) ->

    SwitcherView = Marionette.ItemView.extend
        template: switcherViewTemplate

        setSwitcherState: (state) ->
            @ui.state.text state

        ui:
            "switcher"  : "#switcher-ui"
            "item"      : "ul.dropdown li"
            "state"     : "span.switcher-current-state"

        events:
            "click @ui.switcher"    : "onSwitcherClick"
            "click @ui.item"        : "onItemSelect"

        onSwitcherClick: (event) ->
            $(event.target).toggleClass('active')
            event.stopPropagation()

        onItemSelect: (event) ->
            @ui.state.text $(event.target).text().toLowerCase()
            @$el.find(".switcher-wrapper").removeClass('active')