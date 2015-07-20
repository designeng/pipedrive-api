define [
    'marionette'
    'moment'
    'hbs!application/profiles/templates/profileDetails'
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
            console.debug "INIT PROFILE"

        regions:
            dealsRegion: ".person-deals-wrapper"

        # phone
        # email
        # added (add_time)
        # open deals (open_deals_count)
        # next activity (next_activity_date)
        # last activity (last_activity_date)
        templateHelpers:
            pphone: ->
                ph = _.find @phone, {primary: true}
                if ph and ph.length
                    ph 
                else
                    "no phone"
            mail: ->
                @email.shift()?.value
            added: ->
                moment(@add_time).format("DD MM YYYY")
            openDealsCount: ->
                @open_deals_count
            nextActivity: ->
                formatActivity(@next_activity_date)
            lastActivity: ->
                formatActivity(@last_activity_date)

        onClose: ->
            console.debug "onClose"