var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["marionette"], function(Marionette) {
  var ProfilesController, _ref;
  return ProfilesController = (function(_super) {
    __extends(ProfilesController, _super);

    function ProfilesController() {
      this.showProfileDetailes = __bind(this.showProfileDetailes, this);
      this.showList = __bind(this.showList, this);
      _ref = ProfilesController.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ProfilesController.prototype.onReady = function() {
      return console.debug("controller READY");
    };

    ProfilesController.prototype.showList = function() {
      return this.listRegion.show(this.list);
    };

    ProfilesController.prototype.activateById = function(id) {
      return this.list.activateById(id);
    };

    ProfilesController.prototype.showProfileDetailes = function(personId) {
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
        this.personProfileRegion.show(personProfile);
      } else {
        this.personProfileRegion.show(new this.BlankProfile);
      }
      this.activateById(personId);
      return personId;
    };

    return ProfilesController;

  })(Marionette.Object);
});
