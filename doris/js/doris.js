var DORIS_CSV_FILES={
  brides:"./data/brides.csv"
};

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
  console.log('loadBrides',rows);
  var targetId="#da-thumbs";
  var count=rows.length;
  var typeMap=new Object();
  var eachRowCellCount=2;
  var getOneDataHtml=function(data,eachRowCellCount){
    var htmlStr="";
    htmlStr+="<div class='col-md-3 col-sm-6 no-padding folio-item "+data.type+"'>";
    htmlStr+="	<a href='./"+data.thumbImage+"' class='prettyPhoto' rel='prettyPhoto[gallery]'>";
    htmlStr+="		<div class='folio-thumb '>";
    htmlStr+="			<img src='./"+data.image+"' class='img-responsive' alt=''>";
    //htmlStr+="			<img src='./"+data.image+"'>";
    htmlStr+="		</div>";
    htmlStr+="	</a>";
    htmlStr+="	<div class='folio-overlay'>";
    htmlStr+="		<h4><a href='#'>"+data.title+"</a></h4>";
    htmlStr+="	</div>";
    //htmlStr+="	<i class='icon-uni17D'></i>";
    htmlStr+="</div>";
    return htmlStr;
  };

  var rowHtml="";
  for(var i=0;i<count;i++){
    rowHtml+=getOneDataHtml(rows[i],i);
    typeMap[rows[i].type]=true;
  }
  $(targetId).append(rowHtml);
  //console.log('START...',$(targetId).height());
  var $container = $(targetId);

  initialBrideIstope($container);
  initialBrideType($container,typeMap);
  // Prettyphoto
  $("a[class^='prettyPhoto']").prettyPhoto({
    theme: 'pp_default'
  });

}

function handleHeaderPosition() {
  var CurrentHeaderPosition = $(".header").offset().top;// current header's vertical position

  //console.log(CurrentHeaderPosition);

  var headerFix = function(){
    //console.log('headerFix',CurrentHeaderPosition);
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

/**
 * 新娘分類 use Istope
 * **/
function initialBrideIstope($container){
  //console.log('initialView');
  //console.log('$container...',$container);
  $container.isotope({
    // options
    itemSelector: '.folio-item',
    //layoutMode: 'masonry'
    layoutMode: 'fitRows'
  });

}

/**
 * 新娘分類 List And Click Event
 * **/
function initialBrideType($container,typeMap){
  for(var key in typeMap){
    var htmlStr="<li><a href='#bride-filter' data-option-value='."+key+"'>"+key+"</a></li>";
    $(".folio-filter").append(htmlStr);
  }

  $(".folio-filter li a").on('click',function(){
    if ($(this).hasClass('selected')) {
      return false;
    }
    var filter=$(this).data('option-value');
    $container.isotope({ filter: filter });
    $(".selected").toggleClass("selected");
    $(this).toggleClass("selected");
  });
}

function addZicDiv(cls,dir){
  var eleCount=12;
  for(var i=0;i<eleCount+8;i++) {
    $("." + cls).append("<div class='zic zic-top'></div>");
  }

  var width=($(window).width()/eleCount/2/2)+"px";
  //console.log($(window).width());
  //console.log(width);

  $(".zic-top").css("border-left",width+" solid white");
  $(".zic-top").css("border-bottom",width+" solid #C28D8D");
  $(".zic-top").css("border-right",width+" solid white");
  $("." + cls).css("padding-left",width);
}

function handleHeaderColor(){
  var CurrentHeaderPosition = $(".navbar").offset().top;// current header's vertical position

  var headerFix = function(){
    //console.log('headerFix',CurrentHeaderPosition);
    var CurrentWindowPosition = $(window).scrollTop();// current vertical position
    if (CurrentWindowPosition > CurrentHeaderPosition) {
      $(".navbar").addClass("fixBGColor");
    } else {
      $(".navbar").removeClass("fixBGColor");
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

function initialMenu(){
  $("#navbar li").on('click',function(){
    if ($(this).hasClass('active')) {
      return false;
    }
    $(".active").toggleClass("active");
    $(this).toggleClass("active");
  });
}

/**
 * Registered in body / window onload event to avoid the images loading delay cause istope not functional
 * **/
function initialAll(){
  initialMenu();
  $('.carousel').carousel({
    interval: 5000 //changes the speed
  });
  handleHeaderColor();
  //d3.csv(DORIS_CSV_FILES.brides,function(d){return d;},loadBrides);
  //handleHeaderPosition();
  //addZicDiv("sep-bottom","FORWARD");
  //if multi csv file need to read, use queue to make sure data will load as expect
  queue()
      .defer(d3.csv,DORIS_CSV_FILES.brides,function(d){return d;},loadBrides);
}

$(document).ready(function(){
  //$("body").on('load',initialAll);
});

$(window).load(function() {
  initialAll();
});