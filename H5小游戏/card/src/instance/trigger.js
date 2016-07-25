var depend = require('./depend');
var utils = require('../utils');

/**
 * 手动触发
 */
exports.getPos = function(element) {
    return {
        'col': parseInt(element.getAttribute('data-col')),
        'row': parseInt(element.getAttribute('data-row'))
    }
}

exports.runAnim = function(element, status) {
    var $element = $(element)
    $element.find('.is-hidden').addClass('is-selected')
    $element.addClass('is-switched');
    if (status) {
        //给每一个li ->anim  增加状态
        var $children = $element.children();
        $children.each(function(i, elem) {
            elem.setAttribute('data-status', status)
        })
    }
}

/**
 * 去重复
 * @param  {[type]} element     [description]
 * @param  {[type]} collections [description]
 * @return {[type]}             [description]
 */
function toRepeat(element,collections) {
    return -1 !== collections.indexOf(element) ? true :false;
}

exports.triggerClick = function(event) {
    var element;
    if (element = depend.findContainer(event, 'img')) {
        //如果有重复元素
        if (toRepeat(element,this.trackAnims.elems)) {
            return
        }
        //最多2个同时点击，并且不是重复
        //或者是禁止点击的元素了(动画结束了)
        if (this.trackAnims.elems.length > 1
            || element.getAttribute('data-status') === 'close') { //已完成动画
            return
        }
        this.trackAnims.elems.push(element);
        this.runAnim(element);
    }
}

