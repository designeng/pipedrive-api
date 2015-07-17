define(["marionette", "moment", "hbs!components/list/fork"], function(Marionette, moment, forkTemplate) {
  var ForkItemView;
  return ForkItemView = Marionette.ItemView.extend({
    tagName: "div",
    className: "accordion-section",
    template: forkTemplate,
    templateHelpers: {
      forkedBy: function() {
        return this.full_name.split("/")[0];
      },
      originalForkName: function() {
        return this.full_name.split("/")[1];
      },
      createdAt: function() {
        return moment(this.created_at).format("DD/MM/YYYY hh:mm:ss");
      },
      updatedAt: function() {
        return moment(this.updated_at).format("DD/MM/YYYY hh:mm:ss");
      }
    },
    behaviors: {
      accordion: {}
    },
    getEntityType: function() {
      return "fork";
    },
    getEntityId: function() {
      return this.model.get("id");
    }
  });
});
