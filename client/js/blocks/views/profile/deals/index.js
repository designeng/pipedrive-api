var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['backbone', 'marionette', 'api', 'hbs!application/profiles/templates/deals', 'hbs!application/profiles/templates/oneDeal'], function(Backbone, Marionette, api, dealsTemplate, oneDealTemplate) {
  var PersonDealView, PersonDealsCollection, PersonDealsView, _ref, _ref1, _ref2;
  PersonDealsCollection = (function(_super) {
    __extends(PersonDealsCollection, _super);

    function PersonDealsCollection() {
      _ref = PersonDealsCollection.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    PersonDealsCollection.prototype.initialize = function(options) {
      return this.url = api.getPersonDealsUrl(options != null ? options.personId : void 0);
    };

    PersonDealsCollection.prototype.parse = function(resp) {
      return resp.data;
    };

    return PersonDealsCollection;

  })(Backbone.Collection);
  PersonDealView = (function(_super) {
    __extends(PersonDealView, _super);

    function PersonDealView() {
      _ref1 = PersonDealView.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    PersonDealView.prototype.tagName = "li";

    PersonDealView.prototype.template = oneDealTemplate;

    return PersonDealView;

  })(Marionette.ItemView);
  return PersonDealsView = (function(_super) {
    __extends(PersonDealsView, _super);

    function PersonDealsView() {
      _ref2 = PersonDealsView.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    PersonDealsView.prototype.tagName = "table";

    PersonDealsView.prototype.childViewContainer = "tbody";

    PersonDealsView.prototype.template = dealsTemplate;

    PersonDealsView.prototype.childView = PersonDealView;

    PersonDealsView.prototype.initialize = function(options) {
      this.collection = new PersonDealsCollection({
        personId: options.personId
      });
      return this.collection.fetch();
    };

    return PersonDealsView;

  })(Marionette.CompositeView);
});
