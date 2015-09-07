define(["underscore", "backbone", "backbone.radio", "marionette", "handlebars", "behaviors/index"], function(_, Backbone, Radio, Marionette, Handlebars, Behaviors) {
  Marionette.TemplateCache.prototype.compileTemplate = function(rawTemplate) {
    console.debug("rawTemplate", rawTemplate);
    return Handlebars.compile(rawTemplate);
  };
  Marionette.TemplateCache.prototype.loadTemplate = function(templateId, options) {
    if (_.isString(templateId)) {
      return templateId;
    }
    if (!template || template.length === 0) {
      throw new Marionette.Error({
        name: 'NoTemplateError',
        message: 'Could not find template: "' + templateId + '"'
      });
    }
    return template;
  };
  Marionette.CollectionView.prototype.getChildren = function() {
    return this.children._views;
  };
  Marionette.Behaviors.behaviorsLookup = function() {
    return Behaviors;
  };
  Marionette.Application.prototype._initChannel = function() {
    this.channelName = _.result(this, 'channelName') || 'global';
    return this.channel = _.result(this, 'channel') || Radio.channel(this.channelName);
  };
  return function() {};
});
