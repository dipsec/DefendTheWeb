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

    $('nav#sidebar li a').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        var url = $(this).attr("href");
        if ($(this).parent().hasClass('has-children')) {
            url = $(this).siblings('ul').children(':first-child').children('a').attr('href');
        } else if (!$(this).closest('.has-children').length) {
            url = '/course/';
        }

        highlightSidebarItem(this);

        $.get(url, function(data) {
            $("#content").replaceWith(data.content);
            document.title = data.title + ' | Defend the Web';
            window.history.pushState({"html": data.content, "url": url, "pageTitle": document.title}, "", url);
        });
    });

    window.onpopstate = function(e) {
        console.log(e);
        if(e.state) {
            $("#content").html(e.state.html);
            document.title = e.state.pageTitle + ' | Defend the Web';

            highlightSidebarItem($('nav#sidebar a[href="'+e.state.url+'"]'));
        } else {
            document.location.reload();
        }
    };

    function highlightSidebarItem(target) {
        $('nav#sidebar li.selected, nav#sidebar li.active').removeClass('active selected');
        if ($(target).parent().hasClass('has-children')) {
            $(target).parent().addClass('selected');
            $(target).siblings('ul').children(':first-child').addClass('active');
        } else if ($(target).closest('.has-children').length) {
            $(target).parent().addClass('active').closest('.has-children').addClass('selected');
        } else {
            $(target).parent().addClass('selected');
        }
    }

});