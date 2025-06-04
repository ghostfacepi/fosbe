var App = function () {


    function initBootstrap() {

        $('[data-toggle="tooltip"]').tooltip();


        //$('.nav-tabs').tabCollapse();

        if ($('.navbar-onepage').length > 0) {
            $('body').scrollspy({ target: $('.navbar-onepage'), offset: ($('#nav-primary').height()+21) });
        }

    }

    function initLightbox() {


        /* fix for missing title attribute in lightbox a tags */
        $('.lightbox').each(function () {
            if (this.title === '') {
                $(this).attr('title', $("img", $(this)).attr('title'));
            }
        }).fancybox({
            scrolling : 'auto'
        });

    }

    function initHeader() {
        jQuery(window).scroll(function () {
            if (jQuery(window).scrollTop() > 100) {
                jQuery('#nav-primary').addClass('navbar-shrinked');
            } else {
                jQuery('#nav-primary').removeClass('navbar-shrinked');
            }
        });

        $('.hero video').each(function() {
            var video = this;
            video.oncanplaythrough = function() {
                video.muted = true;
                video.play();
            }
        });
    }

    function initParallaxBg() {
        jQuery('.parallaxBg').parallax();
    }

    function initMmenu() {

        var pageId = $('body').attr('id').split('_')[1];
        $('#sidemenu #elem_'+pageId+'').addClass('current');

        $('#sidemenu').mmenu({
            extensions: ['shadow-page', 'pagedim', 'pagedim-black'],
            navbar: {
                title: document.head.querySelector("[name=navtitle]").content
            },
            navbars: [{
                position: 'bottom',
                height: 2,
                content: ['<div id="mobile-footer"></div>']
            }],
            hooks: {
                /* change fixed position while opening the mmenu */
                'open:before': function() {
                    var scrollTopPosition = $(window).scrollTop();
                    $('.fixed-top').css('position', 'absolute').css('top', scrollTopPosition + 'px');
                },
                'close:finish': function() {
                    $('.fixed-top').css('position', 'fixed').css('top', '0px');
                }
            }
        },{
        classNames: {
            selected: 'current'
        }
        });



        $('#mobile-footer').html($('#nav-mobile-footer').html());


    }

    function initFlexslider() {

        /* flexslider im hero */
        $('.hero .flexslider').flexslider({
            'controlNav': false,
            'selector': '.slides > div'
        });

    }

    function initCookiebar() {


        if ($('#cookie-bar').length > 0) {
            $.cookieBar({'acceptFunction':null});
        }

    }

    function initEqualHeight() {

        $('h2').matchHeight({
            byRow: true,
            property: 'min-height'
        });
        $('h3').matchHeight({
            byRow: true,
            property: 'min-height'
        });
    }

    function initSmoothScroll() {

        if ($('.navbar-onepage').length == 0) return;

        var navbarHeight = $('.navbar-onepage').height();

        // Add smooth scrolling on all links inside the navbar
        $('#page a[href*="#"]').not('.sr-only').not('[data-parent]').not('[data-toggle]').not('[data-slide]').on('click', function(event) {

            event.preventDefault();
            var hash = this.hash;
            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top-(navbarHeight+20)
            }, 800, function(){
                // Add hash (#) to URL when done scrolling (default click behavior)
                //window.location.hash = hash;
            });
        });

        $('.page-onepage .navbar-brand a').on('click', function(event) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, 800, function(){

            });
        });

        $('.nav-onepage a').on('click', function(event) {
            $(this).closest('.navbar-collapse.show').collapse('hide');
        });

    }

    return {
        init: function () {

            initBootstrap();
            initLightbox();
            initHeader();
            initMmenu();
            initCookiebar();
            initFlexslider();
            initParallaxBg();
            initEqualHeight();
            initSmoothScroll();

        }
    }
}();

var page = $('body').not('.page-onepage').find('#page');

page.css('padding-top', $('.fixed-top').height());

jQuery(document).ready(function () {

    /* Padding der Seite einstellen, damit das Menü den Inhalt nicht überlappt.  */
    page.animate({'padding-top': $('.fixed-top').height()});
    $(window).resize(function () {
        page.css('padding-top', $('.fixed-top').height());
    });

    App.init();
});

