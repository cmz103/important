/*!
* RESUI jQuery Ribbon Notification
* Author: Cedric Maniquiz
* version: 0.0.1 (11-MAR-2015)
* @requires jQuery/jQuery UI
* Ensure HTML doc has meta charset set to UTF-8 (or the "X" will not render) test
*/
(function ($, undefined) {

    $.widget('resui.ribbonNotification', {
        version: '0.0.1',

        //default options
        options: {
            backgroundColor: "#FEFB64",
            showCloseButton: true,
            value: "Sausage venison ground round ham hock",
            textIndent: '0'
        },

        destroy: function () {
            this.element.hide();
            $('body').removeClass('resui-ribbon-background-adjustment');
            this._trigger("onDestroy", null, null);
        },

        _create: function () {

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

        }


    });

} (jQuery));