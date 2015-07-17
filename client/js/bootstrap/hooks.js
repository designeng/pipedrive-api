define(["backbone", "marionette", "handlebars", "behaviors/index"], function(Backbone, Marionette, Handlebars, Behaviors) {
  Marionette.TemplateCache.prototype.compileTemplate = function(rawTemplate) {
    console.debug("......Marionette.TemplateCache::compileTemplate");
    return Handlebars.compile(rawTemplate);
  };
  Marionette.Behaviors.behaviorsLookup = function() {
    console.debug("Marionette.Behaviors.behaviorsLookup");
    return Behaviors;
  };
  return function() {};
});
