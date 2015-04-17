function test(){
	console.log(123);
}

function callBack(){
	console.log('data done',arguments);
}

function eachRowCallBack(d){
	console.log('eachRowCallBack.data done',arguments);
	return d;
}

function finalCall(){
	console.log('data done.finalCall',arguments);
}

$(document).ready(function(){
	var csvFile="data/image.csv";
	//d3.csv(csvFile,function(d){return d;},callBack);
	//if multi csv file need to read, use queue to make sure data will load as expect
	queue()
		.defer(d3.csv,csvFile,eachRowCallBack,callBack)
		.defer(d3.csv,csvFile,eachRowCallBack,callBack);

	//if multi csv file need to read, use queue to make sure data will load as expect
	queue()
		.defer(d3.csv,csvFile,eachRowCallBack)
		.defer(d3.csv,csvFile,eachRowCallBack)
		.await(finalCall);
});