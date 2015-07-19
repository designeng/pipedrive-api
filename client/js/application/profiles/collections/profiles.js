var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["backbone", "api"], function(Backbone, api) {
  var ProfileModel, ProfilesCollection, _ref, _ref1;
  ProfileModel = (function(_super) {
    __extends(ProfileModel, _super);

    function ProfileModel() {
      _ref = ProfileModel.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    return ProfileModel;

  })(Backbone.Model);
  return ProfilesCollection = (function(_super) {
    __extends(ProfilesCollection, _super);

    function ProfilesCollection() {
      _ref1 = ProfilesCollection.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    ProfilesCollection.prototype.url = api.getProfilesCollectionUrl();

    ProfilesCollection.prototype.model = ProfileModel;

    ProfilesCollection.prototype.parse = function(resp, options) {
      return resp.data;
    };

    return ProfilesCollection;

  })(Backbone.Collection);
});
