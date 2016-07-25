/**
 * 第一副场景页面
 * http://louisremi.github.com/jquery.transform.js/index.html
 * http://www.html5tricks.com/demo/html5-css3-car-animation/index.html
 * http://www.gbtags.com/gb/demoviewer/4387/c9ebbe12-abab-487d-958a-aa79797ddcda/snow.html.htm
 * http://www.html5tricks.com/demo/pure-css3-weather-icon/index.html
 */

function PageA(element) {
    //根元素
    this.$root= element;
    //小男孩
    this.$boy = element.find(".chs-boy");
    //窗户
    this.$window = element.find(".window");    
    this.$leftWin  = this.$window.find(".window-left")
    this.$rightWin = this.$window.find(".window-right")
}


/**
 * 开窗
 * @return {[type]} [description]
 */
PageA.prototype.openWindow = function(callback) {
    var count = 1;
    var complete = function() {
        ++count
        if (count === 2) {
            callback && callback();
        }
    }
    var bind = function(data) {
        data.one(support.transitionEnd, function(event) {
            data.removeClass("window-transition")
            complete()
        })
    }
    bind(this.$leftWin.addClass("window-transition").addClass("hover"))
    bind(this.$rightWin.addClass("window-transition").addClass("hover"))
}

/**
 * 停止走路
 * @return {[type]} [description]
 */
PageA.prototype.stopWalk = function(){
    this.$boy.removeClass("chs-boy-deer")
}


/**
 * 运行下一个动画
 * @return {Function} [description]
 */
PageA.prototype.next = function(options) {
    var dfd = $.Deferred();
    this.$boy.transition(options.style, options.time, "linear",function() {
        dfd.resolve()
    });
    return dfd;
}


/**
 * 跑步
 * @return {[type]} [description]
 */
PageA.prototype.run = function(callback){
    var that = this;
    var next = function() {
        return this.next.apply(this, arguments)
    }.bind(this)

    next({
        "time": 10000,
        "style": {
            "top": "4rem",
            "right": "16rem",
            "scale": "1.2"
        }
    })
    .then(function() {
       return next({
            "time":500,
            "style": {
               "rotateY" : "-180",
               "scale": "1.5"
            }
        })
    })    
    .then(function() {
        return next({
            "time": 7000,
            "style": {
                "top"   :"7.8rem",
                "right" : "1.2rem"
            }
        })
    }) 
    .then(function(){
        that.stopWalk();
        (function() {
            that.openWindow(function() {
                (function() {
                    callback();
                }).defer(1000)
            });
        }).defer(1000)
    })  

}


