//================================================
//格式化字符串
var slice = Array.prototype.slice

function toArray(a, i, j) {
    return slice.call(a, i || 0, j || a.length);
}
/**
 * 返回true,如果传递的值不是未定义。
 * @param {Mixed}
 * @return {Boolean}
 */
function isDefined(v) {
    return typeof v !== 'undefined';
}

/**
 * 拷贝对象，跳过已存在的
 * @param  {[type]} o [接受方对象]
 * @param  {[type]} c [源对象]
 * @return {[type]}   [description]
 */
function applyIf(o, c) {
    if (o) {
        for (var p in c) {
            //跳过已存在
            if (!isDefined(o[p])) {
                o[p] = c[p];
            }
        }
    }
    return o;
}
/**
 * @class String
 * 格式化字符串
 */
applyIf(String, {
    format: function(format) {
        var args = toArray(arguments, 1);
        return format.replace(/\{(\d+)\}/g, function(m, i) {
            return args[i];
        });
    }
});


function bindFn(fn, context) {
    return function boundFn() {
        return fn.apply(context, arguments);
    };
}

function setTimeoutContext(fn, timeout, context) {
    return setTimeout(bindFn(fn, context), timeout);
}



function isNumber(v) {
    return typeof v === 'number' && isFinite(v);
}

Function.prototype.createDelegate = function(obj, args, appendArgs) {
    var method = this;
    return function() {
        var callArgs = args || arguments;
        if (appendArgs === true) {
            callArgs = Array.prototype.slice.call(arguments, 0);
            callArgs = callArgs.concat(args);
        } else if (isNumber(appendArgs)) {
            callArgs = Array.prototype.slice.call(arguments, 0); 
            var applyArgs = [appendArgs, 0].concat(args); 
            Array.prototype.splice.apply(callArgs, applyArgs); 
        }
        return method.apply(obj || window, callArgs);
    };
}


/**
 * 延时函数
 * @param  {[type]} millis     [description]
 * @param  {[type]} obj        [description]
 * @param  {[type]} args       [description]
 * @param  {[type]} appendArgs [description]
 * @return {[type]}            [description]
 */
Function.prototype.defer = function(millis, obj, args, appendArgs) {
    var fn = this.createDelegate(obj, args, appendArgs);
    if (millis > 0) {
        return setTimeout(fn, millis);
    }
    fn();
    return 0;
}



/**
 * 属性支持检测
 * @type {[type]}
 */
var _style = document.documentElement.style,
    TRANSITION_END = 'transitionend',
    ANIMATION_END  = 'animationend',
    _cache = {};

function prefixStyle(attr) {
    var vendors = ['webkit', 'Moz', 'ms', 'o'];
    var name;
    //缓存中存在
    if (_cache[attr]) {
        return _cache[attr];
    }
    //不需要加前缀
    if (attr in _style) {
        return _cache[attr] = attr;
    }
    //需要加前缀
    jQuery.each(vendors, function(v) {
        if (jQuery.camelCase(v + '-' + attr) in _style) {
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
            "moz": "transitionend",
            "webkit": "webkitTransitionEnd",
            "ms": "MSTransitionEnd",
            "o": "oTransitionEnd"
        }
    ANIMATION_END_NAMES = {
        "moz": "animationend",
        "webkit": "webkitAnimationEnd",
        "ms": "MSAnimationEnd",
        "o": "oAnimationEnd"
    };

    if (!vendors) return;
    vendors = vendors.split('-');
    if (!vendors[1]) return;

    TRANSITION_END = TRANSITION_END_NAMES[vendors[1]];
    ANIMATION_END = ANIMATION_END_NAMES[vendors[1]];
    KEYFRAMES = '@-' + vendors[1] + '-keyframes ';
})();



/**
 * css3 游览器支持
 * @type {Object}
 */
var support = {
    prefix        : prefixStyle,
    animationEnd  : ANIMATION_END,
    transitionEnd : TRANSITION_END,
    transform     : prefixStyle("transform")
}