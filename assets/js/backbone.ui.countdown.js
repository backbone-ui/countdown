/* Backbone UI: Countdown
 * Source: https://github.com/backbone-ui/countdown
 * Copyright © Makesites.org
 *
 * Initiated by Makis Tracend (@tracend)
 * Distributed through [Makesites.org](http://makesites.org)
 * Released under the [MIT license](http://makesites.org/licenses/MIT)
 */
(function (lib) {

	//"use strict";
	// Support module loaders
	if ( typeof define === 'function' && define.amd ){
		// AMD. Register as an anonymous module.
		define(['underscore', 'backbone'], lib);
	} else if( typeof module === "object" && module && typeof module.exports === "object" ){
		// Expose as module.exports in loaders that implement CommonJS module pattern.
		module.exports = lib;
	} else {
		// Browser globals
		lib(_, Backbone);
	}
}(function (_, Backbone){

// Helpers

/* Tick.js
 * Source: https://github.com/makesites/tick
 * Copyright © Makesites.org
 */
window.Tick=window.Tick||function(e){var t=function(e){e=e||{};if(e.rate)this.options.rate=e.rate;this.rate();this.loop()};t.prototype={options:{rate:1e3/60},queue:[],rate:function(t){t=t||this.options.rate;e.requestAnimFrame=e.requestAnimFrame||function(i){return e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.oRequestAnimationFrame||e.msRequestAnimationFrame||function(i){e.setTimeout(function(){i(+new Date)},t)}}()},loop:function(t){this.process(t);e.requestAnimFrame(this.loop.bind(this))},process:function(e){for(var t in this.queue){var i=this.queue[t];if(typeof i.fn!=="function")continue;var n=e%i.interval;var u=n>this.queue[t].step;this.queue[t].step=n;if(u)continue;i.fn();if(this.queue[t])this.queue[t].run=e}},add:function(e,t){if(typeof e!=="function")return;t=t||this.options.rate;var i={fn:e,interval:t,run:0};this.queue.push(i)},remove:function(e){var t=false;for(var i in this.queue){var n=this.queue[i];if(String(n.fn)===String(e)){t=true;delete this.queue[i]}}return t}};return t}(this.window);




	// conditioning the existance of the Backbone APP()
	var isAPP = ( typeof APP != "undefined" && !_.isUndefined( APP.View) );
	var Model = ( isAPP ) ? APP.Model : Backbone.Model;
	var View = ( isAPP ) ? APP.View : Backbone.View;


	var Data = Model.extend({

		defaults: {
			years: 0,
			months: 0,
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0,
			milliseconds: 0
		},

		options : {
			target: new Date().getTime(),
			delta: 0
		},

		tick: new Tick(),

		initialize: function( options ){
			_.bindAll(this, 'update');
			// loop
			this.tick.add(this.update, 1000);

			return Model.prototype.initialize.call( this, options );

		},

		update: function () {
			// find the amount of "seconds" between now and target
			var current_date = new Date().getTime();
			var target_date = this.options.target;

			var seconds_left = (target_date - current_date) / 1000;

			// do some time calculations
			days = parseInt(seconds_left / 86400);
			seconds_left = seconds_left % 86400;

			hours = parseInt(seconds_left / 3600);
			seconds_left = seconds_left % 3600;

			minutes = parseInt(seconds_left / 60);
			seconds = parseInt(seconds_left % 60);

			// format countdown string + set tag value
			this.set({
				days: days,
				hours: hours,
				minutes: minutes,
				seconds: seconds
			});
		},

		// helpers

		setTarget: function( target ){
			// target has to be a date in a string form
			this.options.target = new Date( target ).getTime();
		}

	});

	var Countdown = View.extend({

		data: new Data(),

		initialize: function( options ){
			_.bindAll(this, 'render');
			// pass options to model
			if( options.target ) this.data.setTarget( options.target );
			// events
			this.data.on("change", this.render);
			//return View.prototype.initialize.call( this, options );
		},

		render: function(){
			var template = this.template || false;
			if( !template ) return;
			var data = this.data.toJSON();
			$(this.el).html(_.template(template, data));
		}

	});


	// fallbacks
	if( _.isUndefined( Backbone.UI ) ) Backbone.UI = {};
	if( isAPP && _.isUndefined( APP.UI ) ) APP.UI = {};
	Backbone.UI.Countdown = Countdown;

	// If there is a window object, that at least has a document property
	if( typeof window === "object" && typeof window.document === "object" ){
		window.Backbone = Backbone;
		// update APP namespace
		if( isAPP ){
			APP.UI.Countdown = Backbone.UI.Countdown;
			window.APP = APP;
		}
	}

}));