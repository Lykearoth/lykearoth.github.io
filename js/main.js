/*global $, jQuery, alert*/
$(document).ready(function() {
  'use strict';

  // ========================================================================= //
  // SMOOTH SCROLL
  // ========================================================================= //
  $(document).on("scroll", onScroll);

  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    $(document).off("scroll");

    $('a').each(function() {
      $(this).removeClass('active');
      if ($(window).width() < 768) {
        $('.nav-menu').slideUp();
      }
    });

    $(this).addClass('active');

    var target = this.hash,
        menu = target;

    target = $(target);

    $('html, body').stop().animate({
      'scrollTop': target.offset().top - 80
    }, 500, 'swing', function() {
      window.location.hash = target.selector;
      $(document).on("scroll", onScroll);
    });
  });

  function onScroll(event) {
    if ($('.home').length) {
      var scrollPos = $(document).scrollTop();
      $('nav ul li a').each(function() {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
      });
    }
  }

  // ========================================================================= //
  // NAVBAR SHOW - HIDE
  // ========================================================================= //
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll > 200) {
      $("#main-nav, #main-nav-subpage").slideDown(700);
      $("#main-nav-subpage").removeClass('subpage-nav');
    } else {
      $("#main-nav").slideUp(700);
      $("#main-nav-subpage").hide();
      $("#main-nav-subpage").addClass('subpage-nav');
    }
  });

  // ========================================================================= //
  // RESPONSIVE MENU
  // ========================================================================= //
  $('.responsive').on('click', function(e) {
    $('.nav-menu').slideToggle();
  });

  // ========================================================================= //
  // Typed Js
  // ========================================================================= //
  var typed = $(".typed");
  $(function() {
    typed.typed({
      strings: ["KeaRoth Ly.", "Designer.", "Developer.", "Freelancer.", "Photographer", "IT Technician"],
      typeSpeed: 100,
      loop: true,
    });
  });

  // ========================================================================= //
  // Owl Carousel Services
  // ========================================================================= //
  $('.services-carousel').owlCarousel({
    autoplay: true,
    loop: true,
    margin: 20,
    dots: true,
    nav: false,
    responsiveClass: true,
    responsive: { 
      0: { items: 1 }, 
      768: { items: 2 }, 
      900: { items: 4 } 
    }
  });

  // ========================================================================= //
  // Magnific Popup - Multi Image Gallery per Project
  // ========================================================================= //
  $('.popup-gallery').magnificPopup({
    type: 'image',
    removalDelay: 300,
    mainClass: 'mfp-with-zoom',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1]
    },
    zoom: {
      enabled: true,
      duration: 300,
      easing: 'ease-in-out',
      opener: function(openerElement) {
        return openerElement.is('img') ? openerElement : openerElement.find('img');
      }
    }
  });

  // ========================================================================= //
  // Portfolio Isotope + Filter
  // ========================================================================= //
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-thumbnail',
      layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');
      portfolioIsotope.isotope({ filter: $(this).data('filter') });
    });
  });

});

// ========================================================================= //
// Tracking viewer
// ========================================================================= //

// Only increment once per visit (more stable)
 // Simple and reliable visitor counter
  let count = parseInt(localStorage.getItem('portfolioVisitorCount') || 1284);
  
  // Increase by 1 on every page load / refresh
  count += 1;
  localStorage.setItem('portfolioVisitorCount', count);

  // Display the updated count
  document.getElementById('visitor-count').textContent = count.toLocaleString('en-US');

// ========================================================================= //
// Journal
// ========================================================================= //
// Minimal Journey Slider
const journeyStories = [
    {
        category: "COMMUNITY",
        title: "Giving Back",
        desc: "Supporting education and outreach in rural villages.",
        location: "Battambang",
        year: "2024",
        img: "https://picsum.photos/id/1015/800/1000"
    },
    {
        category: "MEDIA PRODUCTION",
        title: "Capturing Stories",
        desc: "Documenting meaningful moments through photography.",
        location: "Siem Reap",
        year: "2025",
        img: "https://picsum.photos/id/133/800/1000"
    },
    {
        category: "TEACHING",
        title: "Sharing Knowledge",
        desc: "Helping students learn technology and digital skills.",
        location: "Phnom Penh",
        year: "2026",
        img: "https://picsum.photos/id/201/800/1000"
    },
    {
        category: "FIELD WORK",
        title: "Village Outreach",
        desc: "Bringing tech opportunities to remote communities.",
        location: "Kampong Cham",
        year: "2023",
        img: "https://picsum.photos/id/251/800/1000"
    },
    {
        category: "EVENT",
        title: "Moments That Matter",
        desc: "Capturing energy at conferences and gatherings.",
        location: "Singapore",
        year: "2025",
        img: "https://picsum.photos/id/316/800/1000"
    }
];

