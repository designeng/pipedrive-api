define(["jquery", "underscore", "marionette", "meld", "utils/request/index", "utils/storage/index"], function($, _, Marionette, meld, AjaxRequest, storage) {
  var AccordionBehavior;
  return AccordionBehavior = Marionette.Behavior.extend({
    api: {
      isVoicable: function(ip, type, id) {
        return "/api/likes/" + ip + "/" + type + "/" + id;
      },
      preference: function() {
        return "/api/likes";
      },
      publicRate: function(type, id) {
        return "/api/likes/" + type + "/" + id;
      }
    },
    initialize: function() {
      this.data = {
        clientIP: storage.clientIp
      };
      this.removers = [];
      this.removers.push(meld.afterReturning(this, "onLikeClick", this.afterPreferenceClick));
      return this.removers.push(meld.afterReturning(this, "onDislikeClick", this.afterPreferenceClick));
    },
    ui: {
      "title": ".accordion-section-title",
      "like": "button.like",
      "dislike": "button.dislike",
      "likesRate": ".likes-rate",
      "dislikesRate": ".dislikes-rate"
    },
    events: {
      "click @ui.title": "onSectionTitleClick",
      "click @ui.like": "onLikeClick",
      "click @ui.dislike": "onDislikeClick"
    },
    enablePreferenceButtons: function(mode) {
      if (mode) {
        this.ui.like.removeAttr('disabled');
        return this.ui.dislike.removeAttr('disabled');
      } else {
        this.ui.like.attr('disabled', 'disabled');
        return this.ui.dislike.attr('disabled', 'disabled');
      }
    },
    onSectionTitleClick: function(event) {
      var aTagElement, closeSection, currentAttrValue, id, ip, openSection, sectionId, type,
        _this = this;
      ip = storage.clientIp;
      type = this.view.getEntityType();
      id = this.view.getEntityId();
      new AjaxRequest(this.api.isVoicable(ip, type, id), null, "GET", "application/json").done(function(result) {
        if (!result.voicable) {
          return _this.enablePreferenceButtons(false);
        } else {
          return _this.enablePreferenceButtons(true);
        }
      });
      openSection = function(selector) {
        _this.sendPublicRateRequest().then(function(res) {
          var publicRate;
          publicRate = _.reduce(res.likes, function(rate, item) {
            if (item.like === true) {
              rate[0]++;
              return rate;
            } else {
              rate[1]++;
              return rate;
            }
          }, [0, 0]);
          _this.ui.likesRate.text(publicRate[0]);
          return _this.ui.dislikesRate.text(publicRate[1]);
        });
        return $(selector).slideDown(300).addClass('open');
      };
      closeSection = function() {
        $('.accordion .accordion-section-title').removeClass('active');
        return $('.accordion .accordion-section-content').slideUp(300).removeClass('open');
      };
      aTagElement = $(event.target).closest("a");
      currentAttrValue = aTagElement.attr('href');
      sectionId = _.last(currentAttrValue.split("/"));
      if (aTagElement.is('.active')) {
        closeSection();
      } else {
        closeSection();
        aTagElement.addClass('active');
        openSection("#" + sectionId);
      }
      return event.preventDefault();
    },
    onLikeClick: function() {
      this.ui.likesRate.text(parseInt(this.ui.likesRate.text()) + 1);
      _.extend(this.data, {
        entityTYPE: this.view.getEntityType(),
        entityID: this.view.getEntityId(),
        like: true
      });
      return JSON.stringify(this.data);
    },
    onDislikeClick: function() {
      this.ui.dislikesRate.text(parseInt(this.ui.dislikesRate.text()) + 1);
      _.extend(this.data, {
        entityTYPE: this.view.getEntityType(),
        entityID: this.view.getEntityId(),
        like: false
      });
      return JSON.stringify(this.data);
    },
    afterPreferenceClick: function(data) {
      this.enablePreferenceButtons(false);
      return new AjaxRequest(this.api.preference(), data, "POST", "application/json");
    },
    sendPublicRateRequest: function() {
      var id, type;
      type = this.view.getEntityType();
      id = this.view.getEntityId();
      return new AjaxRequest(this.api.publicRate(type, id), null, "GET", "application/json");
    },
    onDestroy: function() {
      return _.each(this.removers, function(remover) {
        return remover.remove();
      });
    }
  });
});
