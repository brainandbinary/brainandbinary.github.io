/*
* SAPHIR - The Coming Soon Template
* Build Date: May 2018
* Last Update: May 2018
* Author: Madeon08
* Copyright (C) 2018-2XXX Madeon08
* This is a premium product available exclusively here : https://themeforest.net/user/Madeon08/portfolio
*/

/*  TABLE OF CONTENTS
    ---------------------------
    1. Loading / Opening
    2. FullPage init
    3. Animate scroll fade adding
    4. Menu button
    5. Transition for nav & logo position
    6. Text rotator on loading screen
    7. Newsletter init
*/

/* ------------------------------------- */
/* 1. Loading / Opening ................ */
/* ------------------------------------- */

$(window).on('load', function () {
    "use strict";

    $('.brand-logo, #fp-nav, .main-content, footer').addClass('before-loading');

    setTimeout(function(){
        
        $(".loader").addClass('loaded');

    },2600);

    setTimeout(function(){
        
        $("#loading").addClass('loaded');

    },2800);

    setTimeout(function(){

        $(".brand-logo").removeClass('before-loading').addClass('loaded');

    },3000);

    setTimeout(function(){

        $("#fp-nav, .main-content").removeClass('before-loading').addClass('loaded');

    },3200);

    setTimeout(function(){

        $("footer").removeClass('before-loading').addClass('loaded');

    },3400);

    setTimeout(function(){

        $("#loading").remove();
        $(".brand-logo, footer").addClass('after-load');

    },3600);

    setTimeout(function(){

        $("#fp-nav").addClass('notransition');

    },4800);

});

$(document).ready(function(){
    "use strict";

    /* ------------------------------------- */
    /* 2. FullPage init .................... */
    /* ------------------------------------- */

    $('#fullpage').fullpage();

    /* ------------------------------------- */
    /* 3. Animate scroll fade adding ....... */
    /* ------------------------------------- */

    // Apply fading entrances on all except the tags included in the filter
    $('.main-content').find('*').filter(':not(.ask-to-scroll, .arrow, .arrow span, #first-text, #second-text, .link_in_text, small, .submit span, .block-item a)').addClass('animate-element');

    /* ------------------------------------- */
    /* 4. Menu button ...................... */
    /* ------------------------------------- */

    $('#small-screen-menu').on( "click", function() {

        $("#fullpage, #fp-nav, .brand-logo, footer").toggleClass("menu-opened");
        $("body, html").toggleClass("modal-open");

        $(this).toggleClass('open').toggleClass('custom-menu');
    });

    /* ------------------------------------- */
    /* 5. Transition for nav & logo position */
    /* ------------------------------------- */

    $(window).on("load resize", function() {
        if ($(this).width() < 1201) {
            $("#fp-nav").addClass("transition-desktop-mobile");
        }

        else if ($(this).height() < 750) {
            $("#fp-nav").addClass("transition-desktop-mobile");
        }

        else {
            $("#fp-nav").removeClass("transition-desktop-mobile");
        }

        if ($(this).width() < 481) {   
           $(".brand-logo").prependTo("#section0 .fp-tableCell");
        }
        else {  
           $(".brand-logo").prependTo("body");
        }
    });

    /* ------------------------------------- */
    /* 6. Text rotator on loading screen ... */
    /* ------------------------------------- */

    function dataWord () {

      $("[data-words]").attr("data-words", function(i, d){
        var $self  = $(this),
            $words = d.split("|"),
            tot    = $words.length,
            c      = 0; 

        for(var loadtext=0; loadtext<tot; loadtext++) { $self.append($('<span/>',{text:$words[loadtext]}));}

        $words = $self.find("span").hide();

        (function loop(){
          $self.animate({ width: $words.eq( c ).width() });
          $words.stop().fadeOut().eq(c).fadeIn().delay(750).show(0, loop);
          c = ++c % tot;
        }());
        
      });

    }

    dataWord();

    /* ------------------------------------- */
    /* 7. Newsletter init .................. */
    /* ------------------------------------- */

    $("#notifyMe").notifyMe();

});