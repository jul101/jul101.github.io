function test(){
	console.log(123);
}

function callBack(){
	console.log('data done',arguments);
}

function eachRowCallBack(d){
	//console.log('eachRowCallBack.data done',arguments);
	return d;
}

function finalCall(){
	console.log('data done.finalCall',arguments);
}

function registerOnClick(){
	$(".header-navigation li").each(function(){
		$(this).click(function(){
			if(this.id=='home'){
				$(".header-navigation li[id!='home']").toggle(true);
			}else{
				$(this).toggle();
				$(".header-navigation li[id!='home']").toggle();
			}
			console.log('this',this);
		});
	});
}
var CSV_FILES={
	webDesigns:"./data/webDesigns.csv",
	skills:"./data/skills.csv",
	experience:"./data/experiences.csv"
}

function openData(url){
	window.open(url);
}

function initial(error, rows,experiences,skills){
	console.log('data done',arguments);
	var count=rows.length;
	var eachRowCellCount=2;
	var getOneDataHtml=function(data,eachRowCellCount){
		var mdSize=12/eachRowCellCount;
		var htmlStr="";
		htmlStr+="	<div class='col-sm-6 col-md-'+mdSize>";
		htmlStr+="		<div class='thumbnail' id='"+data.id+"'>";
		htmlStr+="			<img src='"+data.indexImage+"' alt='"+data.name+"'>";
		htmlStr+="			<div class='caption'>";
		htmlStr+="				<h3>"+data.name+"</h3>";
		htmlStr+="				<p>"+data.description+"";
		htmlStr+="				<a href='#' class='btn btn-primary' onclick='openData(\""+data.indexLoc+"\")' role='button'>More</a></p>";
		//htmlStr+="				<p><a href='#' class='btn btn-primary' onclick='openData(\""+data.indexLoc+"\")' role='button'>Info</a> <a href='#' class='btn btn-default' role='button'>Button</a></p>";
		htmlStr+="			</div>";
		htmlStr+="		</div>";
		htmlStr+="	</div>";
		return htmlStr;
	};

	var rowHtml="";
	rowHtml+="<div class='row'>";
	for(var i=0;i<count;i++){
		rowHtml+=getOneDataHtml(rows[i],eachRowCellCount);
	}
	rowHtml+="</div>";
	$("#dataListZone").append(rowHtml);

	var timeLine=new TimeLine("timeLine");
	timeLine.appendContent(experiences);

	var bucket=new Bucket("buckets");
	bucket.appendContent(skills);

	initialMenuScroll();
}

$(document).ready(function(){
	//var csvFile=["data/image.csv","webDesigns.csv"];
	//d3.csv(CSV_FILES.webDesigns,eachRowCallBack,initial);


	////d3.csv(csvFile,function(d){return d;},callBack);
	////if multi csv file need to read, use queue to make sure data will load as expect
	//queue()
	//	.defer(d3.csv,csvFile,eachRowCallBack,callBack)
	//	.defer(d3.csv,csvFile,eachRowCallBack,callBack);
    //
	////if multi csv file need to read, use queue to make sure data will load as expect
	queue()
		.defer(d3.csv,CSV_FILES.webDesigns,eachRowCallBack)
		.defer(d3.csv,CSV_FILES.experience,eachRowCallBack)
		.defer(d3.csv,CSV_FILES.skills,eachRowCallBack)
		.await(initial);
});





/**
 * Created by Johnson on 2015/6/7.
 */
function Bucket(jQuerySelector){
	console.log('width',$(window).width());
	var width=$(window).width();
	var bucketHeight=width<776?6:10;
	var me=this;
	var $bucket;//An jQuery Object
	//new function means will be execute in the beginning of instance been initialized
	this.constructor= new function(){
		//console.log('constructor',jQuerySelector);
		$bucket=$("#"+jQuerySelector).length!=0?$("#"+jQuerySelector):
			$("."+jQuerySelector).length!=0?$("."+jQuerySelector):jQuerySelector;
	};

	//function means would be execute when function was called by instance
	this.appendContent=function(dataList){
		for(var i=0;i<dataList.length;i++){
			var row=dataList[i];
			var rowHml="";
			var height=parseInt(row.percentage)*bucketHeight/100;
			var marginTop=bucketHeight-height;
			rowHml+='<div class="skill col-sm-4 col-xs-6">';
			rowHml+='   <div class="name">'+row.name+'</div>';
			rowHml+='	<div class="bucket">';
			rowHml+='   	<div class="percentage">'+row.percentage+'%</div>';
			rowHml+='   	<div class="water" style="height:'+height+'em;margin-top:'+marginTop+'em;"></div>';
			rowHml+='	</div>';
			rowHml+='</div>';
			$bucket.append(rowHml);
		}
	};

	return me;
};