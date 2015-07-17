###Single-Page Application "Pipedrive profiles information"


###Description


###Demo


###Development
+ Client built on the top of Marionette.js `2.4.2v`.

###Deploy
+ Grunt task `grunt build` should be invoked before deploy to remote server. It will run all nessesary tasks `dataMainAttr:prod` (toggling `data-main` attribute in index.html), `requirejs:compile` (building all js-source into single `main` file).

###Structure description

+ `requireConfig` and `requireEnter` just two parts of `main` file and assembled together with grunt task during the development process. `requireEnter` is logic enter point for our one-page application.

+ Marionette.TemplateCache.prototype.compileTemplate was overridden because Handlebars template engine is used. 

+ Provided implementation for `Marionette.Behaviors.behaviorsLookup` to point Marionette where we stored shared Behaviors.

+ AOP approach provided by [meld.js](https://github.com/cujojs/meld) used for separation of concerns between methods within a class.

+ [TemplateHelpers](http://marionettejs.com/docs/v2.4.2/marionette.view.html#viewtemplatehelpers) used for calculating and rendering fields not presented by item view model.

+ Templates with `.html` extention loaded by [requirejs-hbs](https://github.com/epeli/requirejs-hbs) plugin. It depends on [require-text](https://github.com/requirejs/text) plugin. Path to `handlebars-compiler` defined in requirejs config.

+ Routes "contributors", "forks" synchronized with component `list` content.

+ Owner & repo name hardcoded now in `contributors` and `forks` collections url, so actually it works only with `marionettejs/backbone.marionette` repo. But later moving to a more general solution `owner/repo` fragments could be determined in a separate component to switch between repositories.

###Browsers compatibility
Tested in Chrome (v42), Safari (v7.0), Firefox (v37).

###Issues
About all found bugs please report [issues](https://github.com/designeng/....../issues).