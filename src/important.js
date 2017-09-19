// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
; (function ($, window, document, undefined) {

    "use strict";

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "important",
        defaults = {
            backgroundColor: "#FEFB64",
            showCloseButton: true,
            value: "Sausage venison ground round ham hock",
            textIndent: '0'
        };

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;
        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        init: function () {
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.settings
            // you can add more functions like the one below and
            // call them like so: this.yourOtherFunction(this.element, this.settings).
            var that = this;
            var backgroundImageExists = ($("body").css("background-image") != "none");
            var currentBackgorundImagePosition = $("body").css("background-position");

            this.element
				.addClass("resui-widget-ribbon-notification")
				.html(this.options.value)
				.css({
				    'background-color': this.options.backgroundColor,
				    'text-indent': this.options.textIndent,
				    'min-height': '40px',
				    'max-height': '40px'
				})
				.prependTo("body");

            if (this.options.showCloseButton) {
                this.element
					.append('<span class="resui-widget-ribbon-notification-close">✖</span>');
            }

            var outerHeight = this.element.outerHeight();

            if (backgroundImageExists) {
                $('body').addClass('resui-ribbon-background-adjustment');
            }

            this.element.find(".resui-widget-ribbon-notification-close").on("click", function () {
                that.destroy();
            });

            //dynamically create css and append to head
            var style = '.resui-widget-ribbon-notification { padding: 8px 30px; font: 14px Arial; position: relative; ' +
                        '-webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; }' +
						'.resui-widget-ribbon-notification a { color: #6A9BC1; text-decoration: underline; }' +
						'.resui-widget-ribbon-notification a:hover { text-decoration: none; }' +
						'.resui-widget-ribbon-notification-close { position: absolute; right: 20px; top: 5px; cursor: pointer; }' +
                        '.resui-ribbon-background-adjustment { background-position: center ' + outerHeight + 'px !important; }';

            if (!$('#jqResuiRibbonNotificationStyles').length) {
                $('head').append('<style id="jqResuiRibbonNotificationStyles">' + style + '</style>');
            }
        },
        destroy: function () {
            this.element.hide();
            $('body').removeClass('resui-ribbon-background-adjustment');
            this._trigger("onDestroy", null, null);
        },
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);
