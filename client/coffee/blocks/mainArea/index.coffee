define [
    'blocks/base/layout'
    'hbs!blocks/mainArea/template'
], (BaseLayout, mainAreaTemplate) ->

    class MainArea extends BaseLayout

        template: mainAreaTemplate

        regions:
            personProfile: '.person-profile'