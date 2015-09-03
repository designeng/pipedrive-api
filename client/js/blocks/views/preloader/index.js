var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['marionette', 'hbs!templates/preloader'], function(Marionette, preloader) {
  var PreloaderView, _ref;
  return PreloaderView = (function(_super) {
    __extends(PreloaderView, _super);

    function PreloaderView() {
      _ref = PreloaderView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    PreloaderView.prototype.template = preloader;

    return PreloaderView;

  })(Marionette.ItemView);
});
