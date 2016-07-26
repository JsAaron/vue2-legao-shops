var utils = (function() {
    var me = {};

    var _elementStyle = document.createElement('div').style;
    var TRANSITION_END = 'transitionend',
        ANIMATION_END = 'animationend',
        _cache = {};

    var _vendor = (function() {
        var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
            transform,
            i = 0,
            l = vendors.length;

        for (; i < l; i++) {
            transform = vendors[i] + 'ransform';
            if (transform in _elementStyle) return vendors[i].substr(0, vendors[i].length - 1);
        }

        return false;
    })();

    function _prefixStyle(style) {
        if (_vendor === false) return false;
        if (_vendor === '') return style;
        return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
    }

    me.extend = function(target, obj) {
        for (var i in obj) {
            target[i] = obj[i];
        }
    };

    var _transform = _prefixStyle('transform');

    var SUPPORT_TOUCH = ('ontouchstart' in window);

    me.extend(me, {
        RESIZE_EV      : 'onorientationchange' in window ? 'orientationchange' : 'resize',
        START_EV       : SUPPORT_TOUCH ? 'touchstart' : 'mousedown',
        MOVE_EV        : SUPPORT_TOUCH ? 'touchmove' : 'mousemove',
        END_EV         : SUPPORT_TOUCH ? 'touchend' : 'mouseup',
        CANCEL_EV      : SUPPORT_TOUCH ? 'touchcancel' : 'mouseup',
        hasTransform   : _transform !== false,
        hasPerspective : _prefixStyle('perspective') in _elementStyle,
        hasTouch       : SUPPORT_TOUCH,
        hasPointer     : window.PointerEvent || window.MSPointerEvent, // IE10 is prefixed
        hasTransition  : _prefixStyle('transition') in _elementStyle
    });


    me.extend(me.style = {}, {
        transform                : _transform,
        transitionTimingFunction : _prefixStyle('transitionTimingFunction'),
        transitionDuration       : _prefixStyle('transitionDuration'),
        transitionDelay          : _prefixStyle('transitionDelay'),
        transformOrigin          : _prefixStyle('transformOrigin')
    });

    /**
     * 定义defineProperties
     * [description]
     * @param  {[type]} ) {               
     */
    var _createClass = (function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    })();

    me.createClass = _createClass;


    /**
     * 背景音乐
     * @param {[type]} url  [description]
     * @param {[type]} loop [description]
     */
    function Hmlt5Audio(url, loop, preload) {
        var audio;
        var callback;

        if (window.gloAudio) {
            audio = gloAudio;
            audio.url = url;
        } else {
            audio = new Audio(url);
        }
        //预加载
        if (preload) {
            audio.preload = "preload";
        } else {
            audio.autoplay = true;
            audio.loop  = loop ||  false; //是否循环
            audio.play();
        }


        // audio.addEventListener("ended", function() {
        //     alert(callback)
        //     callback && callback();
        // }, true);

        return {

            //暂停复位
            pauseReset: function() {
                if (audio) {
                    audio.pause();
                    audio.currentTime = 0;
                }
            },
            pause:function(){
                if (audio) {
                    audio.pause();
                }
            },
            play:function(cb){
                audio && audio.play();
            }
        }
    }

    me.audio = Hmlt5Audio;


    return me;
})();
