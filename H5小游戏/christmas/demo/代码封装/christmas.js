/**
 * 慕课网特制
 * 圣诞主题效果
 * @type {Object}
 */

/**
 * 切换页面
 * 模拟镜头效果
 * @return {[type]} [description]
 */
function changePage(element,effect,callback){
    element
        .addClass(effect)
        .one("animationend webkitAnimationEnd", function() {
            callback && callback();
        })
}


/**
 * 中间调用
 */
var Christmas = function() {
    //页面容器元素
    var $pageA = $(".page-a");
    var $pageB = $(".page-b");
    var $pageC = $(".page-c");

    //切换切换
    $("#choose").on("change", function(e) {
        //页面名称
        var pageName = e.target.value;  
        switch (pageName) {
            case "page-b":
                changePage($pageA, "effect-out", function() {
                    new pageB()
                })
                break;
            case "page-c":
                changePage($pageC, "effect-in", function() {
                    new pageC()
                })
                break;
        }
    })

};






$(function() {
    //圣诞主题效果，开始
    Christmas()
})