function setup() {
  fillTemplate();
}

function fillTemplate() {
  // Profile image
  if (profile.picture != "") {
    $("#profileImg").attr("src", profile.picture);
  }
  $("#profileImg").attr("alt", profile.name);

  // About
  $("#smallName").text(profile.name);
  $("#name").find(".first").text(profile.name.split(" ")[0]);
  $("#name").find(".second").text(profile.name.split(" ").slice(1).join(" "));
  document.getElementById("location").innerHTML = profile.location;

  let birth = new Date(profile.birth);
  birth = birth.getFullYear() + " / " + twoDigitShape(birth.getMonth() + 1) + " / " + twoDigitShape(birth.getDate());
  document.getElementById("age").innerHTML = birth;

  // Quote random selector
  // quoteIndex = Math.floor(Math.random() * profile.quotes.length);
  // $("#description").find(".quote").text(`"${profile.quotes[quoteIndex]}"`);

  // Quote daily selector
  quoteIndex = getDayOfYear() % profile.quotes.length;
  $("#description").find(".quote").text(`“${profile.quotes[quoteIndex]}”`);

  $("#description").find(".description").text(profile.description);

  // Social
  document.getElementById("github").setAttribute("href", profile.social.github);
  document.getElementById("dev").setAttribute("href", profile.social.dev);
  document.getElementById("linkedin").setAttribute("href", profile.social.linkedin);
  document.getElementById("researchgate").setAttribute("href", profile.social.researchgate);
  document.getElementById("goodreads").setAttribute("href", profile.social.goodreads);

  document.getElementById("bio-text").innerHTML = profile.bio;

  // Education
  for (var i = 0; i < profile.education.length; i++) {
    var educationTemplate = $("#credsTemplate");
    educationTemplate.find(".mb-0").text(profile.education[i].school);
    educationTemplate.find(".mb-3").text(profile.education[i].degree);
    educationTemplate.find("p").text(profile.education[i].fieldOfStudy);
    educationTemplate.find("p").text(profile.education[i].description);
    educationTemplate.find(".location").text(profile.education[i].location);
    educationTemplate.find(".date").text(profile.education[i].from + " - " + profile.education[i].to);

    $("#educationContainer").append(educationTemplate.html());
    if (i < profile.education.length - 1)
      $("#educationContainer").append(document.createElement("hr"));
  }

  // Experience
  for (var i = 0; i < profile.experience.length; i++) {
    var experienceTemplate = $("#credsTemplate");
    experienceTemplate.find(".mb-0").text(profile.experience[i].title);
    experienceTemplate.find(".mb-3").text(profile.experience[i].company);
    experienceTemplate.find("p").text(profile.experience[i].description);
    experienceTemplate.find(".location").text(profile.experience[i].location);
    experienceTemplate.find(".date").text(profile.experience[i].from + " - " + profile.experience[i].to);

    $("#experienceContainer").append(experienceTemplate.html());
    if (i < profile.experience.length - 1)
      $("#experienceContainer").append(document.createElement("hr"));
  }

  // Skills
  for (var skill in profile.skills) {
    var skillItem = document.createElement("div");
    skillItem.innerHTML = profile.skills[skill];
    skillItem.classList.add("default-skill");
    $("#skillsContainer").append(skillItem);
  }
}

function getDayOfYear() {
  var now = new Date();
  var start = new Date(now.getFullYear(), 0, 0);
  var diff = now - start;
  var oneDay = 1000 * 60 * 60 * 24;
  var dayOfYear = Math.floor(diff / oneDay);
  return dayOfYear;
}

function twoDigitShape(num) {
  return num > 9 ? "" + num : "0" + num;
}

(function ($) {
  "use strict";
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, "") ==
      this.pathname.replace(/^\//, "") && location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate({ scrollTop: target.offset().top },
          1000,
          "easeInOutExpo"
        );
        return false;
      }
    }
  });

  $(".js-scroll-trigger").click(function () {
    $(".navbar-collapse").addClass("hide");
  });

  $("body").scrollspy({
    target: "#left-panel"
  });
})(jQuery);