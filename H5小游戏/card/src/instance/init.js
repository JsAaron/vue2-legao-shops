
var utils    = require('../utils'); 
var config   = require('../config');
var depend   = require('./depend');
var Observer = require('../observer');

/**
 * 初始化数据
 */
exports._init = function(element,options) {
    
    //页面容器
    var $container = this.$container = $(element);
    options        = this.options = utils.merge(options || {}, config);

    //区域尺寸
    this.contentWidth  = parseInt($container.css('width'))
    this.contentHeight = parseInt($container.css('Height'))

    //布局的原始排序
	this.originalOrder = depend.nature(options.level.row, options.level.col);

    if (options.random) {
        //新是随机排序
        this.randomOrder = depend.random(this.originalOrder, options.random);
    } else {
        this.randomOrder = this.originalOrder;
    }

 
    //收集回调
    this.trackAnims = {
        filter      : [], //过滤的元素合集
        cache       : [], //一个元素动画2次回调处理
        elems       : [], //触发的元素
        triggerTime : [], //手动触发
        times       : 0, //完成次数
        total       : options.level.row * options.level.col //总数
    };

    this.observer = new Observer();

    //开始构建
    this._initCreate();

    //构建事件
    this._initEvent();
}
 