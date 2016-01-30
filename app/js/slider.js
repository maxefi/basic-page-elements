$(document).ready(function() {

  $('.slider__controls-button').on('click', function(e) {
    e.preventDefault();

    var $this = $(this),
        container = $this.closest('.slider'),
        list = container.find('.slider__list'),
        items = container.find('.slider__item'),
        activeSlide = items.filter('.active'),
        nextSlide = activeSlide.next(),
        prevSlide = activeSlide.prev(),
        firstSlide = items.first(),
        lastSlide = items.last(),
        sliderOffset = container.offset().left,
        reqPos = 0;

    function removeActiveClass (reqSlide) {
      reqSlide.addClass('active').siblings().removeClass('active');
    }

    function findReqPosition (reqSlide) {
      reqPos = reqSlide.offset().left - sliderOffset;
    }

    if ($(this).hasClass('slider__controls-button_next')) {
      if (nextSlide.length) {
        findReqPosition(nextSlide);
        removeActiveClass(nextSlide);
      } else {
        findReqPosition(firstSlide);
        removeActiveClass(firstSlide);
      }
    } else { //($(this).hasClass('slider__controls-button_prev'))
      if (prevSlide.length) {
        findReqPosition(prevSlide);
        removeActiveClass(prevSlide);
      } else {
        findReqPosition(lastSlide);
        removeActiveClass(lastSlide);
      }
    }

    list.css('left', '-=' + reqPos + 'px');
  })

});
