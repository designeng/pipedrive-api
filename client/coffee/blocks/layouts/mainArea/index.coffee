define [
    'blocks/layouts/base/layout'
    'hbs!blocks/layouts/mainArea/template'
], (BaseLayout, mainAreaTemplate) ->

    class MainArea extends BaseLayout

        template: mainAreaTemplate

        regions:
            personProfile: '.person-profile'