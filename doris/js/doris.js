var DORIS_CSV_FILES={
  brides:"./data/brides.csv"
};
var $owl;
$(document).ready(function(){
  //$("body").on('load',initialAll);
  var owlId="#owl-example";
  $owl=$(owlId);
  $owl.owlCarousel({
    // Most important owl features
    singleItem : true
    , afterAction : function(){
      var $leftA=$("a.left");
      var $rightA=$("a.right");
      var hasPre=true;
      var hasNex=true;
      var currentIndex=this.currentItem;
      var itemSize=this.$owlItems.length;
      if(currentIndex==0){
        hasPre=false;
      }
      if((currentIndex+1)>=itemSize){
        hasNex=false;
      }
      !hasPre?$leftA.hide():$leftA.show();
      !hasNex?$rightA.hide():$rightA.show();
    }
    // ,navigation : true
  });
  initialOwlControl(owlId);
});

$(window).on("orientationchange",function(){
  initialAll();
  fixOwl();
});

$(window).load(function() {
  initialAll();
  fixOwl();
});

function initialOwlControl(owlId){
  var owl = $(owlId).data('owlCarousel');
  $("a.left").click(function(){
    owl.prev();
  });
  $("a.right").click(function(){
    owl.next();
  });
}

function fixOwl(){
  var owlId="#owl-example";
  var $owl=$(owlId);

  //fix itemHeight
  $owl.find(".item").each(function(){
    $(this).find(".sliderItem").css({
      width:"auto"
      ,height:$(window).height()+"px"
    });
  });

  //fix pageTool marginTop
  var height=$owl.find(".owl-controls").height();
  $owl.find(".owl-controls").css("margin-top","-"+(height+10)+"px");
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

  //if multi csv file need to read, use queue to make sure data will load as expect
  queue()
      .defer(d3.csv,DORIS_CSV_FILES.brides,function(d){return d;},loadBrides);
}

/**
 * 初始化選單
 * **/
function initialMenu(){
  $("#navbar li").on('click',function(){
    if ($(this).hasClass('active')) {
      return false;
    }

    //scroll effect 卷軸效果
    var targetId=$(this).find("a").attr("href");
    var scrollToPos=0;//default top
    if(targetId!="#title-nav"){
      scrollToPos=$(targetId).offset().top;
    }
    //console.log('targetId',targetId+" "+scrollToPos);
    var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
    $body.animate({
      scrollTop: scrollToPos
    }, 600);

    $("li.active").toggleClass("active");
    $(this).toggleClass("active");
  });
}

/**
 * 控制選單背景色
 * **/
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

  /**
   * Images were dynamically loaded  from csv file
   * sometimes will delay to reveal and cause istope effect fail
   * (height and width problem)
   * Try to workaround with code below
   * **/
  var istopeFix = function(){
    //All is the first child of filter
    if (!$("#bride-filter > li:nth-child(1) > a").hasClass('selected')) {
      return false;
    }
    $("#da-thumbs").isotope({ filter: '*' });
  };

  headerFix();// call headerFix() when the page was loaded
  if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
    $(window).bind("touchend touchcancel touchleave", function(e){
      headerFix();
      istopeFix();
    });
  } else {
    $(window).scroll(function() {
      headerFix();
      istopeFix();
    });
  }
}

/**
 * 將資料的照片取出
 * **/
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
    htmlStr+="		</div>";
    htmlStr+="	</a>";
    htmlStr+="	<div class='folio-overlay'>";
    htmlStr+="		<h4><a href='#'>"+data.title+"</a></h4>";
    htmlStr+="	</div>";
    //htmlStr+="	<i class='icon-uni17D'></i>";
    htmlStr+="</div>";
    return htmlStr;
  };

  var appendPhoto=function(){
    var rowHtml="";
    for(var i=0;i<count;i++){
      rowHtml+=getOneDataHtml(rows[i],i);
      typeMap[rows[i].type]=true;
    }
    $(targetId).append(rowHtml);
  };

  appendPhoto();

  //Images were dynamically loaded  from csv file
  //sometimes will delay to reveal and cause istope effect fail
  // (height and width problem)
  //Try to workaround with code below
  //console.log('START...',$(targetId).height());
  //var count=0;
  //var check = function(){
  //  console.log('START...',$(targetId).height()+"..."+count);
  //  if($(targetId).height()==0&&count<3){
  //    //Clear and do again
  //    //$(targetId).empty();
  //    //appendPhoto();
  //    //$("#da-thumbs").height(910);
  //    // run when condition is met
  //    setTimeout(check, 1000); // check again in a second
  //    count++;
  //  }else{
  //
  //  }
  //}
  //check();
  //console.log('count...',count);

  var $container = $(targetId);
  initialBrideIstope($container);
  initialBrideType($container,typeMap);
  // Prettyphoto
  $("a[class^='prettyPhoto']").prettyPhoto({
    theme: 'pp_default'
  });

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
