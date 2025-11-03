/*
	Author: themexriver
	Version: 1.0
*/


(function ($) {
"use strict";


gsap.config({
	nullTargetWarn: false,
});



// smooth scroll activation start

const lenis = new Lenis({
	duration: 1,
	easing: (t) => 1 - Math.pow(1 - t, 4),
	direction: 'vertical', 
	smooth: true, 
	smoothTouch: false, 
});
  
function raf(time) {
	lenis.raf(time);
	requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
$('a[href^="#"]').on('click', function (e) {
	e.preventDefault(); 

	const target = $(this.getAttribute('href')); 

	if (target.length) {
		lenis.scrollTo(target[0], {
		duration: 1.2, 
		easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
		});
	}
});




// preloader
document.addEventListener("DOMContentLoaded", function () {

	let preloader = document.querySelector(".as-preloader");

	window.addEventListener('load', function(){

		if (preloader) {
			preloader.classList.add("loaded");
			setTimeout(function () {
				  preloader.remove();
			}, 1000 ) ;

		}

		CustomEase.create("ease1", "0.19, 1, 0.22, 1");
        
        
		/* 
			wa-split-clr
		*/	
		if ($(".wa-split-clr").length) {
			var waSplitClr = $(".wa-split-clr");
			if (waSplitClr.length == 0) return;

			gsap.registerPlugin(SplitText);

			waSplitClr.each(function (index, el) {
				el.split = new SplitText(el, {
					type: "lines,words,chars",
					linesClass: "split-line",
				});

				gsap.set(el, { perspective: 400 });

				let delayValue = $(el).attr("data-split-delay") || "0s";
				delayValue = parseFloat(delayValue) || 0; 

				if ($(el).hasClass("wa-split-clr")) {
					gsap.set(el.split.chars, {
						x: "50",
						opacity: 0,
					});
				}

				el.anim = gsap.to(el.split.chars, {
					scrollTrigger: {
						trigger: el,
						start: "top 86%",
						toggleActions: 'play none none reverse',
					},
					x: 0,
					opacity: 1,
					duration: 0.4,
					ease: "ease1",
					stagger: 0.02,
					delay: delayValue, 
				});
			});
		}


		
		// wow-activation
		if($('.wow').length){
			var wow = new WOW(
			{
				boxClass:     'wow',
				animateClass: 'animated',
				offset:       0,
				mobile:       true,
				live:         true
			}
			);
			wow.init();
		};

    
	})

});



$(window).scroll(function() {
	if ($(this).scrollTop() > 2){
	$('.wa-sticky-header-2').addClass('has-sticky');
	}
	else{
	$('.wa-sticky-header-2').removeClass('has-sticky');
	}
});

$(window).scroll(function() {
	if ($(this).scrollTop() > 300){
	$('.sticky_header_1').addClass('sticky1');
	}
	else{
	$('.sticky_header_1').removeClass('sticky1');
	}
});

// Toggle Offcanvas start
$('.offcanvas_toggle').on('click', function() {
    $('.overlay, .offcanvas_box_active').addClass('active');
});

$('.overlay, .offcanvas_box_close').on('click', function() {
    $('.offcanvas_box_active').removeClass('active');
    $('.overlay').removeClass('active');
});

$(document).on('keydown', function(event) {
    if (event.key === 'Escape') {
        $('.offcanvas_box_active').removeClass('active');
        $('.overlay').removeClass('active');
    }
});

$('.offcanvas_box_active a').on('click', function() {
    $('.offcanvas_box_active').removeClass('active');
    $('.overlay').removeClass('active');
});

// related-theme
$('.related-theme-btn , .related-theme-overlay').on('click', function() {
    $('.related-theme-overlay, .related-theme-area , .related-theme-btn').toggleClass('active');
});


$(document).on('keydown', function(event) {
    if (event.key === 'Escape') {
        $('.related-theme-area').removeClass('active');
        $('.related-theme-overlay').removeClass('active');
        $('.related-theme-btn').removeClass('active');
    }
});

$('.related-theme-area a').on('click', function() {
    $('.related-theme-area').removeClass('active');
    $('.related-theme-btn').removeClass('active');
    $('.related-theme-overlay').removeClass('active');
});

// mobile-menu
jQuery(".mobile-main-navigation li.dropdown").append('<span class="dropdown-btn"><i class="fa-solid fa-angle-right"></i></span>'),
	jQuery(".mobile-main-navigation li .dropdown-btn").on("click", function () {
		jQuery(this).hasClass("active")
		? (jQuery(this).closest("ul").find(".dropdown-btn.active").toggleClass("active"), jQuery(this).closest("ul").find(".dropdown-menu.active").toggleClass("active").slideToggle())
		: (jQuery(this).closest("ul").find(".dropdown-btn.active").toggleClass("active"),
			jQuery(this).closest("ul").find(".dropdown-menu.active").toggleClass("active").slideToggle(),
			jQuery(this).toggleClass("active"),
			jQuery(this).parent().find("> .dropdown-menu").toggleClass("active"),
			jQuery(this).parent().find("> .dropdown-menu").slideToggle());
});

// wa-bg-parallax
gsap.utils.toArray(".wa-parallax-bg").forEach(element => {
	gsap.fromTo(
		element,
		{ backgroundPosition: "50% 0%" }, 
		{ 
			backgroundPosition: "50% 100%", 
			ease: "none",
			scrollTrigger: {
				trigger: element,
				scrub: .5,    
				markers: false,  
			},
		}
	);
});


// slideInUp
gsap.utils.toArray('.wa-fadeInUp').forEach((item) => {
	gsap.from(item, {
	  y: 30,
	  ease: "Back.easeOut",
	  autoAlpha: 0,
	  duration: 1,
	  scrollTrigger: {
		trigger: item,
		start: "top 90%",
		toggleActions: 'play none none reverse',
		markers: false,
	  },
	});
});


/* 
	elementor-animation
*/
var pxFeatures = gsap.timeline({
	scrollTrigger: {
		trigger: ".nm-elementor-img",
		start: "top 80%",  
		toggleActions: 'play none none reverse',
		markers: false  
	},
	defaults: { 
		duration: .5,
		ease: "ease1", 
	} //
});

pxFeatures.from(".nm-elementor-img-1" , { yPercent: 50, })
pxFeatures.from(".nm-elementor-img-5" , { yPercent: 100, opacity: 0 }, "<=.2")
pxFeatures.from(".nm-elementor-img-2" , { yPercent: 100, opacity: 0 }, "<=.2")
pxFeatures.from(".nm-elementor-img-3" , { yPercent: 100, opacity: 0 }, "<=.2")
pxFeatures.from(".nm-elementor-img-4" , { yPercent: 100, opacity: 0 }, "<=.2")
pxFeatures.from(".nm-elementor-img-6" , { yPercent: 100, opacity: 0 }, "<=.2")






// slide-text-1
if($('.marquee_active').length) {
	$('.marquee_active').marquee({
		gap: 0,
		speed: 20,
		delayBeforeStart: 0,
		direction: 'left',
		duplicated: true,
		pauseOnHover: false,
		startVisible:true,
	});
}

// slide-text-2
if($('.marquee_right_active').length) {
	$('.marquee_right_active').marquee({
		gap: 0,
		speed: 20,
		delayBeforeStart: 0,
		direction: 'right',
		duplicated: true,
		pauseOnHover: false,
		startVisible:true,
	});
}




// bootstrap-tooltip
$(function () {
	$('[data-toggle="tooltip"]').tooltip()
})

// counter-activation
$('.counter').counterUp({
	time: 2000
});

/* back-to-top */
var backtotop = $('.scroll_top');

backtotop.on('click', function(e) {
	e.preventDefault();
	$('html, body').animate({scrollTop:0}, '700');
});


/* data-bg-activation */
$("[data-background]").each(function(){
	$(this).css("background-image","url("+$(this).attr("data-background") + ") ")
})




if ($('.copyright-year').length) {
    const currentYear = new Date().getFullYear();
    $('.copyright-year').text(currentYear);
}


})(jQuery);