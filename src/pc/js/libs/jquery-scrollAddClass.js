/* 
* jquery-scrollAddClass
* MIT License
**/
;(function($) {
  $.fn.scrollAddClass = function(options) {
    var scrollAddClassOptions = $.extend( {}, $.fn.scrollAddClass.defaults, options );

    var $el = $(this),
        $win = $(window);

    var className = scrollAddClassOptions.className,
        timeout = scrollAddClassOptions.timeout,
        devideHeight = scrollAddClassOptions.devideHeight,
        winWidth = $win.width(),
        currentWidth = $win.innerWidth(),
        winHeight = $win.height(),
        elOffsetTop = $el.offset().top;

    var resizeTimer = null,
        scrollTimer = null,
        flag = false;



    $win.imagesLoaded(function() {
      winWidth = $win.width();
      currentWidth = $win.innerWidth();
      winHeight = $win.height();
      elOffsetTop = $el.offset().top;
    });


    $win.on('resize', function() {
      if ( currentWidth == $win.innerWidth() ) {
        return;
      }
      if ( resizeTimer ) {
        clearTimeout(resizeTimer);
      }
      resizeTimer = setTimeout(function() {
        winWidth = $win.width();
        currentWidth = $win.innerWidth();
        $win.imagesLoaded(function() {
          winHeight = $win.height();
          elOffsetTop = $el.offset().top;
        });
      }, 10);
    });


    $win.on('scroll', function() {
      if ( scrollTimer ) {
        clearTimeout(scrollTimer);
      }
      scrollTimer = setTimeout(function() {
        if ( flag ) return false;
        if ( $win.scrollTop() > elOffsetTop - winHeight / devideHeight ) {
          setTimeout(function() {
            $el.addClass(className);
          }, timeout);
          flag = true;
        }
      }, 5);
    });

  };

  $.fn.scrollAddClass.defaults = {
    className: 'slideIn',
    devideHeight: 0.8,
    timeout: 200
  };
})(jQuery);
