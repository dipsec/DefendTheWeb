'use strict';

$(function() {
	var windowHeight = $(window).height(),
        windowWidth = $(window).width();

    $(window).resize(function() {
        windowHeight = $(window).height();
        windowWidth = $(window).width();
    });

    $('li.has-children').on('click', function(e) {
        e.preventDefault();
        $(this).parent().find('.selected').not(this).removeClass('selected');
        $(this).toggleClass('selected');
    }).on('mouseenter', function(e) {
        e.preventDefault();
        $(this).addClass('hover');
    }).on('mouseleave', function(e) {
        e.preventDefault();
        $(this).removeClass('hover');
    });

    $()

    if ($('body').hasClass('home')) {
        $(window).scroll(function() {
            var scrollTop = $(window).scrollTop();

            if (scrollTop > $('#header > .logo').position().top) {
                $('header').addClass('logo-visible');
            } else {
                $('header').removeClass('logo-visible');
            }
        });
    }


});