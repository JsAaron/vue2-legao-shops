/**
 * 预加载图片
 * @param  {[type]}   loadimages [description]
 * @param  {Function} callback   [description]
 * @return {[type]}              [description]
 */
function preload(images, callback) {
    var newimages = [];
    var count = images.length;
    var complete = function(name,src) {
        --count;
        if(!count){
            callback();
        }
    };

    for (var i = 0; i < images.length; i++) {
        newimages[i]     = new Image()
        newimages[i].src = images[i];

        newimages[i].onload = (function(src) {
            return function() {
                complete('onload', src)
            }
        })(images[i]);

        newimages[i].onerror = (function(src) {
            return function() {
                complete('onerror', src)
            }
        })(images[i]);

        newimages[i].onabort = (function(src) {
            return function() {
                complete('onabort', src)
            }
        })(images[i]);
    }

}

/**
 * 游戏开始
 * @return {[type]} [description]
 */
function slotGames() {

    var $hmoepage         = $(".slot-homepage");
    var $helpContent      = $(".help-content");
    var $introduceContent = $(".introduce-content");
    var $music            = $(".slot-music");
    var $enter            = $hmoepage.find(".enter");
    var $help             = $hmoepage.find(".help");
    var $introduce        = $hmoepage.find(".introduce");
    var $introduceBack    = $hmoepage.find(".introduce-back");
    var $helpBack         = $hmoepage.find(".help-back");


    /**
     * 全局音乐
     * @type {Boolean}
     */
    var state;
    var audio = null;

    var createAudio = function() {
        if (audio) return;
        $music.addClass("slot-music-rotate");
        audio =  slotGames.audio = utils.audio('music/scene.mp3',true);
        state = "play";
        audio.play();
    }

    //微信音频处理
    document.addEventListener("WeixinJSBridgeReady", function() {
        WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
            createAudio();
        });
    }, false);

    if (utils.hasTouch) {
        // createAudio();
    }

    $music.on(utils.END_EV, function() {
        if (state === "play") {
            $music.addClass("pauseWalk");
            audio && audio.pause();
            state = "pause";
        } else {
            $music.removeClass("pauseWalk");
            audio && audio.play();
            state = "play";
        }
    });


    /**
     * 商家介绍
     * @return {[type]}   [description]
     */
    $introduce.on(utils.END_EV, function() {
        $introduceContent.show();
    });
    $introduceBack.on(utils.END_EV, function() {
        $introduceContent.hide();
    });


    /**
     * 活动介绍
     * @return {[type]}   [description]
     */
    $help.on(utils.END_EV, function() {
        $helpContent.show();
    });
    $helpBack.on(utils.END_EV, function() {
        $helpContent.hide();
    });


    /**
     * 进入游戏                         
     * @return {[type]}   [description]
     */
    $enter.on(utils.END_EV, function(e) {

        //游戏页面
        var gameObj = new GamePage(".slot-gamepage");
        //退出游戏
        gameObj.watch("exit", function() {
            $hmoepage.show();
            gameObj.destroy();
        })

        setTimeout(function() {
            //隐藏主页
            $hmoepage.hide();
        },500)

        return false;
    });


    // $enter.trigger(utils.END_EV)

    $hmoepage.show();
}



/**
 * 老虎机主题
 * @return {[type]}   [description]
 */
$(function() {
    if (slotGames.conf.preloadimages.length) {
        preload(slotGames.conf.preloadimages, slotGames)
    } else {
        slotGames();
    }
})
