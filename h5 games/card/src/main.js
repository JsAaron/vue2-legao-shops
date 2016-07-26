'use strict';

//算法
var algorithm = CardGameConfig.algorithm;
var confCount = Object.keys(algorithm.conf);
var innerCall = CardGameConfig.innerCall;
var gameRule  = algorithm.rule;//游戏规则

var CardGames = require('./cardGames');
var utils     = require('./utils');

//游戏时间
var limitTime      = CardGameConfig.limitTime || 30000; //ms单位 
//每次游戏关数
var limitCount     = CardGameConfig.limitCount || 3;
//允许玩的游戏次数
var AllowPlayCount = CardGameConfig.AllowPlayCount || 3;


//开始时间
var _startTime = 0
//玩的次数
var _playCount = 0;
//游戏次数
var _gameTotal = 0;
//内容节点class名
var _className = '.content-page-card';

var $homePage          = $('.home-page');
var $contentPage       = $('.content-page');
var $lotteryPage       = $('.lottery-page');
var $winningPage       = $('.winning-page');
var $element           = $('.banner-right .score');
var $lotteryPlay       = $('.winning-box-left');
var $startButton       = $('.start-button');
var $tooltipBox        = $(".tooltip-box");
var $shareFriends      = $(".winning-box-right");
var $contentBackground = $(".content-background");
var $tooltipContent    = $(".tooltip-content");
var $backgroundImageStr ;//背景元素合集
var $lotteryLottery; //抽象的动态节点
/**
 * 
 * 音乐
 * @return {[type]} [description]
 */
var Music = function() {
    var instance = null; //存放不同音轨的一个实例
    return {
        paly: function(url) {
            if(!algorithm.music){
                return;
            }
            var audio;
            if (instance) {
                audio = instance;
                audio.src = url;
            } else {
                audio = new Audio(url);
            }
            audio.autoplay = true;
            audio.play();
            //更新音轨
            instance = audio;
        }
    } 
}();


/**
 * 分数更新
 * @type {Number}
 */
var addScore = CardGameConfig.score.add || 10;
var subtractScore =  CardGameConfig.score.subtract || 3;
var integral = function() {
    var $element = $('.banner-right .score');
    var score = 0;
    //更新分数
    var update = function() {
        $element.text(score);
    }
    return {
        add: function() {
            score += addScore;
            update();
            Music.paly('music/score.mp3');
        },
        reduce: function() {
            score -= subtractScore;
            if (score < 1) {
                score = 0;
            }
            update();
        },
        reset: function() {
            score = 0;
            update();
        },
        get: function() {
            return score;
        }
    }
}();

/**
 * 倒计时处理
 * @return {[type]} [description]
 */
var slidebox = new function() {
    var timer;
    var $dotWrap      = $('.dot-wrap');
    var $ems          = $dotWrap.find('em')
    var vernier       = $ems.length;
    var rate          = limitTime / vernier;
    var self          = this;
    var timercallabck = null;

    function clear() {
        clearTimeout(timer)
        timer = null;
    }

    function updatedot() {
        var em;
        if (em = $ems[--vernier]) {
            em.style.backgroundImage = 'url(images/time-button2.png)'
        }
        if (!em) {
            clear()
            overTime(timercallabck);
            return;
        }
    }

    function run() {
        timer = setTimeout(function() {
            updatedot();
            timer && run();
        }, rate)
    }

    self.start = function() {
        run();
    }

    self.destroy = function() {
        clear();
        vernier = $ems.length;
        $ems.css('backgroundImage','url(images/time-button1.png)')
    }

    self.watch = function(timeout, callback) {
        timercallabck = callback;
    }

}

/**
 * 超时处理
 * @return {[type]} [description]
 */
function overTime(callback) {
    var l = layer.open({
        // style: 'border:none; background-color:#78BA32; color:#fff;',
        _className: 'popuo-login',
        btn: ['OK'],
        content: '游戏超时，请重新开始游戏！',
        yes: function(elem) {
            callback();
            resetGames();
            layer.close(l)
            l = null;
        }
    })
}


/**
 * 默认规则
 * @type {Object}
 */
var defalutConf = {
    gap: {
        left: 10,
        top: 30
    },
    //随机算法
    //0 不随机
    //1 上下随机
    //2 一顿乱搞
    //默认2
    random: 0
}

//混合规则配置
function mixRule(target,src){
    for(var i in src){
        if (!target[i] && target[i] != 0) {
            target[i] = src[i]
        }
    }
}

/**
 * 设置游戏规则
 * 规则优先级
 *     用户单独设置>总规则>默认规则
 */
function setRule(){
    var config;
    //多个配置文件
    if (confCount != 1) {
        config = algorithm.conf[_gameTotal];
        //主规则
        mixRule(config,gameRule)
        //默认规则
        mixRule(config,defalutConf)
    }
    //如果没有配置文件,默认取第一个
    if (!config) {
        config = algorithm.conf[1];
    }
    return config;
}


/**
 * 开始游戏
 * @return {[type]} [description]
 */
function createGames() {

    slidebox.start();
    ++_gameTotal;

    var config = setRule();

    var cardGames = new CardGames(_className, config);
    cardGames.$watch('success', integral.add)
    cardGames.$watch('fail', integral.reduce)
    cardGames.$watch('complete', function() {
        slidebox.destroy();
        cardGames.destroy();
        selectGame()
    });
    //超时回调
    slidebox.watch('timeout', function() {
        slidebox.destroy();
        cardGames.destroy();
    })
}


