class InfiniteSlider {
	constructor(animTime = '100', selector = '.slider', container = '#slider-container') {
		this.slider = document.querySelector(selector)
		this.container = document.querySelector(container)
		this.width = 0
		this.oldWidth = 0
		this.duration = parseInt(animTime)
		this.start = 0
		this.refresh = 0 
		this._prevStop = false
		this._stop = false
		this._oldTimestamp = 0
	}
	
	animate() {
		/* fix for browsers who like to run JS before images are loaded */
		const imgs = Array.prototype.slice.call(this.slider.querySelectorAll('img'))
						.filter(img => {
							return img.naturalWidth === 0
						})
		if (imgs.length > 0) {
			window.requestAnimationFrame(this.animate.bind(this));
			return
		}
		
		/* Add another copy of the slideshow to the end, keep track of original width */
		this.oldWidth = this.slider.offsetWidth
		const sliderText = '<span class="slider-extra">' + this.slider.innerHTML + '</span>'
		this.slider.innerHTML += sliderText

		/* can have content still when we move past original slider */
		this.width = this.slider.offsetWidth
		const minWidth = 2 * screen.width

		/* Add more slideshows if needed to keep a continuous stream of content */
		while (this.width < minWidth) {
			this.slider.innerHTML += sliderText
			this.width = this.slider.width
		}
		this.slider.querySelector('.slider-extra:last-child').classList.add('slider-last')
		
		/* loop animation endlesssly (this is pretty cool) */
		window.requestAnimationFrame(this.controlAnimation.bind(this))
	}
	
	halt() {
		this._stop = true
		this._prevStop = false
	}
	
	go() {
		this._stop = false
		this._prevStop = true
	}
	
	stagnate() {
		this.container.style.overflowX = "scroll"
	}
	
	controlAnimation(timestamp) {
		//console.log('this.stop: ' + this._stop + '\nthis.prevStop: ' + this._prevStop)
		if (this._stop === true) {
			if (this._prevStop === false) {
				this.slider.style.marginLeft = getComputedStyle(this.slider).marginLeft
				this._prevStop = true
				this._oldTimestamp = timestamp
			}
		} else if (this._stop === false && this._prevStop === true) {
			this._prevStop = false
			this.start = this.start + (timestamp - this._oldTimestamp)
		} else {
			//reset animation
			if (this.refresh >= 5) {
				this.start = timestamp
				this.slider.style.marginLeft = 0
				this.refresh = 0
				window.requestAnimationFrame(this.controlAnimation.bind(this))
				return
			}
			if (timestamp - this.start >= this.duration) {
				this.refresh = 1
			}
			
			const perc = ((timestamp - (this.start)) / this.duration) * this.oldWidth
			this.slider.style.marginLeft = (-perc) + 'px'
		}
		window.requestAnimationFrame(this.controlAnimation.bind(this))
		return
	}
	
	getIeWidth() {
		this.slider.style.marginLeft = '-99999px';
	}
	
	ie11Fix() {
		this.slider.querySelector('.slider-last').style.position = 'absolute';
	}
}

function detectIE() {
	var ua = window.navigator.userAgent
	var msie = ua.indexOf('MSIE ')

	if (msie > 0) {
		// IE 10 or older => return version number
		return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 20)
	}
	
	var trident = ua.indexOf('Trident/')
	if (trident > 0) {
		// IE 11 => return version number
		var rv = ua.indexOf('rv:')
		return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 20)
	}

	var edge = ua.indexOf('Edge/');
	if (edge > 0) {
		// Edge (IE 12+) => return version number
		return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 20)
	}

	// other browser
	return false
}


document.addEventListener('DOMContentLoaded', function() {
	const slider = new InfiniteSlider(20000)
	const ie = detectIE()
	
	//Dont animate under IE10, just place the images
	if (ie !== false && ie < 20) {
		slider.stagnate()
		return
	}
	//IE 11 and lower, fix for width *increasing* as more of the slider is shown
	if (ie !== false && ie < 22) { slider.getIeWidth() }
	
	slider.animate()
	document.querySelector('#slider-container')
		.addEventListener('mouseenter', slider.halt.bind(slider))
	document.querySelector('#slider-container')
		.addEventListener('mouseleave', slider.go.bind(slider))
	
	if (ie === 11) {
		setTimeout(slider.ie11Fix.bind(slider), 1000)
	}
});