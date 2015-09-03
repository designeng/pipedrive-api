var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["underscore", "backbone", "marionette", "meld", "api"], function(_, Backbone, Marionette, meld, api) {
  var ProfilesController, _ref;
  return ProfilesController = (function(_super) {
    __extends(ProfilesController, _super);

    function ProfilesController() {
      _ref = ProfilesController.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ProfilesController.prototype.showList = function() {
      console.debug("SHOW LIST", this.list, this.list.cid);
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
        return this.personProfileRegion.show(personProfile);
      } else {
        return this.personProfileRegion.show(new this.BlankProfile);
      }
    };

    return ProfilesController;

  })(Marionette.Object);
});
