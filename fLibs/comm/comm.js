/**
 * Created by Johnson on 2015/6/7.
 */
function scrollToTop(){
    var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
    $body.animate({
        scrollTop: 0
    }, 600);
}

function initialMenuScroll(){
    $("#navbar li").on('click',function(){
        if ($(this).hasClass('active')) {
            return false;
        }

        //scroll effect ¨÷¶b®ÄªG
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
