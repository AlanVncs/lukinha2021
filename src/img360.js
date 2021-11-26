"use strict";
var dragVelocity = 10;
var Img360 = /** @class */ (function () {
    function Img360(options) {
        var _this_1 = this;
        this.pixelAccumulator = 0;
        this.index = 0;
        this.$imgArray = [];
        this.autoPlayTask = 0;
        this.autoPlayingActive = false;
        this.$mainContainer = options.$mainContainer;
        this.$thumbContainer = options.$thumbContainer;
        this.imageArray = options.imageArray;
        this.autoplaySpeed = options.autoplaySpeed || 200;
        this.$buttonPrev = options.$buttonPrev;
        this.$buttonNext = options.$buttonNext;
        this.$buttonAutoplay = options.$buttonAutoplay;
        this.imageArray.forEach(function (image, index) {
            var $img = document.createElement('img');
            _this_1.$imgArray.push($img);
            $img.src = image;
            if (index != 0) {
                $img.style.display = 'none';
            }
            _this_1.$mainContainer.appendChild($img);
        });
        var $img = document.createElement('img');
        $img.src = this.imageArray[0];
        this.$thumbContainer.appendChild($img);
        this.setButtonsEnvents();
        this.dragTest();
    }
    Img360.prototype.setButtonsEnvents = function () {
        var _this_1 = this;
        this.$buttonPrev.addEventListener('click', function () {
            _this_1.prevImage();
        });
        this.$buttonNext.addEventListener('click', function () {
            _this_1.nextImage();
        });
        this.$buttonAutoplay.addEventListener('click', function () {
            if (_this_1.isAutoPdddlaying()) {
                _this_1.stopAutoplay();
                _this_1.$buttonAutoplay.classList.remove('playing');
            }
            else {
                _this_1.startAutoplay();
                _this_1.$buttonAutoplay.classList.add('playing');
            }
        });
    };
    Img360.prototype.isAutoPdddlaying = function () {
        return this.autoPlayingActive;
    };
    Img360.prototype.startAutoplay = function () {
        var _this_1 = this;
        this.autoPlayTask = setInterval(function () {
            _this_1.nextImage();
        }, this.autoplaySpeed);
        this.autoPlayingActive = true;
    };
    Img360.prototype.stopAutoplay = function () {
        if (this.autoPlayTask != 0) {
            clearInterval(this.autoPlayTask);
            this.autoPlayingActive = false;
        }
    };
    Img360.prototype.prevImage = function () {
        this.$imgArray[this.index].style.display = 'none';
        if (this.index == 0) {
            this.index = this.imageArray.length - 1;
        }
        else {
            this.index -= 1;
        }
        this.$imgArray[this.index].style.display = 'block';
    };
    Img360.prototype.nextImage = function () {
        this.$imgArray[this.index].style.display = 'none';
        if (this.index == this.imageArray.length - 1) {
            this.index = 0;
        }
        else {
            this.index += 1;
        }
        this.$imgArray[this.index].style.display = 'block';
    };
    Img360.prototype.rotate = function (pixels) {
        this.pixelAccumulator += pixels;
        // const minPixels = this.$mainContainer.offsetWidth / 360
        var numberOfImages = this.imageArray.length;
        this.$mainContainer.offsetWidth / numberOfImages;
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
    };
    Img360.prototype.dragTest = function () {
        // console.log(this.$imgArray[0])
        // this.containerWidth = this.$imgArray[0].offsetWidth
        // console.log(`Width: ${this.containerWidth}`)
        // const $video = document.querySelector<HTMLElement>('.product__slide-image.video .video-container')
        // @ts-ignore
        // @ts-ignore
        this.$mainContainer.addEventListener('touchstart', handleTouchStart, false);
        // @ts-ignore
        this.$mainContainer.addEventListener('touchmove', handleTouchMove, false);
        // @ts-ignore
        var xDown = null;
        // @ts-ignore
        // var yDown = null
        var _this = this;
        // @ts-ignore
        function getTouches(evt) {
            return (evt.touches || // browser API
                evt.originalEvent.touches); // jQuery
        }
        // @ts-ignore
        function handleTouchStart(evt) {
            evt.stopPropagation();
            var firstTouch = getTouches(evt)[0];
            xDown = firstTouch.clientX;
            // yDown = firstTouch.clientY
        }
        // @ts-ignore
        function handleTouchMove(evt) {
            // @ts-ignore
            if (_this.$mainContainer.offsetWidth == 0)
                return;
            // @ts-ignore
            if (!xDown) {
                return;
            }
            var xUp = evt.touches[0].clientX;
            // var yUp = evt.touches[0].clientY
            // @ts-ignore
            var xDiff = xDown - xUp;
            _this.rotate(xDiff);
            xDown = xUp;
            // @ts-ignore
            // var yDiff = yDown - yUp
            console.log(xDiff);
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
    };
    return Img360;
}());
