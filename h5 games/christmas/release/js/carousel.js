/**
 * 3d旋转木马
 * @param  {[type]} argument [description]
 * @return {[type]}          [description]
 */
function Carousel(carousel, options) {
	//图片
	var imgUrls   = options.imgUrls;
	//场景元素
	var $carousel = carousel;
	//容器元素
	var $spinner  =  carousel.find("#spinner");
	var angle     = 0;
	//图片数
	var numpics   = imgUrls.length;
	//角度
	var rotate    = 360 / numpics;
	var start     = 0;
	var current   = 1;
	//子元素
	var $contentElements;

	//图片数量
	this.numpics = numpics;

	/**
	 * 创建结构
	 * @param  {[type]} imgUrl [description]
	 * @return {[type]}        [description]
	 */
	function createStr(imgUrl){
		var str = '<figure style="width:{0};transform:rotateY({1}deg) translateZ({2});position:absolute;">'
						 +'<img src="{3}" style="width:100%;height:100%;">' 
			   	 +'</figure>';

		return String.format(str,
			"2rem",
			start,
			"1.2rem",
			imgUrl
		)
	}

	/**
	 * 初始化样式
	 * @return {[type]} [description]
	 */
	function initStyle(){
		//场景元素
		$carousel.css({
			"transform":"scale(0.3)",
			"-webkit-perspective" : "500px",
			"position"            : "absolute",
			"left"                : "6.8rem",
			"top"                 : "4.5rem"
		})
		//容器
		$spinner.css({
			"width"           : "2rem",
			"transform-style" : "preserve-3d",
			"transition"      : "1s"
		})
	}

 	/**
 	 * 绘制页面节点
 	 * @return {[type]} [description]
 	 */
	function render() {
		//创建内容
		var contentStr = '';
		$.each(imgUrls, function(index, url) {
			contentStr += createStr(url);
			start = start + rotate;
		})
		$contentElements = $(contentStr);
		$spinner.append($contentElements)
	}

	//样式
	initStyle();
	//绘制节点
	render();


	//旋转次数,游标,当前页码
	var currIndex;

	/**
	 * 运行旋转
	 * @param  {[type]}   count    [description]
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 */
	this.run = function(count,callback) {
		currIndex = count;
		//360
		//480
		//600
		angle = (count - 1) * rotate + 360
		$spinner
			.css("transform", "rotateY(-" + angle + "deg)")
			.one(support.transitionEnd, function() {
				callback&& callback();
			})
	}

	/**
	 * 选中图片
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 */
	this.selected = function(callback) {
		var $img = $contentElements.find("img");
		var count = $img.length;
		$img.transition({
			"scale": 1.5
		}, 2000, 'linear', function() {
			if(count===1){
				//回调只执行一次
				callback();
				return
			}
			count--;
		});
	}

	/**
	 * 销毁
	 * @return {[type]} [description]
	 */
	this.destroy = function(){
		$spinner.remove();
	}	

	/**
	 * 还原3d转化
	 * @return {[type]} [description]
	 */
	this.reset = function(){
		var $img = $contentElements.find("img");
		$img.css("scale",1)
		$spinner.css("transform", "rotateY(0deg)")
	}

	/**
	 * 视频播放
	 * @param  {[type]} index   [description]
	 * @param  {[type]} element [description]
	 * @return {[type]}         [description]
	 */
	this.palyVideo = function(cb) {
		//索引从0开始
		var index = currIndex - 1

		var element = element || $contentElements.eq(index)
		var layer   = config.layer;

		/**
		 * vide标签
		 * @type {[type]}
		 */
		var $video = $('<video preload="auto" autoplay class="bounceIn" style="width:50%;height:50%;position:absolute;left:25%;top:35%;"></video>');

		$video.css({
			"position" :"absolute",
			"z-index"  :"999"
		})

		//地址
		$video.attr('src', options.videoUrls[index]);

		//播放
		$video.on("loadeddata", function() {
			$video[0].play()
			setTimeout(function(){
				cb.load();
			},1000)
		})

		//停止
		$video.on("ended", function() {
			$video[0].pause()
			//退出效果
			$video.addClass("bounceOut").one(support.animationEnd, function() {
				$video.remove();
				cb.complete();
			})
		})

        $carousel.after($video)
	}

}




