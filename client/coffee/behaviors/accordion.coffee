define [
    "jquery"
    "underscore"
    "marionette"
    "meld"
    "utils/request/index"
    "utils/storage/index"
], ($, _, Marionette, meld, AjaxRequest, storage) ->

    AccordionBehavior = Marionette.Behavior.extend

        api:
            isVoicable: (ip, type, id) ->
                return "/api/likes/#{ip}/#{type}/#{id}"
            preference: ->
                return "/api/likes"
            publicRate: (type, id) ->
                return "/api/likes/#{type}/#{id}"

        initialize: ->
            @.data = 
                clientIP    : storage.clientIp

            @.removers = []
            @.removers.push meld.afterReturning @, "onLikeClick", @.afterPreferenceClick
            @.removers.push meld.afterReturning @, "onDislikeClick", @.afterPreferenceClick

        ui:
            "title"         : ".accordion-section-title"
            "like"          : "button.like"
            "dislike"       : "button.dislike"
            "likesRate"     : ".likes-rate"
            "dislikesRate"  : ".dislikes-rate"

        events:
            "click @ui.title"   : "onSectionTitleClick"
            "click @ui.like"    : "onLikeClick"
            "click @ui.dislike" : "onDislikeClick"

        enablePreferenceButtons: (mode) ->
            if mode
                @ui.like.removeAttr('disabled')
                @ui.dislike.removeAttr('disabled')
            else
                @ui.like.attr('disabled','disabled')
                @ui.dislike.attr('disabled','disabled')

        onSectionTitleClick: (event) ->
            ip      = storage.clientIp
            type    = @.view.getEntityType()
            id      = @.view.getEntityId()

            new AjaxRequest(@api.isVoicable(ip, type, id), null , "GET", "application/json").done (result) =>
                if !result.voicable
                    @enablePreferenceButtons false
                else
                    @enablePreferenceButtons true

            openSection = (selector) =>
                @.sendPublicRateRequest().then (res) =>
                    publicRate = _.reduce res.likes, (rate, item) ->
                        if item.like == true
                            rate[0]++
                            return rate
                        else
                            rate[1]++
                            return rate
                    , [0, 0]

                    @ui.likesRate.text publicRate[0]
                    @ui.dislikesRate.text publicRate[1]

                $(selector).slideDown(300).addClass('open')

            closeSection = ->
                $('.accordion .accordion-section-title').removeClass('active')
                $('.accordion .accordion-section-content')
                    .slideUp(300)
                    .removeClass('open')

            aTagElement = $(event.target).closest("a")
            currentAttrValue = aTagElement.attr('href')
            sectionId = _.last currentAttrValue.split("/")

            if aTagElement.is('.active')
                closeSection()
            else 
                closeSection()

                aTagElement.addClass('active')
                openSection("##{sectionId}")

            event.preventDefault()

        onLikeClick: ->
            @ui.likesRate.text parseInt(@ui.likesRate.text()) + 1
            _.extend @.data, {entityTYPE: @.view.getEntityType(), entityID: @.view.getEntityId(), like: true}
            return JSON.stringify @.data

        onDislikeClick: ->
            @ui.dislikesRate.text parseInt(@ui.dislikesRate.text()) + 1
            _.extend @.data, {entityTYPE: @.view.getEntityType(), entityID: @.view.getEntityId(), like: false}
            return JSON.stringify @.data

        afterPreferenceClick: (data) ->
            @enablePreferenceButtons false
            new AjaxRequest(@api.preference(), data, "POST", "application/json")

        sendPublicRateRequest: ->
            type    = @.view.getEntityType()
            id      = @.view.getEntityId()
            new AjaxRequest(@api.publicRate(type, id), null , "GET", "application/json")

        onDestroy: ->
            _.each @.removers, (remover) ->
                remover.remove()
