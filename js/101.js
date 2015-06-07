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
	experience:"./data/experiences.csv"
}

function openData(url){
	window.open(url);
}

function initial(error, rows,experiences){
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
		.await(initial);
});