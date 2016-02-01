"use strict";

var mySliderx = (function () {

  var flag = true,
      timerDuration = 3000,
      timer = 0;

  return {
    init: function(){

      var _this = this;

      //создание точек
      _this.createDots();

      //включим автопереключение
      _this.autoSwitch();

      $('.sliderx__controls-button').on('click', function(e){
        e.preventDefault();

        var $this = $(this),
            slides = $this.closest('.sliderx').find('.sliderx__item'),
            activeSlide = slides.filter('.active'),
            nextSlide = activeSlide.next(),
            prevSlide = activeSlide.prev(),
            firstSlide = slides.first(),
            lastSlide = slides.last();

        _this.clearTimer();

        if ($this.hasClass('sliderx__controls-button_next')) {
          if (nextSlide.length) {
            _this.moveSlide(nextSlide, 'forward');
          } else {
            _this.moveSlide(firstSlide, 'forward');
          }
        } else {
          if (prevSlide.length) {
            _this.moveSlide(prevSlide, 'backward');
          } else {
            _this.moveSlide(lastSlide, 'backward');
          }
        }

      });

      //клик по точкам
      $('.sliderx__dots-link').on('click', function(e) {
        e.preventDefault();

        var $this = $(this),
            dots = $this.closest('.sliderx__dots').find('.sliderx__dots-item'),
            activeDot = dots.filter('.active'),
            dot = $this.closest('.sliderx__dots-item'),
            curDotNum = dot.index(),
            direction = (activeDot.index() < curDotNum) ? 'forward' : 'backward',
            reqSlide = $this.closest('.sliderx').find('.sliderx__item').eq(curDotNum);

        if (!dot.hasClass('.active')) {
          _this.clearTimer();
          _this.moveSlide(reqSlide, direction);
        }
      });

    },

    moveSlide: function (slide, direction) {
      var _this = this,
          container = slide.closest('.sliderx'),
          slides = container.find('.sliderx__item'),
          activeSlide = slides.filter('.active'),
          slideWidth = slides.width(),
          duration = 500,
          reqCssPosition = 0,
          reqSlideStrafe = 0;

      if (flag) {
        flag = false;

        if (direction === 'forward') {
          reqCssPosition = slideWidth;
          reqSlideStrafe = - slideWidth;
        } else if (direction === 'backward') {
          reqCssPosition = - slideWidth;
          reqSlideStrafe = slideWidth;
        }

          slide.css('left', reqCssPosition).addClass('inslide');

          var movableSlide = slides.filter('.inslide');

          activeSlide.animate({left: reqSlideStrafe}, duration);

          movableSlide.animate({left: 0}, duration, function(){
            var $this = $(this);

            slides.css('left', '0').removeClass('active');

            $this.toggleClass('inslide active');

            _this.setActiveDot(container.find('.sliderx__dots'));

            flag = true;
        });
      }


    },

    createDots: function(){
      var _this = this,
          container = $('.sliderx');
      var dotMarkup = '<li class="sliderx__dots-item"> \
                        <a href="#" class="sliderx__dots-link"></a> \
                      </li>';

      container.each(function(){
        var $this = $(this),
            slides = $this.find('.sliderx__item'),
            dotContainer = $this.find('.sliderx__dots');

        for (var i = 0; i < slides.size(); i++) {
          dotContainer.append(dotMarkup);
        }

        _this.setActiveDot(dotContainer);
      });
    },

    setActiveDot: function(container) {
      var slides = container.closest('.sliderx__list-wrap').find('.sliderx__item');

      container
        .find('.sliderx__dots-item')
        .eq(slides.filter('.active').index())
        .addClass('active')
        .siblings().removeClass('active');
    },

    autoSwitch: function(){
      var _this = this;

      timer = setInterval(function(){
        var slides = $('.sliderx__list .sliderx__item'),
            activeSlide = slides.filter('.active'),
            nextSlide = activeSlide.next(),
            firstSlide = slides.first();

        if (nextSlide.length) {
          _this.moveSlide(nextSlide, 'forward');
        } else {
          _this.moveSlide(firstSlide, 'forward');
        }
      }, timerDuration);
    },

    clearTimer: function(){
      if (timer) {
        clearInterval(timer);
        this.autoSwitch();
      }
    }

  };

})();

$(document).ready(function() {
  if ($('.slider').length) {
    mySliderx.init();
  }
});