function initMinimalJourneySlider() {
    const track = document.getElementById('journey-slides-track');
    track.innerHTML = '';
    
    const extended = [...journeyStories, ...journeyStories, ...journeyStories];
    
    extended.forEach(item => {
        const slide = document.createElement('div');
        slide.className = 'journey-slide';
        slide.innerHTML = `
            <img src="${item.img}" alt="${item.title}" loading="lazy">
            <div class="journey-slide-overlay">
                <div class="journey-category">${item.category}</div>
                <div class="journey-slide-title">${item.title}</div>
                <div class="journey-slide-desc">${item.desc}</div>
                <div class="journey-slide-meta">${item.location} • ${item.year}</div>
            </div>
        `;
        track.appendChild(slide);
    });

    let currentTranslateX = 0;
    let isPaused = false;
    const container = document.getElementById('journey-slider-container');

    function animate() {
        if (!isPaused) {
            currentTranslateX -= 0.45;
            track.style.transform = `translateX(${currentTranslateX}px)`;
        }
        // Seamless loop
        if (Math.abs(currentTranslateX) > 310 * journeyStories.length * 2) {
            currentTranslateX += 310 * journeyStories.length * 2;
        }
        requestAnimationFrame(animate);
    }

    // Hover pause
    container.addEventListener('mouseenter', () => isPaused = true);
    container.addEventListener('mouseleave', () => isPaused = false);

    // Navigation
    document.getElementById('journey-prev-btn').addEventListener('click', () => {
        currentTranslateX += 380;
        track.style.transition = 'transform 0.6s cubic-bezier(0.32,0.72,0,1)';
        track.style.transform = `translateX(${currentTranslateX}px)`;
        setTimeout(() => { track.style.transition = 'transform 0.08s linear'; }, 600);
    });

    document.getElementById('journey-next-btn').addEventListener('click', () => {
        currentTranslateX -= 380;
        track.style.transition = 'transform 0.6s cubic-bezier(0.32,0.72,0,1)';
        track.style.transform = `translateX(${currentTranslateX}px)`;
        setTimeout(() => { track.style.transition = 'transform 0.08s linear'; }, 600);
    });

    requestAnimationFrame(animate);
}

// Initialize
document.addEventListener('DOMContentLoaded', initMinimalJourneySlider);

// ========================================================================= //
// Google Form / Contact Submission (unchanged)
// ========================================================================= //
function doPost(e) {
  try {
    const name = e.parameter.name || '';
    const email = e.parameter.email || '';
    const subject = e.parameter.subject || '';
    const message = e.parameter.message || '';

    const SHEET_ID = '1KfkafL3kH0lQYg2IW1rvCOFP3cQ9yGL616byJmkmdxA'; // ← Change this
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();

    sheet.appendRow([new Date(), name, email, subject, message]);

    MailApp.sendEmail({
      to: 'lykearoth@gmail.com',
      subject: 'New Comment on Your Blog: ' + subject,
      body: `New comment from ${name} (${email}):\n\nSubject: ${subject || 'N/A'}\nMessage: ${message}\n\nDate: ${new Date().toISOString()}`
    });

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success', message: 'Thank you! Your message has been sent.' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: 'Failed to submit. Please try again.' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
// ========================================================================= //
// Contact Form - Google Apps Script Integration
// ========================================================================= //
$(document).ready(function() {
  $('#contactForm').on('submit', function(e) {
    e.preventDefault();

    var $form = $(this);
    var $submitBtn = $form.find('input[type="submit"]');
    var originalBtnText = $submitBtn.val();

    $submitBtn.val('Sending...').prop('disabled', true);

    $.ajax({
      url: 'https://script.google.com/macros/s/AKfycbzZpXi7RXudCn4rAMIGo6Dr4p8X2ZchtdqDDOi_fbhyCRFdwmb0LoBBZdo5LSgNf_Nhgw/exec',  // ← Change this
      type: 'POST',
      data: $form.serialize(),
      success: function(response) {
        $('#sendmessage').fadeIn();
        $('#errormessage').hide();
        $form[0].reset();
      },
      error: function() {
        $('#errormessage').text('Something went wrong. Please try again.').fadeIn();
      },
      complete: function() {
        $submitBtn.val(originalBtnText).prop('disabled', false);
      }
    });
  });
});
