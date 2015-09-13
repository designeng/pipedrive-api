var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["marionette"], function(Marionette) {
  var ProfilesController, _ref;
  return ProfilesController = (function(_super) {
    __extends(ProfilesController, _super);

    function ProfilesController() {
      this.createList = __bind(this.createList, this);
      this.createDetails = __bind(this.createDetails, this);
      _ref = ProfilesController.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ProfilesController.prototype.activateById = function(id) {
      return this.list.activateById(id);
    };

    ProfilesController.prototype.createDetails = function(personId) {
      var model, personProfile;
      model = this.collection.find(function(model) {
        return model.get('id') === parseInt(personId);
      });
      if (model) {
        personProfile = new this.PersonProfile({
          model: model,
          PersonProfileDeals: this.PersonProfileDeals,
          personId: personId
        });
        this.sandbox.channel.request("details:ready", "profiles", personProfile);
      } else {
        this.sandbox.channel.request("details:ready", "profiles", new this.BlankProfile);
      }
      this.activateById(personId);
      return personId;
    };

    ProfilesController.prototype.createList = function() {
      return this.sandbox.channel.request("list:ready", "profiles", this.list);
    };

    return ProfilesController;

  })(Marionette.Object);
});
