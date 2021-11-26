interface Img360Props {
	$mainContainer: HTMLElement
	imageArray: string[]
	autoplaySpeed: number
	$buttonPrev: HTMLButtonElement
	$buttonNext: HTMLButtonElement
	$buttonAutoplay: HTMLButtonElement
	$thumbContainer: Element
	containerWidth: number
}

const dragVelocity = 10

class Img360 {
	$mainContainer: HTMLElement
	$thumbContainer: Element
	imageArray: string[]
	autoplaySpeed: number
	$buttonPrev: HTMLButtonElement
	$buttonNext: HTMLButtonElement
	$buttonAutoplay: HTMLButtonElement
	pixelAccumulator: number = 0
	private index: number = 0
	private $imgArray: HTMLImageElement[] = []
	private autoPlayTask: number = 0
	private autoPlayingActive: boolean = false

	constructor(options: Img360Props) {
		this.$mainContainer = options.$mainContainer
		this.$thumbContainer = options.$thumbContainer
		this.imageArray = options.imageArray
		this.autoplaySpeed = options.autoplaySpeed || 200
		this.$buttonPrev = options.$buttonPrev
		this.$buttonNext = options.$buttonNext
		this.$buttonAutoplay = options.$buttonAutoplay

		this.imageArray.forEach((image, index) => {
			const $img = document.createElement('img')
			this.$imgArray.push($img)
			$img.src = image
			if (index != 0) {
				$img.style.display = 'none'
			}
			this.$mainContainer.appendChild($img)
		})

		const $img = document.createElement('img')
		$img.src = this.imageArray[0]
		this.$thumbContainer.appendChild($img)
		this.setButtonsEnvents()
		this.dragTest()
	}

	setButtonsEnvents() {
		this.$buttonPrev.addEventListener('click', () => {
			this.prevImage()
		})
		this.$buttonNext.addEventListener('click', () => {
			this.nextImage()
		})
		this.$buttonAutoplay.addEventListener('click', () => {
			if (this.isAutoPdddlaying()) {
				this.stopAutoplay()
				this.$buttonAutoplay.classList.remove('playing')
			} else {
				this.startAutoplay()
				this.$buttonAutoplay.classList.add('playing')
			}
		})
	}

	isAutoPdddlaying() {
		return this.autoPlayingActive
	}

	startAutoplay() {
		this.autoPlayTask = setInterval(() => {
			this.nextImage()
		}, this.autoplaySpeed)
		this.autoPlayingActive = true
	}

	stopAutoplay() {
		if (this.autoPlayTask != 0) {
			clearInterval(this.autoPlayTask)
			this.autoPlayingActive = false
		}
	}

	prevImage() {
		this.$imgArray[this.index].style.display = 'none'
		if (this.index == 0) {
			this.index = this.imageArray.length - 1
		} else {
			this.index -= 1
		}
		this.$imgArray[this.index].style.display = 'block'
	}

	nextImage() {
		this.$imgArray[this.index].style.display = 'none'
		if (this.index == this.imageArray.length - 1) {
			this.index = 0
		} else {
			this.index += 1
		}
		this.$imgArray[this.index].style.display = 'block'
	}

	rotate(pixels: number) {
		this.pixelAccumulator += pixels

		
		// const minPixels = this.$mainContainer.offsetWidth / 360
		
		const numberOfImages = this.imageArray.length
		this.$mainContainer.offsetWidth/numberOfImages

		// numberOfImages/360



		// if (this.pixelAccumulator > minPixels || this.pixelAccumulator < -minPixels) {}

		// const reducer = 50000
		// const percent = dragVelocity * pixels
		// const offSet = Math.ceil((percent * numberOfImages) / reducer)
		// console.log(`Offset: ${offSet}`)

		// const currentIndex = this.index
		// const nextIndex = (this.index + offSet) % numberOfImages
		// console.log(`new index: ${nextIndex}`)
		// this.index = nextIndex

		// this.$imgArray[currentIndex].style.display = 'none'
		// this.$imgArray[nextIndex].style.display = 'block'
	}

	dragTest() {
		// console.log(this.$imgArray[0])
		// this.containerWidth = this.$imgArray[0].offsetWidth
		// console.log(`Width: ${this.containerWidth}`)

		// const $video = document.querySelector<HTMLElement>('.product__slide-image.video .video-container')
		// @ts-ignore
		// @ts-ignore
		this.$mainContainer.addEventListener('touchstart', handleTouchStart, false)
		// @ts-ignore
		this.$mainContainer.addEventListener('touchmove', handleTouchMove, false)

		// @ts-ignore
		var xDown = null
		// @ts-ignore
		// var yDown = null

		const _this = this

		// @ts-ignore
		function getTouches(evt) {
			return (
				evt.touches || // browser API
				evt.originalEvent.touches
			) // jQuery
		}

		// @ts-ignore
		function handleTouchStart(evt) {
			evt.stopPropagation()
			const firstTouch = getTouches(evt)[0]
			xDown = firstTouch.clientX
			// yDown = firstTouch.clientY
		}

		// @ts-ignore
		function handleTouchMove(evt) {
			// @ts-ignore
			if (_this.$mainContainer.offsetWidth == 0) return
			// @ts-ignore
			if (!xDown) {
				return
			}

			var xUp = evt.touches[0].clientX
			// var yUp = evt.touches[0].clientY

			// @ts-ignore
			var xDiff = xDown - xUp
			_this.rotate(xDiff)
			xDown = xUp
			// @ts-ignore
			// var yDiff = yDown - yUp

			console.log(xDiff)
			// xDown = 0

			/*most significant*/
			// if (xDiff > 0) {
			// 	/* right swipe */
			// 	console.log('right swipe')
			// } else {
			// 	console.log('left swipe')
			// 	/* left swipe */
			// }

			// if (Math.abs(xDiff) > Math.abs(yDiff)) {
			// 	console.log(xDiff)

			// 	/*most significant*/
			// 	if (xDiff > 0) {
			// 		/* right swipe */
			// 		console.log('right swipe')
			// 	} else {
			// 		console.log('left swipe')
			// 		/* left swipe */
			// 	}
			// } else {
			// 	if (yDiff > 0) {
			// 		/* down swipe */
			// 	} else {
			// 		/* up swipe */
			// 	}
			// }
		}
	}
}
