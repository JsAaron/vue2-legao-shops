var show = function(){
	var m = process.memoryUsage();
	var format = function(bytes){
		return (bytes/1024/1024).toFixed(2)+ ' MB'
	}
	console.log('process:heapTotal:'+ format(m.heapTotal) + ', heapUsed:' + format(m.heapUsed) + ', rss:' + format(m.rss))
	console.log('...............')
}

