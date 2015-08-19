define [
    'marionette'
    'moment'
    'hbs!templates/profileDetails'
], (Marionette, moment, profileDetailsTemplate) ->

    formatActivity = (activityDate) ->
        m = moment(activityDate)
        if m.isValid()
            m.format("DD MM YYYY")
        else
            "no activity"

    class ProfileView extends Marionette.LayoutView
        tagName: "div"
        className: "profile-details"

        template: profileDetailsTemplate

        initialize: (options) ->
            @PersonProfileDeals = options.PersonProfileDeals
            @personId = options.personId

        regions:
            dealsRegion: ".person-deals-wrapper"

        templateHelpers:
            pphone: ->
                ph = _.find @phone, {primary: true}
                if ph and ph.value
                    return ph.value 
                else
                    "no phone"
            mail: ->
                @email[0]?.value
            added: ->
                moment(@add_time).format("DD MM YYYY")
            openDealsCount: ->
                @open_deals_count
            nextActivity: ->
                formatActivity(@next_activity_date)
            lastActivity: ->
                formatActivity(@last_activity_date)

        onRender: ->
            @personProfileDeals = new @PersonProfileDeals({personId: @personId})
            @dealsRegion.show @personProfileDeals