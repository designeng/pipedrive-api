define [
    "marionette"
    "./switcherView"
    "hbs!components/switch/switchLayout"
], (Marionette, SwitcherView, switchLayoutTemplate) ->

    switcherView = new SwitcherView()

    SwitchLayout = Marionette.LayoutView.extend
        template: switchLayoutTemplate

        regions:
            selectControlRegion: "#select-control"

        onRender: ->
            @.selectControlRegion.show switcherView

        setSwitcherState: (state) ->
            @.selectControlRegion.currentView.setSwitcherState(state)

    switchComponent = new SwitchLayout()

    return switchComponent