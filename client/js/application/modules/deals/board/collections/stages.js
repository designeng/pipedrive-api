var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["backbone", "api"], function(Backbone, api) {
  var StagesCollection, StagesModel, _ref, _ref1;
  StagesModel = (function(_super) {
    __extends(StagesModel, _super);

    function StagesModel() {
      _ref = StagesModel.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    return StagesModel;

  })(Backbone.Model);
  return StagesCollection = (function(_super) {
    __extends(StagesCollection, _super);

    function StagesCollection() {
      _ref1 = StagesCollection.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    StagesCollection.prototype.url = api.getStagesCollectionUrl();

    StagesCollection.prototype.model = StagesModel;

    StagesCollection.prototype.parse = function(resp) {
      console.debug("STAGES RESP", resp);
      return resp.data;
    };

    return StagesCollection;

  })(Backbone.Collection);
});
