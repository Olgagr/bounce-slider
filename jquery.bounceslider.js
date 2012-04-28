/*! Bounce Slider v.1.0
 * http://bounceslider.design4mobile.eu
 * http://design4mobile.eu
 *
 * Copyright (c) 2012 @Olgagr
 * Available under the MIT license
 */
;(function($){
	
	$.fn.bounceSlider = function(options){
		
		/* settings */
		var defaults = {
			maxWidth: '',
			bottomButtonsAsNumbers: false,
			auto: false,                 
			timeout: 5000, 
			bottomNavigation: true,
			nextPrevNavigation: true
		};
		
		var o = $.extend(defaults, options);
		var touchEndEvent = "ontouchend" in document ? "touchend" : "mouseup";
		
		return this.each(function(){
			var $this = $(this),
				$slides = $('li', $this),
				$activeSlide = $slides.eq(0),
				slidersAmount = $slides.length,
				maxIndex = slidersAmount - 1
				slidesShortcut = [];
			
			/* hidding side navigation */
			if(!o.nextPrevNavigation){
				$('.bounce-nav').hide();
			}
			
			/* z-index settings */
			var bottomButtonClass= '';
			for(var i = 1; i <= slidersAmount; i++){
				bottomButtonClass = i == 1 ? 'gradient active' : 'gradient'; 
				$slides.eq(i-1).css({'z-index': slidersAmount - i}).attr('data-slide-number', i);
				slidesShortcut.push('<li data-goto-slide="' + i + '" class="' + bottomButtonClass + '">'+ i +'</li>');	
			}
			
			/* add bottom slide buttons */
			if(o.bottomNavigation){
				var bottomButtonsClass = o.bottomButtonsAsNumbers ? 'bounce-bottom-buttons numbers' : 'bounce-bottom-buttons';
				$('<ol/>').addClass(bottomButtonsClass)
						  .append(slidesShortcut.join(''))
						  .appendTo($this);
			}	
			
			/* set max width of slider */
			if(o.maxWidth){
				$this.css({'max-width': o.maxWidth});
			}
			
			/* helper function - change description look */
			var changeLookFeelDesc = function(){
				if($(window).width() <  769) {
					$('.bounce-desc', $this).addClass('rectangle');
				} else {
					$('.bounce-desc', $this).removeClass('rectangle');
				}	
			}
			
			changeLookFeelDesc();
			
			/* setting animation for active slide description */
			var setActiveDescAnimation = function(){
				var $bounceDesc = $('.bounce-desc', $activeSlide); 
				if(Modernizr.cssanimations){
					
					/* different exit for different class */
					if($bounceDesc.hasClass('left-side')){
						$bounceDesc.addClass('bounce-to-left');				
					}
					if($bounceDesc.hasClass('right-side')){
						$bounceDesc.addClass('bounce-to-right');				
					}	
					
				} else {
					$bounceDesc.animate({
						opacity: 0	
					}, 600);			
				}
			}
			
			/* setting animation for next/previous slide description */
			var setSequentDescAnimation = function($sequentDesc){
				
				/* different entrance for different class */
				if($sequentDesc.hasClass('left-side')){
					$sequentDesc.addClass('bounce-from-left');		
				}
				if($sequentDesc.hasClass('right-side')){
					$sequentDesc.addClass('bounce-from-right');		
				}			
			};
			
			/* helper function - clear all animation class from slide desciption */
			var clearAnimClass = function($desc){
				$desc.removeClass('bounce-to-left bounce-to-right bounce-from-left bounce-from-right');		
			};
			
			/* helper function - set 0 index for all slides except the active one */
			var setStack = function(){
				$('> ul > li', $this).not($activeSlide)
											 .css({'z-index': 0});		
			};
			
			
			/* helper function - show proper slide */
			var showProperSlide = function($properSlide, $properSlideDesc){
				clearAnimClass($properSlideDesc.add($('.bounce-desc', $activeSlide)));
				$properSlideDesc.css({'opacity': 0});
				setStack();
				$properSlide.css({'z-index': maxIndex - 1});
				setActiveDescAnimation();
				
				$activeSlide.animate({
					opacity: 0
				}, 800, function(){
					setSequentDescAnimation($properSlideDesc);
					$activeSlide.css({'z-index': 0, 'opacity': 100});
					$properSlide.css({'z-index': maxIndex});	
					$activeSlide = $properSlide;
					setActiveBottomElement($activeSlide.attr('data-slide-number'));	
				});				
			}
			
			/* set autoplay */		
			if(o.auto){
				var autoplay = setInterval(function(){
				$('.bounce-nav.next', $this).trigger(touchEndEvent);			
				}, o.timeout);	
			};
			
			/* helper function - set again interval after clicking an option in navigation */
			var setIntervalAgain = function(){
				if(o.auto){
					clearInterval(autoplay);
					autoplay = setInterval(function(){
						$('.bounce-nav.next', $this).trigger(touchEndEvent);			
					}, o.timeout);		
				}	
			};
			
			/* helper function - set active element in bottom navigation */
			var setActiveBottomElement = function(elementNumber){
				$('.bounce-bottom-buttons li', $this).removeClass('active');
				$('.bounce-bottom-buttons li[data-goto-slide="'+ elementNumber +'"]', $this).addClass('active');	
			};
			
			
			/* next slide */
			$('.bounce-nav.next', $this).bind(touchEndEvent, function(){
				var $nextSlide = $activeSlide.next().length > 0 ? $activeSlide.next() : $slides.eq(0);	
				showProperSlide($nextSlide, $('.bounce-desc', $nextSlide));	
				setIntervalAgain();
			});
			
			/* previous slide */
			$('.bounce-nav.prev', $this).bind(touchEndEvent, function(){
				var $prevSlide = $activeSlide.prev().length > 0 ? $activeSlide.prev() : $slides.last();
				showProperSlide($prevSlide, $('.bounce-desc', $prevSlide));	
				setIntervalAgain();	
			});
			
			/* bottom buttons */
			$('.bounce-bottom-buttons li', $this).bind(touchEndEvent, function(){
				var $nextSlide = $('ul li[data-slide-number="' + $(this).attr('data-goto-slide') + '"]', $this);
				
				if(!$nextSlide.is($activeSlide)){
					showProperSlide($nextSlide, $('.bounce-desc', $nextSlide));			
				}
				setIntervalAgain();
			});
			
			/* window resize actions */
			$(window).resize(function(){
				changeLookFeelDesc();			
			});
			
			/* swipe for mobile */
			var xStart; 
			$('> ul', $this).bind({
			"touchstart mousedown": function(e) { 
				e.preventDefault(); // Handle the start
				var event = e.originalEvent,
					touch = event.targetTouches ? event.targetTouches[0] : e; 
					
					xStart = touch.pageX;
			}, "touchend mouseup": function(e) {
				var event = e.originalEvent,
				touch = event.changedTouches ? event.changedTouches[0] : e, 
				diffX = touch.pageX - xStart;
				
				// See if we swiped! 
				if(Math.abs(diffX) > 30) {
					if( diffX > 0 ){ 
						//swiped right
						$('.bounce-nav.prev', $this).trigger(touchEndEvent);
					} else {
						//swiped left
						$('.bounce-nav.next', $this).trigger(touchEndEvent);
					}
				}	
			
			}, "touchmove": function(e) {
				e.preventDefault();
			} });
			
		});
			
	}
	
})(jQuery);
