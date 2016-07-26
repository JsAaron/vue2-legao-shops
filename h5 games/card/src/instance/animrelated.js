/**
 * 动画回调处理
 */

var depend = require('./depend');
var utils  = require('../utils');

/**
 * 检测回调的唯一性
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
var checkUnique = function(event) {
    var ul = depend.findContainer(event);
    var index = this.trackAnims.cache.indexOf(ul);
    if (~index) {
        this.trackAnims.cache.splice(index, 1)
        return false;
    }
    this.trackAnims.cache.push(ul);
    return true;
}

/**
 * 状态值
 * @type {Object}
 */
var stateValue = {
    'back'  :'front',
    'front' :'back'
};


/**
 * 重设新的状态
 * @return {[type]} [description]
 */
var restoreState = function(elem,filter){
    //重设值的状态
    elem[0].setAttribute('data-type' , stateValue[filter])
}

/**
 * 恢复属性
 * @param  {[type]} context [description]
 * @param  {[type]} parent  [description]
 * @param  {[type]} filter  [description]
 * @return {[type]}         [description]
 */
var restoreProperties = function(elem, parent, filter) {
    var related = {
        front: function() {
            elem.removeClass('is-visible is-selected').addClass('is-hidden');
        },
        back: function() {
            elem.addClass('is-visible').removeClass('is-hidden is-selected');
        }
    }
    related[filter]();
    parent.removeClass('is-switched')
    //设置状态值
    restoreState(elem,filter);
}


/**
 * 动画回调
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
var autoRestoreAmount = 4;
exports.animCallback = function(event) {
    var ul,
        $ul,
        pos,
        elem,
        $elem,
        elems,
        level,
        index,
        filter,
        parent,
        $parent;

    level   = this.options.level;
    elem    = event.target;
    parent  = depend.findContainer(event)
    $elem   = $(elem);
    $parent = $(parent);


    //////////////////////////////////
    ///
    ///  自动动画：
    ///     比较动画后，不一致自动还原
    ///     
    ///===============================
    var status = elem.getAttribute('data-status');
    if (status === 'autoRestore') {
        elem.removeAttribute('data-status');
        filter = elem.getAttribute('data-type')
        restoreProperties($elem,$parent,filter);
        //最后一个动画
        if (1 === autoRestoreAmount) {
            this.trackAnims.elems.length = 0;
            this.observer.notify('change:fail');
            autoRestoreAmount = 4;
            return
        }
        --autoRestoreAmount;
        return;
    }

    //处理动画元素
    ///  过滤：
    ///  1 每个元素动画的2个li回调
    ///  2 每col都运行了动画
    //每个li元素都会执行
    filter = elem.getAttribute('data-type')
    restoreProperties($elem, $parent, filter)

    //保证只回调一次
    //每一组动画回调一次
    if (checkUnique.call(this, event)) {
        return false;
    }
    $parent.attr('data-status', 'close');


    //合并2个组动画
    this.trackAnims.triggerTime.push(elem)
    if (this.trackAnims.triggerTime.length !== level.col) {
        return;
    }
    this.trackAnims.triggerTime.length = 0;


    ////////////
    //成功与失败处理 //
    ////////////
    var i;
    var self = this;
    //得到正确索引
    var standardElement;
    //动作
    var succeed = true;
    //获取定位坐标
    var getIndex = function(element) {
        var pos = self.getPos(element);
        return self.randomOrder[pos.col][pos.row];
    };

    //运行动画的元素
    elems = this.trackAnims.elems;

    //取出第一个对比值
    standardElement = elems[0];
    index = getIndex(standardElement)
    for (i = 1; i < elems.length; i++) {
        elem = elems[i];
        if (index != getIndex(elem)) {
            succeed = false;
            break;
        }
    }

    if (succeed) {
        elems.forEach(function(elem) {
            //完成
            $(elem)
                .attr('data-status', 'close')
                .css({
                    'transition-delay': '100ms',
                    'transition-duration': '1000ms',
                    'opacity': 0
                }).on(utils.style.transitionend, function() {
                    //全部完成
                    if (self.trackAnims.times === self.trackAnims.total) {
                        self.observer.notify('change:complete');
                    }
                })
        })
        this.trackAnims.times += elems.length;
        this.trackAnims.elems.length = 0;
        this.observer.notify('change:success');
    } else { //失败
        elems.forEach(function(elem, index) {
            elem.removeAttribute('data-status')
            self.runAnim(elem, 'autoRestore')
        })  
    }
}
 