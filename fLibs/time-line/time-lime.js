/**
 * Created by Johnson on 2015/6/7.
 */
function TimeLine(jQuerySelector){
    var me=this;
    var $timeLineZone;//An jQuery Object
    var isRegisterEvent=false;
    //new function means will be execute in the beginning of instance been initialized
    this.constructor= new function(){
        //console.log('constructor',jQuerySelector);
        $timeLineZone=$("#"+jQuerySelector).length!=0?$("#"+jQuerySelector):
                      $("."+jQuerySelector).length!=0?$("."+jQuerySelector):jQuerySelector;
    };

    //function means would be execute when function was called by instance
    this.appendContent=function(dataList){
        //console.log('$timeLineZone',$timeLineZone);
        //console.log('appendContent',dataList);
        for(var i=0;i<dataList.length;i++){
            var isBreak=(i==(dataList.length-1));
            var isOdd=(i%2!=0);
            var row=dataList[i];
            var rowHml="";
            var lZoneCls="l-zone hidden-xs col-sm-4"+(isOdd?"":" empty");
            var cZoneCls="c-zone col-xs-4 col-sm-4";
            var cZoneChildCls="time";//time | time-end
            var rZoneCls="r-zone col-xs-8 col-sm-4"+(isOdd?" empty":"");
            // console.log(i,isOdd);
            rowHml+='<div class="row timeContent">';
            rowHml+=' <div class="'+lZoneCls+'">';
            rowHml+='   <div class="timeDirect"></div>';
            rowHml+='   <div class="panel panel-default">';
            rowHml+='     <div class="panel-heading title">'+row.title+'</div>';
            rowHml+='     <div class="panel-body content">'+row.content+'</div>';
            rowHml+='   </div>';
            rowHml+=' </div>';
            rowHml+=' <div class="'+cZoneCls+'">';
            rowHml+='   <div class="'+cZoneChildCls+'">'+row.time+'</div>';
            rowHml+='   <div class="timeCircle"></div>';
            rowHml+='   <div class="timeVLine'+(isBreak?'End':'')+'"></div>';
            rowHml+=' </div>';
            rowHml+=' <div class="'+rZoneCls+'">';
            rowHml+='   <div class="timeDirect"></div>';
            rowHml+='   <div class="panel panel-default">';
            rowHml+='     <div class="panel-heading title">'+row.title+'</div>';
            rowHml+='     <div class="panel-body content">'+row.content+'</div>';
            rowHml+='   </div>';
            rowHml+=' </div>';
            rowHml+='</div>';
            $timeLineZone.append(rowHml);
        }

        //Register window resize event
        if(!isRegisterEvent){
            me.adjustTimeLine();
            $(window).resize(function(){
                me.adjustTimeLine();
            });
            isRegisterEvent=true;
        }
    };

    /**
     * calculate the height of each time period and reset time line height
     * **/
    this.adjustTimeLine=function(){
        var $row=$timeLineZone.find(".row");
        //console.log('timeLineZone',$timeLineZone);
        $row.each(function(){
            var height=$(this).find(".r-zone .panel").height();
            var $child=$(this).find(".timeVLine");
            $child.height(height);
        });
    };

    return this;
};