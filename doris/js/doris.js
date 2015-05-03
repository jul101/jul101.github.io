var DORIS_CSV_FILES={
  brides:"./data/brides.csv"
};

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


function loadBrides(error, rows){
  console.log('data done',rows);
  var count=rows.length;
  var eachRowCellCount=2;
  var getOneDataHtml=function(data,eachRowCellCount){
    var htmlStr="";
    //htmlStr+="<div class='folio-item' style='transform: translate3d(0px, 0px, 0px);'>";
    //htmlStr+="<div class='folio-item isotope-item web packaging' style='position: absolute; left: 0px; top: 0px; transform: translate3d(0px, 0px, 0px);'>";
    //htmlStr+="<div class='folio-item isotope-item web packaging' style='position: absolute; left: 0px; top: 0px; transform: translate3d("+(eachRowCellCount*300)+"px, 0px, 0px);'>";
    //htmlStr+="<div class='col-md-3'>";
    htmlStr+="<div class='col-md-2 col-sm-6 no-padding folio-item'>";
    htmlStr+="	<a href='./"+data.thumbImage+"' class='prettyPhoto'>";
    htmlStr+="		<div class='folio-thumb'>";
    htmlStr+="			<img src='./"+data.image+"' class='img-responsive' alt=''>";
    htmlStr+="		</div>";
    htmlStr+="	</a>";
    htmlStr+="	<div class='folio-overlay'>";
    htmlStr+="		<h4><a href='#'>"+data.title+"</a></h4>";
    htmlStr+="	</div>";
    htmlStr+="	<i class='icon-uni17D'></i>";
    htmlStr+="</div>";
    return htmlStr;
  };

  var rowHtml="";
  for(var i=0;i<count;i++){
    rowHtml+=getOneDataHtml(rows[i],i);
  }
  $("#da-thumbs").append(rowHtml);

}

function handleHeaderPosition() {
  var CurrentHeaderPosition = $(".header").offset().top;// current header's vertical position

  console.log(CurrentHeaderPosition);

  var headerFix = function(){
    console.log('headerFix',CurrentHeaderPosition);
    var CurrentWindowPosition = $(window).scrollTop();// current vertical position
    if (CurrentWindowPosition > CurrentHeaderPosition) {
      $(".header").addClass("fixNav");
    } else {
      $(".header").removeClass("fixNav");
    }
  };

  headerFix();// call headerFix() when the page was loaded
  if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
    $(window).bind("touchend touchcancel touchleave", function(e){
      headerFix();
    });
  } else {
    $(window).scroll(function() {
      headerFix();
    });
  }
}

$(document).ready(function(){
  $('.carousel').carousel({
    interval: 5000 //changes the speed
  });
  d3.csv(DORIS_CSV_FILES.brides,function(d){return d;},loadBrides);
  handleHeaderPosition();
  //initialPhoto();
});