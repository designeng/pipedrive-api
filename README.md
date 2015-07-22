###Single-Page Application "Pipedrive profiles information"


###Description
The one-page application provides interaction with [pipedrive.com API](https://developers.pipedrive.com/v1).


###Demo
https://pipedrive-api.herokuapp.com/#/profiles/1
(Note: it's unbelievable slow on heroku - but it's very fast on localhost, so do not hesitate to do `git clone`, `npm install`, `bower install` and `grunt` commands to view the application in your favorite browser (I belive it's Chrome :): `http://localhost:7788/#/profiles/1`)

###Development
+ Client built on the top of Marionette.js `2.4.2v`. Wire.js used for creating DSL application scecification: it plays as composition layer.

+ Do not forget uncomment index.html livereload script for connect livereload interaction (TODO: automate it on deploy/development).

###Deploy
+ Grunt task `grunt build` should be invoked before deploy to remote server. It will run all nessesary tasks `dataMainAttr:prod` (toggling `data-main` attribute in index.html), `requirejs:compile` (building all js-source into single `main` file).

###Structure description

+ `requireConfig` and `requireEnter` just two parts of `main` file and assembled together with grunt task during the development process. `requireEnter` is logic enter point for our one-page application.

+ Marionette.TemplateCache.prototype.compileTemplate was overridden because Handlebars template engine is used. 

+ Provided implementation for `Marionette.Behaviors.behaviorsLookup` to point Marionette where we stored shared Behaviors.

+ [TemplateHelpers](http://marionettejs.com/docs/v2.4.2/marionette.view.html#viewtemplatehelpers) used for calculating and rendering fields not presented by item view model.

+ Templates with `.html` extention loaded by [requirejs-hbs](https://github.com/epeli/requirejs-hbs) plugin. It depends on [require-text](https://github.com/requirejs/text) plugin. Path to `handlebars-compiler` defined in requirejs config.

###Browsers compatibility
Tested in Chrome (v42), Safari (v7.0), Firefox (v37).

###Issues
About all found bugs please report [issues](https://github.com/designeng/pipedrive-api/issues).