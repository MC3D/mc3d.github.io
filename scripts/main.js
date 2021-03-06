/* globals alert */

$(function() {
  'use strict';

  // form serializer
  $.fn.serializeObject = function() {
    return this.serializeArray().reduce(function(acum, i) {
      acum[i.name] = i.value;
      return acum;
    }, {});
  };

  var y = $('#nav').offset().top;
  var x = 0;

  $('.nav-link').on('click', function(event) {
    var text = 'section-' + (event.target.innerText).toLowerCase();
    if ($(window).width() >= 1170) {
      x = $('#nav').height();
    }
    $('.nav-list').css('display', 'none');
    $('html, body').animate({
      scrollTop: ($('#' + text).offset().top - x)
    }, 500); // 500 milliseconds
    x = 0;
  });

  $('.project-links a').on('mouseover', function(){
    $(this).parent().parent().toggleClass('thumbnail-filter').fadeIn(500);
  }).on('mouseout', function(){
    $(this).parent().parent().toggleClass('thumbnail-filter').fadeIn(500);
  });

  $('.toggle-button').on('click', function() {
    var display = $('.nav-list').css('display');
    if (display === 'none') {
      $('.nav-list').css('display', 'flex');
    } else {
      $('.nav-list').css('display', 'none');
    }

  });

  // $('#contact-form').on('submit', function(event){
  //   event.preventDefault();
  //   $.ajax({
  //     type: 'post',
  //     url: './email-handler.php',
  //     data: $('contact-form').serializeObject(),
  //     success: function(){
  //       alert('form was submitted');
  //       event.target.reset();
  //       window.location.href = 'thankyou.html';
  //     },
  //   });
  // });

  // store the elements returned by selectors in variables; avoids repeat querying of DOM
  var $animationElements = $('.timeline-event');
  var $window = $(window);

  $.each($animationElements, function(){
    var $element = $(this);
    $element.find('.timeline-icon, .timeline-content').addClass('is-hidden');
  });

  function checkAnimationElements() {
    var windowHeight = $window.height();
    var windowTopPosition = $window.scrollTop();
    var windowBottomPosition = (windowTopPosition + windowHeight);

    $.each($animationElements, function() {
      var $element = $(this);
      // var elementHeight = $element.outerHeight();
      var elementTopPosition = $element.offset().top;
      // var elementBottomPosition = (elementTopPosition + elementHeight);

      // if ((elementBottomPosition >= windowTopPosition) &&
      if (elementTopPosition <= windowBottomPosition) {
        $element.find('.timeline-icon, .timeline-content').removeClass('is-hidden').addClass('animate');
      } else if (elementTopPosition >= windowBottomPosition){
        $element.find('.timeline-icon, .timeline-content').removeClass('animate').addClass('is-hidden');
      }
    });
  }

  $(window).on('scroll resize', function() {
    if (y <= $(window).scrollTop()) {
      // if so, add the fixed class
      $('#nav').addClass('fixed');
    } else {
      // otherwise remove it
      $('#nav').removeClass('fixed');
    }

    checkAnimationElements();

  });

  $window.trigger('scroll');

  ///// REMOVES PROJECT GRAYSCALE FILTER ///////////////////////////////////////
  // $('.project-links').on('mouseover', function(){
  //   $(this).parents().eq(0).removeClass('thumbnail-filter');
  // }).on('mouseout', function(){
  //   $(this).parents().eq(0).addClass('thumbnail-filter');
  // });

});