/**
 * 选择游戏
 * @return {[type]} [description]
 */
function selectGame() {
    //游戏结束
    if (_gameTotal >= limitCount) {
        // GameOver();
        selectTooltipBox('over')
        return;
    }
    //过关提示
    selectTooltipBox() 
}


function visible($element) {
    $element.css('visibility', 'visible');
}

function hidden($element) {
    $element.css('visibility', 'hidden');
}

/**
 * 游戏结束
 * 尾页
 * @return {[type]} [description]
 */
function GameOver() {
    Music.paly('music/through.mp3');
    ++_playCount;
    //处理页面逻辑
    visible($lotteryPage);
    hidden($contentPage);
    hidden($winningPage);
}


/**
 * 重设游戏
 * @return {[type]} [description]
 */
function resetGames() {
    _gameTotal = 0;
    integral.reset();
    hidden($contentPage);
    visible($homePage)
}


/**
 * 开始页面
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
function startContent(e) {
    //生成游戏
    createGames('.content-page-card');
    visible($contentPage)
    $homePage.addClass('animated zoomOutUp')
        .on(utils.style.animationend, function() {
            $homePage.off(utils.style.animationend);
            hidden($homePage)
            $homePage.removeClass('animated zoomOutUp')
            return false;
        })
}


/**
 * 开始按钮
 * @return {[type]}    [description]
 */
$startButton.on(utils.event.start, function(e) {
    innerCall.startGame(_playCount, function() {
        startContent(e);
    })
    return false;
})
 

/**
 * 验证号码
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
function checkNumber(str) {
    if(!str){
        return true;
    }
    var re = /^1\d{10}$/;
    if (re.test(str)) {
        return true
    } else {
        return false
    }
}

function checkMobile() {
    $tooltipContent.hide();
    $lotteryLottery.remove()//清除创建的节点
    var number = $("#myMobile").val();
    if (!number) {
        return true;
    }
    if(!innerCall.checkPhoneNumber){
        return number
    }
    //验证手机号
    if (!checkNumber(number)) {
        alert('密码格式有误，请核对!')
        return false;
    }
    return number;
}
 
$shareFriends.on(utils.event.start, function() {
    //验证手机号
    var number = checkMobile();
    if (!number) {
        return;
    }
    innerCall.shareFriends(number);
    return false;
});


/**
 * 隐藏弹出框
 */
function HiddenTooltipBox() {
    $tooltipBox.css('opacity', 0);
    deleteTooltipBox();
}

/**
 * 过关提示事件
 * @return {[type]} [description]
 */
function BindTooltipBox() {
    $tooltipBox.on(utils.event.start, function(event) {
        switch (event.target.className) {
            case "tooltip-box-left":
                resetGames();
                HiddenTooltipBox();
                $tooltipContent.hide();
                break;
            case "tooltip-box-right":
                //继续游戏
                createGames();
                HiddenTooltipBox();
                $tooltipContent.hide();
                break;
        }
        return false;
    });

}

/**
 * 消除事件
 * @return {[type]} [description]
 */
function deleteTooltipBox() {
    $tooltipBox.hide().off()
}


/**
 * 设置背景
 * @param {[type]} path [description]
 */
function setBackground() {
    var config = algorithm.conf[_gameTotal];
    var contentImage = config.images.content;
    if (contentImage) {
        $tooltipContent.css('background-image', 'url(' + contentImage + ')')
    }
}


function calculate(len) {
   return Math.floor(Math.random() * 2);
}

var arr = ['.winning-content-fail','.winning-content-win']


/**
 * 抽奖按钮绑定
 * @return {[type]} [description]
 */
function lotteryBind() {
    /**
     * 点击抽奖
     * @type {[type]}
     */
    $lotteryLottery.one(utils.event.start, function() {
        var className = arr[calculate(2)]
        //动态随机中奖概率
        var $showElement = $winningPage.find(className);
        $showElement.show();

        visible($winningPage);
        hidden($lotteryPage);
        hidden($contentPage);

        /**
         * 得分页面
         * 再玩一次
         * @return {[type]}     [description]
         */
        //限制玩的次数
        if (_playCount !== AllowPlayCount) {
            $lotteryPlay.one(utils.event.start, function() {
                if (!checkMobile()) {
                    return;
                }
                $showElement.hide();
                hidden($lotteryPage)
                resetGames();
                return false;
            });
        }

        return false;
    });
}


function addBottom() {
    Music.paly('music/through.mp3');
    ++_playCount;
    $lotteryLottery = $('<div class="lottery-lottery" style="z-index:999999;">我要中大奖</div>');
    //绑定事件
    lotteryBind()
    $contentPage.append($lotteryLottery)
}


/**
 * 过关提示
 * @return {[type]} [description]
 */
function selectTooltipBox(over) {
    Music.paly('music/through.mp3');    
    setBackground();
    $tooltipContent.show();
    if (over) { //如果是3关结束页面
        addBottom();//增加点击按钮
    } else {
        $tooltipBox
            .show()
            .addClass('animated zoomIn')
            .on(utils.style.animationend, function() {
                BindTooltipBox();
            })
    }
}


/**
 * 测试代码
 * @type {[type]}
 */
var test = false;

if(test){
    limitTime = 3000000;

    visible($contentPage);
    hidden($homePage)


    // selectTooltipBox()

    // hidden($lotteryPage)

    //     var className = arr[calculate(2)]
    // //动态随机中奖概率
    // var $showElement =  $winningPage.find('.winning-content-win');
    // $showElement.show();

    // visible($winningPage)

   
}
