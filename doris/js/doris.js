function test(){
  console.log(123);
}

function initialPhoto(){
  $(window).load(function() {
    "use strict";
    var $container = $('#folio');
    $container.isotope({
      itemSelector: '.folio-item',
      transitionDuration: '0.6s'
    });
    var $optionSets = $('.folio-filter'),
        $optionLinks = $optionSets.find('a');
    $optionLinks.click(function() {
      var $this = $(this);
      if ($this.hasClass('selected')) {
        return false;
      }
      var $optionSet = $this.parents('.folio-filter');
      $optionSet.find('.selected').removeClass('selected');
      $this.addClass('selected');
      // make option object dynamically, i.e. { filter: '.my-filter-class' }
      var options = {},
          key = $optionSet.attr('data-option-key'),
          value = $this.attr('data-option-value');
      value = value === 'false' ? false : value;
      options[key] = value;
      if (key === 'layoutMode' && typeof changeLayoutMode === 'function') {
        changeLayoutMode($this, options);
      } else {
        $container.isotope(options);
      }
      return false;
    });
  });
}

$(document).ready(function(){
  $('.carousel').carousel({
    interval: 5000 //changes the speed
  });
  initialPhoto();
});