Bounce Slider
=============

A really simple, responsive image slider.

Description
-----------

BounceSlider is a tiny jQuery plugin that allows to create simple slideshow using images inside ul. It depends on jQuery and Modernizr to work properly in browsers which don’t support css animation.

BounceSlider is simple and don't try to do everything. So you shouldn't expect tons of features and options to set. In return you get small file size, which is so important in responsive design. Enjoy!

Features
--------

* Fully responsive
* Small size
* Automatic and manual transition between slides
* Multiple slideshows supported
* Separate pagination and next/prev controls
* Showing/hidding pagination and next/prev controls
* Support for gestures on mobile (swipe to go between slides)
* Different look&feel for different platform

How to use
----------

### 1. Link files:

    <script type="text/javascript" src="javascript/bounceslider/modernizr.js"></script>
    <link href="styles/bounce_slider.css" type="text/css" rel="stylesheet" media="all" />
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
    <script type="text/javascript" src="javascript/bounceslider/jquery.bounceslider.js"></script>
    
Note: Note: if you've already used [Modernizr library](https://github.com/Modernizr/Modernizr) you need to check in you script whather css animation is supported by the borwser to make Baounce Slider work properly.

### 2. Add markup:

    <div class="bounce-slider" id="slider-id">
    	<ul>
    		<li>
    			<p class="bounce-desc left-side"><span>Description image 1</span></p>
    			<img src="image1.jpg" alt="image 1"/>
    		</li>
    		<li>
    			<p class="bounce-desc right-side"><span>Description image 2</span></p>
    			<img src="image2.jpg" alt="image 2"/>
    		</li>
    	</ul>
    	<span class="next bounce-nav">></span>	
    	<span class="prev bounce-nav"><</span>
    </div>
    
### 3. Hook up the slideshow:

    jQuery(document).ready(function($){
	    $('#slider-id').bounceSlider();
    });
    
### 4. Set options:

    $('#slider-id').bounceSlider({
    	maxWidth: '300px', // String: maxiumum width of the slider
    	bottomButtonsAsNumbers: true, // Boolean: if true the bottom navigation will show the slide number.
    	auto: true, // Boolean: animate slides automatically 	
    	timeout: 4000 // Number: time between slide transitions, in milliseconds. It only has impact if 'auto' setting is 'true'
    });
    
### 5. Demo:

For demo go to [http://bounceslider.design4mobile.eu](http://bounceslider.design4mobile.eu), or download this repository as a zip file and and open "index.html" from the "demo" folder.



