$(document).ready(function() {
  $('.tabs__controls-link').on('click', function(e){
    e.preventDefault();

    //табы по порядковому номеру элементов в наборе
    // var item = $(this).closest('.tabs__controls-item'),
    //     itemNumber = item.index(),
    //     contentItem = $('.tabs__item');

    // contentItem.eq(itemNumber)
    //   .add(item)
    //   .addClass('active')
    //   .siblings()
    //   .removeClass('active');

    //табы по дата аттрибутам и доп. классам в контенте
    var item = $(this).closest('.tabs__controls-item'),
        itemNumber = item.data('tab'),
        contentItem = $('.tabs__item');

    contentItem.filter('.tabs__item_' + itemNumber)
      .add(item)
      .addClass('active')
      .siblings()
      .removeClass('active');

  });
});
