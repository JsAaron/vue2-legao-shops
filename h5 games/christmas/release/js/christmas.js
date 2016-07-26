/**
 * http://www.jq22.com/yanshi242
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
        .one(support.animationEnd, function() {
            callback && callback();
        })
}


/**
 * 背景音乐
 * @param {[type]} url  [description]
 * @param {[type]} loop [description]
 */
function Hmlt5Audio(url, loop) {
    var audio = new Audio(url);
    audio.autoplay = true;
    audio.loop = loop || false; //是否循环
    audio.play();
    return {
        end: function(callback) {
            audio.addEventListener('ended', function() {
                callback()
            }, false);
        }
    }
}


var Christmas = function() {

    //观察者
    var observer = new Observer();

    //页面容器
    var container = $(".container");
    //设置新的页面容器大小
    container.css(config.layer);
    //页面可视区域
	var visualWidth  = container.width()
	var visualHeight = container.height()

    //页面容器元素
    var $pageA = $(".page-a");
    var $pageB = $(".page-b");
    var $pageC = $(".page-c");


    //背景音乐
    var audio1 = Hmlt5Audio('http://www.imooc.com/upload/media/one.mp3')
    audio1.end(function() {
        Hmlt5Audio('http://www.imooc.com/upload/media/two.mp3',true)
    })


	//A场景页面
    var objA = new PageA($pageA)
    objA.run(function() {
         observer.publish("completeA");
    });

    //进入B场景
    observer.subscribe("pageB", function() {
        new PageB($pageB, function() {
            observer.publish("completeB");
        })
    })

    //进入C场景
    observer.subscribe("pageC", function() {
        new PageC()
    })

    //页面A-B场景切换
    observer.subscribe("completeA", function() {
        changePage($pageA, "effect-out", function() {
            observer.publish("pageB");
        })
    })

    //页面B-C场景切换
    observer.subscribe("completeB", function() {
        changePage($pageC, "effect-in", function() {
            observer.publish("pageC");
        })
    })
};


$(function() {
    //圣诞主题效果，开始
    Christmas()
})
