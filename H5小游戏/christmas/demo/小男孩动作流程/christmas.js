/**
 * 慕课网特制
 * 圣诞主题效果
 * @type {Object}
 */

/**
 * 中间调用
 */
var Christmas = function() {
    //页面容器元素
    var $pageA = $(".page-a");
    var $pageB = $(".page-b");
    var $pageC = $(".page-c");
    //构建第二个场景页面对象
    new pageB($pageB);
};


$(function() {
	$("button").on("click", function() {
		//圣诞主题效果，开始
		Christmas()
	})
})