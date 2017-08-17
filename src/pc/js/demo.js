$(function() {
  var $slideIn = $('#js-slideIn'),
      $fadeIn = $('#js-fadeIn'),
      $fadeOut = $('#js-fadeOut');

  var slideInOptions = {
    className: 'slideIn',
    devideHeight: 2,
    timeout: 100
  };

  var fadeInOptions = {
    className: 'fadeIn',
    devideHeight: 2,
    timeout: 500
  };

  var fadeOutOptions = {
    className: 'fadeOut',
    devideHeight: 2,
    timeout: 800
  };

  $slideIn.scrollAddClass(slideInOptions);
  $fadeIn.scrollAddClass(fadeInOptions);
  $fadeOut.scrollAddClass(fadeOutOptions);
});
