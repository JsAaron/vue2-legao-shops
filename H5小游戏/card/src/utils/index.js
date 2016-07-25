var utils = {};

var _elementStyle = document.createElement('div').style;
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

function _prefixStyle(style, Joining) {
    Joining = Joining || ''
    if (_vendor === false) return false;
    if (_vendor === '') return style;
    return _vendor + Joining + style.charAt(0).toUpperCase() + style.substr(1);
}

utils.getTime = Date.now || function getTime() {
    return new Date().getTime();
};

utils.extend = function(dest, src, merge) {
    var keys = Object.keys(src);
    var i = 0;
    while (i < keys.length) {
        if (!merge || (merge && dest[keys[i]] === undefined)) {
            dest[keys[i]] = src[keys[i]];
        }
        i++;
    }
    return dest;
};

utils.merge = function(dest, src) {
    return utils.extend(dest, src, true);
}

utils.addEvent = function(el, type, fn, capture) {
    el.addEventListener(type, fn, !!capture);
};

utils.removeEvent = function(el, type, fn, capture) {
    el.removeEventListener(type, fn, !!capture);
};

var _transform = _prefixStyle('transform');

utils.extend(utils, {
    hasTransform: _transform !== false,
    hasPerspective: _prefixStyle('perspective') in _elementStyle,
    hasTouch: 'ontouchstart' in window,
    hasPointer: navigator.msPointerEnabled,
    hasTransition: _prefixStyle('transition') in _elementStyle
});
utils.isBadAndroid = /Android /.test(window.navigator.appVersion) && !(/Chrome\/\d/.test(window.navigator.appVersion));

utils.extend(utils.style = {}, {
    transform                : _transform,
    transitionTimingFunction : _prefixStyle('transitionTimingFunction'),
    transitionDuration       : _prefixStyle('transitionDuration'),
    transitionDelay          : _prefixStyle('transitionDelay'),
    transformOrigin          : _prefixStyle('transformOrigin')
});

utils.hasClass = function(e, c) {
    var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
    return re.test(e.className);
};

utils.addClass = function(e, c) {
    if (utils.hasClass(e, c)) {
        return;
    }
    var newclass = e.className.split(' ');
    newclass.push(c);
    e.className = newclass.join(' ');
};

utils.removeClass = function(e, c) {
    if (!utils.hasClass(e, c)) {
        return;
    }
    var re = new RegExp("(^|\\s)" + c + "(\\s|$)", 'g');
    e.className = e.className.replace(re, ' ');
};

utils.format = function(content) {
    var args = [].slice.call(arguments, 1, arguments.length);
    return content.replace(/\{(\d+)\}/g, function(m, i) {
        return args[i];
    });
}


var TRANSITION_END = 'transitionend';
var ANIMATION_END = 'animationend';
var KEYFRAMES = '@keyframes ';

(function() {
    var vendors = _prefixStyle('animation', '-');
    var TRANSITION_END_NAMES = {
        "moz"    : "transitionend",
        "webkit" : "webkitTransitionEnd",
        "ms"     : "MSTransitionEnd",
        "o"      : "oTransitionEnd"
    };
    var ANIMATION_END_NAMES = {
        "moz"    : "animationend",
        "webkit" : "webkitAnimationEnd",
        "ms"     : "MSAnimationEnd",
        "o"      : "oAnimationEnd"
    };
    if (!vendors) return;
    vendors = vendors.split('-');
    if (!vendors[1]) return;
    TRANSITION_END = TRANSITION_END_NAMES[vendors[0]];
    ANIMATION_END = ANIMATION_END_NAMES[vendors[0]];
    KEYFRAMES = '@-' + vendors[1] + '-keyframes ';
})();

utils.extend(utils.style, {
    keyframes     : KEYFRAMES,
    animationend  : ANIMATION_END,
    transitionend : TRANSITION_END
})
    
utils.extend(utils.event = utils.event || {}, {
    start  : utils.hasTouch ? 'touchstart' : 'mousedown',
    move   : utils.hasTouch ? 'touchmove' : 'mousemove',
    end    : utils.hasTouch ? 'touchend' : 'mouseup',
    cancel : utils.hasTouch ? 'touchcancel' : 'mouseup'
})

module.exports = utils;
