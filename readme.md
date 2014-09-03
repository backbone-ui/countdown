# Backbone UI: Countdown

A Model for simple countdowns


## Dependendies

* [Backbone.js](http://backbonejs.org/)
* [Underscore.js](http://underscorejs.org/)
* [Tick.js](http://github.com/makesites/tick/)
* [Handlebars.js](http://handlebarsjs.com/)

This plugin also supports [Backbone APP](http://github.com/makesites/backbone-app) which automates the rendering process of html fragments, although it is not a mandatory dependency.


## Examples

* [Simple countdown](http://rawgit.com/backbone-ui/countdown/master/examples/simple.html)


## Install

Using Bower:
```
bower install backbone.ui.countdown
```


## Usage

After you include the contents of the assets folder in your app folder, the modal will be available to extend with custom options.

For example:
```
var Countdown = Backbone.UI.Countdown.extend({
	options: {
		className: "my-modal",
		close: false
	}
});

var countdown = new Countdown();

```


## Options

...


## Methods

...


## Credits

Initiated by Makis Tracend ([@tracend](http://github.com/tracend)).

Released at [Makesites.org](http://makesites.org)


## License

Distributed under the [MIT license](http://makesites.org/licenses/MIT)
