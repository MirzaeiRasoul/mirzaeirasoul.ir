(function ($) {
    'use strict';

    // First Load Animation
    if (localStorage.getItem("first-load")) {
        $('.text-animation').removeClass("text-animation");
        $('.not-loaded').removeClass("not-loaded");
        $('.read-more, .header-section-social, .header-section-scroll-down, .header-section-image').removeClass("hide");
    } else {
        localStorage.setItem("first-load", "true");
        var loadTimeline = gsap.timeline();
        var spotlightTimeline = gsap.timeline();
        spotlightTimeline.fromTo(".header-section-image.light", {top: -150, autoAlpha: 0}, {top: 0, autoAlpha: 1, duration: 2});
        var textItems = document.body.querySelectorAll(".text-animation");
        textItems.forEach(function(item, index) {
            var textSplit = acAnimated.Plugins.SplitText(item, {words: 1, chars: 1, spacing: 7});
            loadTimeline.fromTo(
                textSplit.chars,
                {top: -100, autoAlpha: 0},
                {top: 0, autoAlpha: 1, duration: 1, stagger: 0.1, ease: Back.easeOut,
                    onComplete: function() {
                        spotlightTimeline.fromTo(".header-section-image.shine", {autoAlpha: 0}, {autoAlpha: 1, duration: 0.9});
                    }
                }
            );
        });
        loadTimeline.to(".read-more", {autoAlpha: 1, duration: 0.4});
        loadTimeline.to(".header-section-social", {autoAlpha: 1, delay: 0.4, duration: 0.25});
        loadTimeline.to(".header-section-scroll-down", {
            autoAlpha: 1, delay: 0.15, duration: 0.25,
            onComplete: function() {
                $('.not-loaded').removeClass("not-loaded");
            }
        }); 
    }

})(jQuery);