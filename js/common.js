(function ($) {
    'use strict';

    // Smooth Loader
    gsap.to("body", {autoAlpha: 1, delay: 0.1, duration: 0.4});
    
    // Initialize Lozad Library
    lozad('.lozad', {
        load: function(item) {
            item.src = item.dataset.src;
            item.onload = function() { item.classList.add('loading'); }
        }
    }).observe()

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

    // Header Movement Animation
    function mouseMoveFunc(event) {
        const percentX = gsap.utils.normalize(0, innerWidth, event.pageX);
        const percentY = gsap.utils.normalize(0, innerHeight, event.pageY);
        const maxX = gsap.getProperty(".mousemove-animate", "width") * 0.01;
        const maxY = gsap.getProperty(".mousemove-animate", "height") * 0.01;
        gsap.to(".mousemove-animate", {
            duration: 1,
            x: percentX * maxX - maxX / 2,
            y: percentY * maxY - maxY / 2
        });
        const spotlightMaxX = gsap.getProperty(".header-section-image", "width") * 0.005;
        const spotlightMaxY = gsap.getProperty(".header-section-image", "height") * 0.005;
        gsap.to(".header-section-image", {
            duration: 1.5,
            x: percentX * spotlightMaxX - spotlightMaxX / 2,
            y: percentY * spotlightMaxY - spotlightMaxY / 2,
        });
    }   
    window.addEventListener("mousemove", mouseMoveFunc);

})(jQuery);