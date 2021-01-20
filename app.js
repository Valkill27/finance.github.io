/* ==========================================================================
 Preloader
 ========================================================================== */
function sayHi() {
  alert('Привет');
}

setTimeout(sayHi, 1000);

$(window).on('load', function () {
	$('body').delay(1000).addClass('loaded');

	// if touchscreen
	if ( is_touch_device() ) {
		$('html').addClass('touch');
	}
});


$(document).ready(function(){

	/* ==========================================================================
	 Coin
	 ========================================================================== */

		var i = 0,
				totalSlides = 10,
				s = 100,
				flagReverse = false;

		function myInterval(){
			var count = i;

			if (i < 10) {
				count = '0' + i;
			}

			if (i == 0)  {
				flagReverse = false;
				s = 2000;
			} else {
				s = 100;
			}

			if (i == totalSlides - 1)  {
				flagReverse = true;
			} else {
			}

			if ( !flagReverse ) {
				i++;
			} else {
				i = i-1;
			}

			$('.fixed-coin, .scr-plan__coin').attr("src", "https://tothemars.finance/_asset/img/coin/mars-coin000" + count + ".jpg");

			setTimeout(myInterval, s);
		}
		setTimeout(myInterval ,s);


	/* ==========================================================================
	 Hamburger Menu
	 ========================================================================== */

	var burger = $('.burger');

	burger.click(function(){
		var burger = $(this),
			classAct = 'is-active',
			classBody = 'menu-opened';

		if ( !burger.hasClass(classAct) ) {
			burger.addClass(classAct);
			$('body').addClass(classBody);
		} else {
			burger.removeClass(classAct);
			$('body').removeClass(classBody)
		}
	});


	/* ==========================================================================
	 Dropdown
	 ========================================================================== */

	$('.lang').each(function(){
		var parent = $(this),
				popup = parent.find('.lang__dropdown'),
				btnOpen = parent.find('.lang__head'),
				btnClose = parent.find('.js-dd-close'),
				classOpen = 'is-opened',
				link = popup.find('a');

		btnOpen.click(function(e){
			e.preventDefault();

			if (popup.is(':hidden')) {
				popup.show();
				parent.addClass(classOpen);
			} else {
				popup.hide();
				parent.removeClass(classOpen);
			}
		});

		btnClose.click(function(){
			popup.hide();
			parent.removeClass(classOpen);
		});

		$('html').click(function(event) {
			if (
					!$(event.target).closest(popup).length
					&&
					!$(event.target).is(popup)
					&&
					!$(event.target).closest(btnOpen).length
					&&
					!$(event.target).is(btnOpen)
			) {
				popup.hide();
				parent.removeClass(classOpen);
			}
		});
	});


	/* ==========================================================================
	 Scroll To
	 ========================================================================== */

	$('.js-to').click(function(e){
		e.preventDefault();

		var link = $(this),
			target = $(this).data('target'),
			href = $(this).attr('href');

		if ( typeof href !== typeof undefined && href !== false ) {
			target = href;
		}

		if ( $('body').hasClass('menu-opened') ) {
			$('.burger').removeClass('is-active');
			$('body').removeClass('menu-opened');
		}

		$('body,html').scrollTop( $(target).offset().top );

	});


	/* ==========================================================================
	 Modal
	 ========================================================================== */

	// get scrollbar width
	function getScrollBarWidth () {
		var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
				widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
		$outer.remove();
		return 100 - widthWithScroll;
	}

	var scrollbarWidth = getScrollBarWidth();

	$('.js-modal').each(function(){
		var link = $(this),
				target = $(link.data('target')),
				btnClose = target.find('.js-modal-close'),
				bodyClass = 'modal-opened',
				modalClass = 'is-opened';

		link.click(function(e){
			e.preventDefault();

			$('body').addClass(bodyClass);
			// $('body').css('margin-right', scrollbarWidth);
			target.addClass(modalClass);
		});
	});

	$('.js-modal-close').click(function(e){
		e.preventDefault();

		var bodyClass = 'modal-opened',
		modalClass = 'is-opened';


		if ( $(this).closest('.modal').attr('id') === 'modal-win' ) {
			$('body').removeClass('demo-game');
		}

		$('body').removeClass(bodyClass);
		// $('body').css('margin-right', 0);
		$(this).closest('.modal').removeClass(modalClass);

		$(this).closest('.modal').find('form').trigger("reset");
	});


	/* ==========================================================================
	 Referrals
	 ========================================================================== */

	var searchParams = new URLSearchParams(window.location.search);

	if ( searchParams.has('refId') ) {
		$('.js-link-reg').each(function(){
			var link = $(this),
				href = link.attr('href');

			link.attr('href', href + '?refId=' + searchParams.get("refId"));
		});
	}



	/*  ========================================================================== */

});


/* ==========================================================================
 Slider Arrows
 ========================================================================== */

var arrPrev = '<button type="button" class="slick-arrow slick-prev"><svg viewBox="0 0 23 34"><path d="M15.912,29.986 L2.014,16.000 L15.912,2.014 "/></svg></button>',
	arrNext = '<button type="button" class="slick-arrow slick-next"><svg viewBox="0 0 23 34"><path d="M15.912,29.986 L2.014,16.000 L15.912,2.014 "/></svg></button>';


/* ==========================================================================
 Functions
 ========================================================================== */

function is_touch_device() {
	return !!('ontouchstart' in window        // works on most browsers
			|| navigator.maxTouchPoints);       // works on IE10/11 and Surface
}



var winHeight = $(window).height();

function scrollAnim(target, trigger, offset, reverse) {
	if ( target.length > 0 ) {
		$(window).scroll(function(){
			if ($(window).scrollTop() > trigger.offset().top - $(window).height() + offset) {
				target.addClass('animated');
			} else {
				if ( reverse ) {
					target.removeClass('animated');
				}
			}
		});
	}
}

function scrollParallax(obj, parent, ratio) {
	$(document).on('scroll', function() {
		obj.css('margin-top', ($(document).scrollTop() - parent.offset().top)/ratio + 'px');
	});
}

function mouseParallax(obj,x,y) {
	if ( $(window).width() >= 999 ) {
		$('body').mousemove(function(e) {
			obj.css({
				// 'margin-top': e.pageY/y + 'px ',
				'margin-left': e.pageX/x + 'px'
			});
		});
	}
}

function mouseParallaxAll(obj,x,y) {
	if ( $(window).width() >= 999 ) {
		$('body').mousemove(function(e) {
			obj.css({
				'margin-top': e.pageY/y + 'px ',
				'margin-left': e.pageX/x + 'px'
			});
		});
	}
}









