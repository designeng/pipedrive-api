var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['backbone', 'marionette', 'api', 'utils/currency/converter', 'hbs!templates/deals', 'hbs!templates/oneDeal', 'hbs!templates/dealEmpty'], function(Backbone, Marionette, api, convertCurrency, dealsTemplate, oneDealTemplate, dealEmptyTemplate) {
  var PersonDealEmptyView, PersonDealView, PersonDealsCollection, PersonDealsView, _ref, _ref1, _ref2, _ref3;
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
      var deals;
      deals = _.filter(resp.data, function(deal) {
        return deal.status === "open";
      });
      return deals;
    };

    return PersonDealsCollection;

  })(Backbone.Collection);
  PersonDealView = (function(_super) {
    __extends(PersonDealView, _super);

    function PersonDealView() {
      _ref1 = PersonDealView.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    PersonDealView.prototype.tagName = "tr";

    PersonDealView.prototype.template = oneDealTemplate;

    PersonDealView.prototype.templateHelpers = {
      convertedValue: function() {
        if (this.formatted_value) {
          return convertCurrency(this.formatted_value);
        }
      }
    };

    return PersonDealView;

  })(Marionette.ItemView);
  PersonDealEmptyView = (function(_super) {
    __extends(PersonDealEmptyView, _super);

    function PersonDealEmptyView() {
      _ref2 = PersonDealEmptyView.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    PersonDealEmptyView.prototype.tagName = "tr";

    PersonDealEmptyView.prototype.template = dealEmptyTemplate;

    return PersonDealEmptyView;

  })(Marionette.ItemView);
  return PersonDealsView = (function(_super) {
    __extends(PersonDealsView, _super);

    function PersonDealsView() {
      _ref3 = PersonDealsView.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    PersonDealsView.prototype.tagName = "table";

    PersonDealsView.prototype.className = "deals-list-wrapper";

    PersonDealsView.prototype.childViewContainer = "tbody";

    PersonDealsView.prototype.template = dealsTemplate;

    PersonDealsView.prototype.childView = PersonDealView;

    PersonDealsView.prototype.emptyView = PersonDealEmptyView;

    PersonDealsView.prototype.ui = {
      preloader: ".deals-preloader"
    };

    PersonDealsView.prototype.initialize = function(options) {
      var _this = this;
      this.collection = new PersonDealsCollection({
        personId: options.personId
      });
      this.collection.fetch();
      return this.collection.on("sync", function() {
        return _this.ui.preloader.remove();
      });
    };

    return PersonDealsView;

  })(Marionette.CompositeView);
});
