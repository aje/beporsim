'use strict';

var current_section = "home";
var crood = 0;
var anim = 0;

var current_section = 0;
var is_scrolling = 0;
var childAnimationDone = 0;
var childAnimationUpDone = 0;
var child_animate = false;
var h = $(window).height()-100;
var scrollInner = $('.scroll-inner');
var section = $('.section_animated');
var section_height = 0;
var sections = [
		{
		    id:"home",
		    animatationdown: slideDownHomeMobile,
		    childs:[]
		},
		{
		    id:"whybeporsim",
		    animationdone: openSlideDescription,
		    animatationup: slideUpHomeMobile,
		    childs:[
		    	{
				    animation: slideArticle,
				    animationUp: slideArticleUp
				}
		    ]  
		},
		{
		    id:"scoring",
		    // animatationdown: topHeaderSelect,
		    childs:[]  
		},
		{
		    id:"contest",
		    childs:[
		    	{
				    animation: slideHeader,
				    animationUp: slideHeaderUp
				}
			]  
		},
		{
		    id:"devices",
		    childs:[
		    	{
				    animation: hideHeader,
				    animationUp: hideHeaderUp
				}
			]  
		},
		{
		    id:"footer",
		    childs:[]  
		}
	]
;

if (document.addEventListener) {
    document.addEventListener("mousewheel", MouseWheelHandler(), false);
    document.addEventListener("DOMMouseScroll", MouseWheelHandler(), false);
} else {
    sq.attachEvent("onmousewheel", MouseWheelHandler());
}

function topHeaderSelect () {
	setTimeout(function () {
		$('#topheaderselect').animate({lineHeight: "3em"}, 200);
		$('#topheaderselect').translate3d({x: 0, y: 0,z:0},200)
	}, 800)
}

function MouseWheelHandler() {
    return function (e) {
        // cross-browser wheel delta
        var e = window.event || e;
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

        //scrolling down?
        if (delta < 0) {
            downevent();
        }

        //scrolling up?
        else {
            upevent();
        }
        return false;
    }
}

