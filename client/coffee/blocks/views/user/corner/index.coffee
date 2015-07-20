define [
    'marionette'
    'moment'
    'hbs!application/profiles/templates/userCorner'
], (Marionette, moment, userCornerTemplate) ->

    class UserCornerView extends Marionette.ItemView
        tagName: "div"
        className: "user-corner"

        template: userCornerTemplate

        templateHelpers:
            pphone: ->