var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['marionette', 'moment', 'hbs!templates/profileDetails'], function(Marionette, moment, profileDetailsTemplate) {
  var ProfileView, formatActivity, _ref;
  formatActivity = function(activityDate) {
    var m;
    m = moment(activityDate);
    if (m.isValid()) {
      return m.format("DD MM YYYY");
    } else {
      return "no activity";
    }
  };
  return ProfileView = (function(_super) {
    __extends(ProfileView, _super);

    function ProfileView() {
      _ref = ProfileView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ProfileView.prototype.tagName = "div";

    ProfileView.prototype.className = "profile-details";

    ProfileView.prototype.template = profileDetailsTemplate;

    ProfileView.prototype.initialize = function(options) {
      this.PersonProfileDeals = options.PersonProfileDeals;
      return this.personId = options.personId;
    };

    ProfileView.prototype.regions = {
      dealsRegion: ".person-deals-wrapper"
    };

    ProfileView.prototype.templateHelpers = {
      pphone: function() {
        var ph;
        ph = _.find(this.phone, {
          primary: true
        });
        if (ph && ph.value) {
          return ph.value;
        } else {
          return "no phone";
        }
      },
      mail: function() {
        var _ref1;
        return (_ref1 = this.email[0]) != null ? _ref1.value : void 0;
      },
      added: function() {
        return moment(this.add_time).format("DD MM YYYY");
      },
      openDealsCount: function() {
        return this.open_deals_count;
      },
      nextActivity: function() {
        return formatActivity(this.next_activity_date);
      },
      lastActivity: function() {
        return formatActivity(this.last_activity_date);
      }
    };

    ProfileView.prototype.onRender = function() {
      this.personProfileDeals = new this.PersonProfileDeals({
        personId: this.personId
      });
      return this.dealsRegion.show(this.personProfileDeals);
    };

    return ProfileView;

  })(Marionette.LayoutView);
});