$(document).keydown(function(e) {
    switch(e.which) {
        case 38: // up
        	upevent()
        break;

        case 40: // down
        	downevent()
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

$(document).swipe( {
  swipeUp:function(event, direction, distance, duration) {
    downevent()
  },
  swipeDown:function(event, direction, distance, duration) {
    upevent() 
  },
  click:function(event, target) { 
  },
  threshold:100,
  allowPageScroll:"vertical"
});

$(document).on('click', '.downevent', function(event) {
	event.preventDefault();
	downevent();
});

$(document).on('click', '.reset', function(event) {
	event.preventDefault();
	reset_scroll();
});

$(document).on('click', '.open_modal', function(event) {
	event.preventDefault();
	var target_height = $('.modal').height();
	open_modal(target_height);
	is_scrolling = 1;
});

$(window).on('resize', function() {
	reset_scroll();
});

function reset_scroll () {
	animate_scroll_up(0);
	slideUpHomeMobile();
	slideArticleUp();
	slideHeaderUp();
	hideHeaderUp();
	childAnimationDone = 0;
	childAnimationUpDone = 0;
	section_height = 0;
	current_section = 0;
}


function slideDownHomeMobile () {
	// $('#homemobile').addClass('scrolldown');
	$('#homemobile').translate3d({x: 0, y: 10 +"%",z:0},850)
}
function slideUpHomeMobile () {
	$('#homemobile').translate3d({x: 0, y: -40 +"%",z:0},850)
	// $('#homemobile').removeClass('scrolldown');
}
function slideArticle () {
	is_scrolling = 1;
	// $('#slideuparticle').addClass('slideup');
	var crood = $('#first-article').height();
	$('#slideuparticle').translate3d({x: 0, y: -50 +"%" ,z:0},400);
	$('#first-article').animate({opacity : 0}, 400);
	$('#second-article').animate({opacity : 1}, 400);
	$('#second-article p').animate({opacity : 1}, 400);
	setTimeout(function () {
		is_scrolling = 0;
	}, 400);
}
function slideArticleUp () {
	is_scrolling = 1;
	// $('#slideuparticle').removeClass('slideup');
	var crood = $('#first-article').height();
	$('#slideuparticle').translate3d({x: 0, y: 0 ,z:0},400);
	$('#first-article').animate({opacity : 1}, 400);
	$('#second-article').animate({opacity : 0}, 400);
	$('#second-article p').animate({opacity : 0}, 400);
	setTimeout(function () {
		is_scrolling = 0;
	}, 400);
}

function openSlideDescription () {
	$('.p-wrapper').addClass('open');
}

function slideHeader () {	
	is_scrolling = 1;
	$('#contest').addClass('slideup');
	setTimeout(function () {
		is_scrolling = 0;
	}, 700);
}

function hideHeader () {
	is_scrolling = 1;
	$('#devices-download').addClass('slideup');
	setTimeout(function () {
		is_scrolling = 0;
	}, 700);
}

function slideHeaderUp () {
	is_scrolling = 1;
	$('#contest').removeClass('slideup');
	setTimeout(function () {
		is_scrolling = 0;
	}, 700);
}

function hideHeaderUp () {
	is_scrolling = 1;
 	$('#devices-download').removeClass('slideup');
	setTimeout(function () {
		is_scrolling = 0;
	}, 700);
}

function animate_scroll_down (crood) {
	is_scrolling = 1;
	var cl = current_section + 1;
	scrollInner.translate3d({x: 0, y: "-"+crood+"px",z:0},850,function(){
		current_section++;
		is_scrolling = 0;
	});
	$('body').addClass("step-" + cl)
};
function animate_scroll_up (crood) {
	is_scrolling = 1;
	var cl = current_section;
	scrollInner.translate3d({x: 0, y: "-"+crood+"px",z:0},850,function(){
		if (current_section == 0) {
			current_section = 0;
		} else { current_section--};
		is_scrolling = 0;
	});
	$('body').removeClass("step-" + cl);
};

function open_modal (crood) {
	is_scrolling = 1;
	scrollInner.translate3d({x: 0, y: "+"+crood+"px",z:0},850);
	$("#scrolldown-btn").fadeOut();
}

$('.close-modal').on('click', function(event) {
	event.preventDefault();
	reset_scroll();
	$("#scrolldown-btn").fadeIn();
});

function downevent () {
	if (is_scrolling || current_section >= sections.length-1  ) { return };

	if (childAnimationDone || sections[current_section].childs.length == 0) {
		section_height += section.eq(current_section+1).height();
		animate_scroll_down(section_height);
		childAnimationDone = 0;
		childAnimationUpDone = 1;
		if (typeof sections[current_section].animationdone != 'undefined' ) {
			    setTimeout(sections[current_section].animationdone, 1000);
		}
		if (typeof sections[current_section].animatationdown != 'undefined' ) {
			sections[current_section].animatationdown();
		};
	} else {	
		sections[current_section].childs[0].animation();
		childAnimationUpDone = 0;
		childAnimationDone = 1;
	}
	// console.log("down " + section_height + " " + section.eq(current_section).height() + " " + current_section + " " + childAnimationDone);
}

function upevent () {
	if (is_scrolling || current_section <= 0  ) { return };

	if (childAnimationUpDone || (sections[current_section].childs.length == 0)) {
		section_height -= section.eq(current_section).height();
		animate_scroll_up(section_height);
		childAnimationUpDone = 0;
		childAnimationDone = 1;
		if (typeof sections[current_section].animatationup != 'undefined' ) {
			sections[current_section].animatationup();
		};
	} else {	
		sections[current_section].childs[0].animationUp();
		childAnimationDone = 0;
		childAnimationUpDone = 1;
	};
	// console.log("up " + section_height + " " + section.eq(current_section).height() + " " + current_section + " " + childAnimationUpDone);
}



(function($) {
    var delay = 0;
    $.fn.translate3d = function(translations, speed, easing, complete) {
        var opt = $.speed(speed, easing, complete);
        opt.easing = opt.easing || 'ease';
        translations = $.extend({x: 0, y: 0, z: 0}, translations);

        return this.each(function() {
            var $this = $(this);

            $this.css({ 
                transitionDuration: opt.duration + 'ms',
                // transitionTimingFunction: opt.easing,
                transform: 'translate3d(' + translations.x + ', ' + translations.y + ', ' + translations.z + ')'
            });

            setTimeout(function() { 
                $this.css({ 
                    transitionDuration: '0s', 
                    // transitionTimingFunction: 'ease'
                });

                opt.complete();
            }, opt.duration + (delay || 0));
        });
    };
})(jQuery);