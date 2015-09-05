var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["backbone", "api"], function(Backbone, api) {
  var DealsCollection, DealsModel, _ref, _ref1;
  DealsModel = (function(_super) {
    __extends(DealsModel, _super);

    function DealsModel() {
      _ref = DealsModel.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    return DealsModel;

  })(Backbone.Model);
  return DealsCollection = (function(_super) {
    __extends(DealsCollection, _super);

    function DealsCollection() {
      _ref1 = DealsCollection.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    DealsCollection.prototype.url = api.getDealsCollectionUrl();

    DealsCollection.prototype.model = DealsModel;

    DealsCollection.prototype.parse = function(resp) {
      resp.data = _.map(resp.data, function(item) {
        var organization;
        organization = _.find(resp.related_objects.organization, {
          id: item.id
        });
        if (organization) {
          item.organization = organization;
        }
        return item;
      });
      return resp.data;
    };

    return DealsCollection;

  })(Backbone.Collection);
});
