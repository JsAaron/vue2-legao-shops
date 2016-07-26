///////////
//设备平台判断 //
///////////
;(function() {

  //在读酷pc端 navigator的值被改写过了!!
  //navigator.appVersion: "xxt 1.0.5260.29725"
   var ua =  navigator.userAgent,
       uv = navigator.appVersion,
       _style         = document.documentElement.style,
       _cache         = {},
       TRANSITION_END = 'transitionend',
       ANIMATION_END  = 'animationend',
       KEYFRAMES      = '@keyframes ',
       isAndroid      = (/android/gi).test(uv),
       isIphone       = (/iphone|ipod/gi).test(ua),
       isIpad         = (/ipad/gi).test(ua),
       isIOS          = isIphone || isIpad,
       isIOS7         = isIOS && (/OS\s7/gi).test(ua),
       has3d          = 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix();

       //针对win8的处理
       var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;
       //支持触屏
       var SUPPORT_TOUCH = ('ontouchstart' in window);
       //支持鼠标
       var SUPPORT_MOUSE = ('onmousedown' in window);

       //移动端仅仅只支持touch
       var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

       //判断是否为浏览器
       var org_href = document.location.href;
       var boolBrowser = org_href.indexOf('http') > -1 || org_href.indexOf('https') > -1;

       function evtTarget(event, original) {
           var currTouches = null;
           if (SUPPORT_ONLY_TOUCH) {
             currTouches = event.touches;
             if (currTouches && currTouches.length > 0) {
               event = currTouches[0];
             }
           }
           return original ? event : event.target;
       }

       function prefixStyle(attr) {
          var vendors = ['webkit', 'Moz', 'ms', 'o'];
          var name;
          //缓存中存在
          if(_cache[attr]){
            return _cache[attr];
          }
          //不需要加前缀
          if(attr in _style){
            return _cache[attr] = attr;
          }
          //需要加前缀
          _.each(vendors,function(v){
            if(jQuery.camelCase(v+'-'+attr) in _style){
              name = '-' + v + '-' + attr;
              return _cache[attr] = name;
            }
          })

          return name;
      }

    (function() {
      var vendors, TRANSITION_END_NAMES, ANIMATION_END_NAMES;
      vendors = prefixStyle('animation'),
        TRANSITION_END_NAMES = {
          "moz"    : "transitionend",
          "webkit" : "webkitTransitionEnd",
          "ms"     : "MSTransitionEnd",
          "o"      : "oTransitionEnd"
        }
      ANIMATION_END_NAMES = {
        "moz"    : "animationend",
        "webkit" : "webkitAnimationEnd",
        "ms"     : "MSAnimationEnd",
        "o"      : "oAnimationEnd"
      };

      if (!vendors) return;
      vendors = vendors.split('-');
      if (!vendors[1]) return;
      
      TRANSITION_END = TRANSITION_END_NAMES[vendors[1]];
      ANIMATION_END = ANIMATION_END_NAMES[vendors[1]];
      KEYFRAMES = '@-' + vendors[1] + '-keyframes ';
    })();


    //平台判断参数
     plat = {
        has3d          : has3d,
        isAndroid      : isAndroid,
        isIphone       : isIphone,
        isIpad         : isIpad,
        isIOS          : isIOS,
        isIOS7         : isIOS7,
        isOverflow     : ("WebkitOverflowScrolling" in _style),
        hasTouch       : SUPPORT_ONLY_TOUCH,
        //游览器平台 解决ios Android浏览器判断问题
        isBrowser      : boolBrowser ? boolBrowser : !SUPPORT_ONLY_TOUCH,
        //2015.3.23 
        //可以点击与触摸
        isSurface      : SUPPORT_TOUCH && SUPPORT_MOUSE && !SUPPORT_ONLY_TOUCH,
        RESIZE_EV      : 'onorientationchange' in window ? 'orientationchange' : 'resize',
        START_EV       : SUPPORT_ONLY_TOUCH ? 'touchstart' : 'mousedown',
        MOVE_EV        : SUPPORT_ONLY_TOUCH ? 'touchmove' : 'mousemove',
        END_EV         : SUPPORT_ONLY_TOUCH ? 'touchend' : 'mouseup',
        CANCEL_EV      : SUPPORT_ONLY_TOUCH ? 'touchcancel' : 'mouseup',
        ANIMATION_EV   : ANIMATION_END,
        TRANSITION_EV  : TRANSITION_END,
        evtTarget      : evtTarget,
        prefixStyle    : prefixStyle,
        KEYFRAMES      : KEYFRAMES,
        noMaskBoxImage : prefixStyle('mask-box-image') == undefined
    };


    /////////////////////////////////////////////////////////
    ///2015.3.24 新增
    //=====================事件单独处理========================= //
    //1 isBrowser
    //2 isMobile
    //3 isSurface
    /////////////////////////////////////////////////////////

    //2015.3.23 
    //可以点击与触摸
    var isSurface = plat.isSurface;
    //触发事件名
    var touchName = ['touchstart', 'touchmove', 'touchend', TRANSITION_END];
    var mouseName = ['mousedown', 'mousemove', 'mouseup', TRANSITION_END];
    var EVENT_NAME = function(){
        if (isSurface) {
          return {
            touch: touchName,
            mouse: mouseName
          }
        }
       return [plat.START_EV, plat.MOVE_EV, plat.END_EV, TRANSITION_END];
    }();

    /**
     * 合并事件绑定处理
     * 因为isSurface设备上
     * 要同时支持2种方式
     * @return {[type]} [description]
     */
    function bindEvent(events, callback) {
        callback.start && this.addEventListener(events[0], callback.start, false);
        callback.move && this.addEventListener(events[1], callback.move, false);
        callback.end && this.addEventListener(events[2], callback.end, false);
        callback.transitionend && this.addEventListener(events[3], callback.transitionend, false);
    }

    function removeEvent(events, callback) {
        callback.start && this.removeEventListener(events[0], callback.start, false);
        callback.move && this.removeEventListener(events[1], callback.move, false);
        callback.end && this.removeEventListener(events[2], callback.end, false);
        callback.transitionend && this.removeEventListener(events[3], callback.transitionend, false);
    }

    /**
     * processor
     * @param  {[type]}   processor    [处理器]
     * @param  {[type]}   eventContext [上下文]
     * @param  {Function} callback     [回调函数]
     * @return {[type]}                [description]
     */
    function execEvent(processor, eventContext, callback) {
        //如果两者都支持
        //鼠标与触摸
        if (isSurface) {
          // touch :['touchstart','touchmove','touchend'],
          // mouse :['mousedown','mousemove','mouseup']
          _.each(EVENT_NAME, function(events) {
            processor.call(eventContext, events, callback);
          })
        } else {
           processor.call(eventContext, EVENT_NAME, callback);
        }
    }


    /**
     * 合并事件绑定处理
     * 因为isSurface设备上
     * 要同时支持2种方式
     * @return {[type]} [description]
     */
    // Xut.plat.execEvent('on/off',{
    //     context : eventContext,
    //     callback:{
    //         start   : start,
    //         move    : move,
    //         end     : end
    //     }
    // })
    plat.execEvent = function(eventName, opts) {
        var eventContext = opts.context;
        var callback     = opts.callback;
        if (eventName === 'on') {
          execEvent(bindEvent, eventContext, callback)
        }
        if (eventName === 'off') {
          execEvent(removeEvent, eventContext, callback)
        }
    }   

    //如果execEvent的callback绑定的this
    // Xut.plat.handleEvent(e, {
    //     start: function(e) {
    //         self.onTouchStart(e);
    //     },
    //     move: function(e) {
    //         self.onTouchMove(e);
    //     },
    //     end: function(e) {
    //         self.onTouchEnd(e);
    //     },
    //     transitionend: function(e) {
    //         self.onAnimComplete(e);
    //     }
    // })
    plat.handleEvent = function(processor, context, event) {
        switch (event.type) {
          case 'touchstart':
          case 'mousedown':
            processor.start && processor.start.call(context,event)
            break;
          case 'touchmove':
          case 'mousemove':
            processor.move && processor.move.call(context,event)
            break;
          case 'touchend':
          case 'mouseup':
            processor.end && processor.end.call(context,event)
            break;
          case TRANSITION_END:
            processor.transitionend && processor.transitionend.call(context,event)
            break;
        }
    } 

 })();

