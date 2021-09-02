// TODO: ↓↓↓ remove this script ↓↓↓
// Current menu item highlithing
$(function () {
	var location = window.location.href;
	var cur_url = location.split('/').pop();

	$('.top-nav li, .panel-nav li, .footer-nav li').each(function () {
		var link = $(this).find('a').attr('href');

		// console.log(link);

		if (cur_url == '') {
			cur_url = 'index.html';
		}

		if (cur_url == link)
		{
			$(this).addClass('current-menu-item');
			$(this).parents('li').addClass('current-menu-parent');
		}
	});
});

document.addEventListener('DOMContentLoaded', function(){

	const isRTL = $('html').attr('dir') == 'rtl';
	const isMobile = $(window).width() < 992;

	if (isRTL) {
		$('.wpcf7').attr('dir','rtl');
	} else{
		$('.wpcf7').attr('dir','ltr');
	}

	function is_touch_device() {
		try {
			document.createEvent("TouchEvent");
			return true;
		} catch (e) {
			return false;
		}
	}

	if(is_touch_device()){
		$('body').addClass('touch');
	} else{
		$('body').addClass('no-touch');
	}

	$('.file-input').each(function(i, el){
		$(this).find('input[type="file"]').on('change', function(e){
			e.preventDefault();
			
			if (!!e.target.files[0]) {
				$(el).addClass('selected');

				let names = [];

				$(e.target.files).each((i, item) => {
					names.push(item.name);
				});

				$(el).find('.selected-file').text(names.join(', ') );
			} else{
				$(el).removeClass('selected');
				$(el).find('.selected-file').text(btnText);
			}
		});
	});

	// First screen bg
	let pxbg = document.querySelectorAll('.first-screen-section .polygons-wrapper > g');
	for (let i = 0; i < pxbg.length; i++){
		window.addEventListener('mousemove', function(e) {
			let x = e.clientX / window.innerWidth * -1 * ($(pxbg[i]).data('speed') * 5);
			let y = e.clientY / window.innerHeight * -1 * ($(pxbg[i]).data('speed') * 7);
			pxbg[i].style.transform = 'translate(' + x * 50 + 'px, ' + y * 50 + 'px)';
		});
	}

	// Select Field
	jcf.setOptions('Select', {
		wrapNative: false,
		wrapNativeOnMobile: true,
		fakeDropInBody: false
	});

	jcf.replace( $('.select-field select, .block-price-type select') );


	function getMaxOfArray(numArray) {
		return Math.max.apply(null, numArray);
	}

	// Sliders
	function equalSlideHeight(slider){
		$(slider).on('setPosition', function () {
			$(this).find('.slick-slide').height('auto');
			var slickTrack = $(this).find('.slick-track');
			var slickTrackHeight = $(slickTrack).height();
			$(this).find('.slick-slide').css('height', slickTrackHeight + 'px');
		});
	}

	let arrowsButtons = {
		prevArrow: '<button type="button" class="slick-prev" aria-label="Предыдущий"><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 27"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.42.63L0 13.5l14.42 12.87.66-.74L2.06 14h26.7v-1H2.05L15.08 1.37l-.66-.74z"/></svg></button>',
		nextArrow: '<button type="button" class="slick-next" aria-label="Следующий"><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 27"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.33.63L28.75 13.5 14.33 26.37l-.66-.74L26.69 14H0v-1h26.69L13.67 1.37l.66-.74z"/></svg></button>'
	}

	function addDefaultEvents(slider, scope){
		slider.on('init', function (e, slick) {
			$(scope).find('.slider-nav .current').text('1');
			$(scope).find('.slider-nav .total').text(slick.slideCount);
		});

		slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
			$(scope).find('.slider-nav .current').text(nextSlide + 1);
		});
	}


	const appendPrefix = $(window).width() < 992 ? '.section-header.mobile' : '.section-header:not(.mobile)';

	const sliderDefaultOptions = scope => {
		return {
			slidesToScroll: 1,
			infinite: true,
			speed: 600,
			arrows: true,
			...arrowsButtons,
			appendArrows: $(scope).find(appendPrefix + ' .slider-nav')
		}
	}

	$('.client-results-slider-scope').each(function(i, scope){
		let slider = $(scope).find('.client-results-slider');

		addDefaultEvents(slider, scope);

		slider.slick({
			...sliderDefaultOptions(scope),
			slidesToShow: 1,
			responsive: [
				{
					breakpoint: 992,
					settings: {
						adaptiveHeight: true
					}
				}
			]
		});
	});

	$('.reviews-slider-scope').each(function(i, scope){
		let slider = $(scope).find('.reviews-slider');

		addDefaultEvents(slider, scope);

		slider.slick({
			...sliderDefaultOptions(scope),
			slidesToShow: 1,
			responsive: [
				{
					breakpoint: 992,
					settings: {
						adaptiveHeight: true
					}
				}
			]
		});
	});

	$('.events-slider-scope').each(function(i, scope){
		let slider = $(scope).find('.events-slider');

		addDefaultEvents(slider, scope);

		slider.slick({
			...sliderDefaultOptions(scope),
			appendArrows: $(scope).find('.slider-nav'),
			slidesToShow: 4,
			responsive: [
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 3,
					}
				}
			]
		});

		equalSlideHeight( slider );
	});

	// Plans table
	$('.plans-table th, .plans-table td').hover(function() {
		var t = parseInt($(this).index()) + 1;
		$('th:nth-child(' + t + '),td:nth-child(' + t + ')').addClass('hovered');
	}, function() {
		var t = parseInt($(this).index()) + 1;
		$('th:nth-child(' + t + '),td:nth-child(' + t + ')').removeClass('hovered');
	});

	const toggleAccordion = (el) => {
		let closeText = 'Показать меньше';
		let openText = 'Показать больше';

		let btn = $(el).find('> .ac-header > .ac-opener');

		$(el).find('> .ac-content').stop().slideToggle(300);
		$(el).toggleClass('opened');

		if ( $(el).find('.slick-slider').length > 0 ) {
			$(el).find('.slick-slider').slick('setPosition');
		}

		if ( btn.attr('aria-expanded') == 'false' ) {
			btn.attr({
				'aria-expanded': 'true',
				'aria-label': closeText
			});
		} else{
			btn.attr({
				'aria-expanded': 'false',
				'aria-label': openText
			});
		}
	}

	$('.accordion, .js-accordion').each(function(i, el){
		$(el).find('> .ac-header, > .ac-header > .ac-opener').click(function(e){
			e.preventDefault();
			e.stopPropagation();

			toggleAccordion( $(el) );
		});

		if ($(el).hasClass('opened-on-load')) {
			$(el).find('.ac-header').trigger('click');
		}
	});

	// Tabs
	function goToTab(tabId, handler){
		if (handler == undefined) {
			handler = false;
		}

		let dest = $( tabId );
		dest.stop().fadeIn(300).siblings().hide(0);

		$('[data-tab="'+tabId+'"]').addClass('current').parent().siblings().find('[data-tab]').removeClass('current');
	}

	$("[data-tab]").click(function(e){
		e.preventDefault();
		let dest = $(this).data('tab');

		goToTab(dest, $(this));

		// $(dest).find('.slick-slider').slick('setPosition');
	});

	$(".filter-nav, .tabs-nav, .cmp-tabs-nav, .plans-tabs-nav").each(function(i, el){
		$(el).find('[data-tab]').eq(0).click();
	});

	$('.tabs-select').on('change', function(){
		goToTab($(this).val());
	});

	// Scroll to anchor
	$(document).on('click', 'a[href^="#"]', function (event) {
		event.preventDefault();

		if ($.attr(this, 'href') === '#') {
			return false;
		}

		let offset = 72;

		if ($(window).width() < 992) {
			offset = 56;
		}

		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top - offset
		}, 500);
	});

	// Menu opener
	$('.menu-opener').click(function(e){
		e.preventDefault();

		$('.menu-opener').toggleClass('active');
		$('.side-nav').toggleClass('opened');
		$('body, .header').toggleClass('nav-opened');
	});

	// Sticky Header
	function stickyHeader(){
		let header = document.querySelector('.header');

		if (!!header) {
			window.scrollY > 0
				? header.classList.add('sticky')
				: header.classList.remove('sticky');
		};
	}


	window.addEventListener('scroll', stickyHeader);
	setTimeout(stickyHeader, 100);
});