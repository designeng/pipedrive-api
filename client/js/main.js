require.config({
  baseUrl: "/js",
  paths: {
    "handlebars-compiler": "vendors/handlebars/handlebars"
  },
  packages: [
    {
      name: "backbone",
      main: "backbone",
      location: "vendors/backbone"
    }, {
      name: "backbone.radio",
      main: "backbone.radio",
      location: "vendors/backbone.radio/build"
    }, {
      name: "marionette",
      main: "backbone.marionette",
      location: "vendors/marionette/lib"
    }, {
      name: "underscore",
      main: "underscore",
      location: "vendors/underscore"
    }, {
      name: "jquery",
      main: "jquery",
      location: "vendors/jquery/dist"
    }, {
      name: "handlebars",
      main: "handlebars",
      location: "vendors/handlebars"
    }, {
      name: "text",
      main: "text",
      location: "vendors/text"
    }, {
      name: "hbs",
      main: "hbs",
      location: "vendors/requirejs-hbs"
    }, {
      name: "wire",
      main: "wire",
      location: "vendors/wire"
    }, {
      name: "when",
      main: "when",
      location: "vendors/when"
    }, {
      name: "meld",
      main: "meld",
      location: "vendors/meld"
    }, {
      name: "moment",
      main: "moment",
      location: "vendors/moment"
    }
  ],
  shim: {},
  hbs: {
    templateExtension: ".html"
  }
});

require(["wire!bootstrap/spec,application/core"], function(applicationContext) {
  return applicationContext.start();
});
