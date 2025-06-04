/*!
 * SmartMenus jQuery Plugin Bootstrap Addon - v0.2.0 - June 1, 2015
 * http://www.smartmenus.org/
 *
 * Copyright 2015 Vasil Dinkov, Vadikom Web Ltd.
 * http://vadikom.com
 *
 * Licensed MIT
 */

(function($) {

	// init ondomready
	$(function() {

		// init all navbars that don't have the "data-sm-skip" attribute set
		var $navbars = $('ul.smartmenus:not([data-sm-skip])');
		$navbars.each(function() {
			var $this = $(this);
			$this.addClass('sm').smartmenus({

                // these are some good default options that should work for all
                // you can, of course, tweak these as you like
                subMenusSubOffsetX: 0,
                subMenusSubOffsetY: -7,
                mainMenuSubOffsetX: -8,
                subIndicators: false,
                hideOnClick: true,
                showOnClick: false,
                showTimeout: 100,
                collapsibleShowFunction: null,
                collapsibleHideFunction: null,
                subMenusMinWidth: '15em',
                subMenusMaxWidth: null,
                keepInViewport: false,
                keepHighlighted: false
                //rightToLeftSubMenus: $this.hasClass('navbar-right'),
                //bottomToTopSubMenus: $this.closest('.navbar').hasClass('navbar-fixed-bottom')
            });

			// keep Bootstrap's default behavior for parent items when the "data-sm-skip-collapsible-behavior" attribute is set to the ul.navbar-nav
			// i.e. use the whole item area just as a sub menu toggle and don't customize the carets
			var obj = $this.data('smartmenus');
			if ($this.is('[data-sm-skip-collapsible-behavior]')) {
				$this.bind({
					// click the parent item to toggle the sub menus (and reset deeper levels and other branches on click)
					'click.smapi': function(e, item) {
						if (obj.isCollapsible()) {
							var $item = $(item),
								$sub = $item.parent().dataSM('sub');
							if ($sub && $sub.dataSM('shown-before') && $sub.is(':visible')) {
								obj.itemActivate($item);
								obj.menuHide($sub);
								return false;
							}
						}
					}
				});
			}

			var $carets = $this.find('.caret');

			// onresize detect when the navbar becomes collapsible and add it the "sm-collapsible" class
			var winW;
			function winResize() {
				var newW = obj.getViewportWidth();
				if (newW != winW) {
					if (obj.isCollapsible()) {
						$this.addClass('sm-collapsible');

					} else {
						$this.removeClass('sm-collapsible');
						if (!$this.is('[data-sm-skip-collapsible-behavior]')) {
							$carets.removeClass('navbar-toggle sub-arrow');
						}
					}
					winW = newW;
				}
			};
			winResize();
			$(window).bind('resize.smartmenus' + obj.rootId, winResize);
		});

	});



})(jQuery);