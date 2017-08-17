/* 
* jquery-scrollAddClass
* MIT License
**/
!function(t){t.fn.scrollAddClass=function(e){var i=t.extend({},t.fn.scrollAddClass.defaults,e),n=t(this),o=t(window),s=i.className,d=i.timeout,l=i.devideHeight,u=o.width(),f=o.innerWidth(),a=o.height(),c=n.offset().top,h=null,r=null,m=!1;o.imagesLoaded(function(){u=o.width(),f=o.innerWidth(),a=o.height(),c=n.offset().top}),o.on("resize",function(){f!=o.innerWidth()&&(h&&clearTimeout(h),h=setTimeout(function(){u=o.width(),f=o.innerWidth(),o.imagesLoaded(function(){a=o.height(),c=n.offset().top})},10))}),o.on("scroll",function(){r&&clearTimeout(r),r=setTimeout(function(){if(m)return!1;o.scrollTop()>c-a/l&&(setTimeout(function(){n.addClass(s)},d),m=!0)},5)})},t.fn.scrollAddClass.defaults={className:"slideIn",devideHeight:.8,timeout:200}}(jQuery);