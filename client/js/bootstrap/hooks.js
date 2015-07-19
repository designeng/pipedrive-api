define(["underscore", "backbone", "backbone.radio", "marionette", "handlebars", "behaviors/index"], function(_, Backbone, Radio, Marionette, Handlebars, Behaviors) {
  Marionette.TemplateCache.prototype.compileTemplate = function(rawTemplate) {
    return Handlebars.compile(rawTemplate);
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
