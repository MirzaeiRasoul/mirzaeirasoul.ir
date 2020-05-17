(function ($) {
    'use strict';

    // Smooth Loader
    gsap.to("body", {autoAlpha: 1, delay: 0.1, duration: 0.4});

    // Sticky Navbar
    if ($('.navigation').offset().top > 1) { $('.navigation').addClass('nav-bg'); }
    else { $('.navigation').removeClass('nav-bg'); }
    $(window).scroll(function () {
        if ($('.navigation').offset().top > 1) { $('.navigation').addClass('nav-bg'); }
        else { $('.navigation').removeClass('nav-bg'); }
    });

    // Navbar Items Underline Animation
    let navItems = document.querySelectorAll(".nav-item");
    navItems.forEach((link, index, value) => {
        let underline = link.querySelector(".underline");
        link.timeline = gsap.timeline({paused: true});
        link.timeline.fromTo(underline, {width: "0%"}, {width: "100%", duration: 0.3});
        link.timeline.add("midway");
        link.timeline.fromTo(underline, {width: "100%"}, {width: "0%", left: "100%", duration: 0.1, immediateRender: false});
        // Mouseenter
        link.addEventListener("mouseenter", (e) => {
            link.timeline.tweenFromTo(0, "midway");
        });
        // Mouseleave
        link.addEventListener("mouseleave", (e) => {
            link.timeline.play();
        });
    });

})(jQuery);