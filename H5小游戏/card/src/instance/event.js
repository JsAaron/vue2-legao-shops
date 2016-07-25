/**
 * 冒泡事件
 */
var depend = require('./depend');
var animationend = 'webkitAnimationEnd oanimationend msAnimationEnd animationend';


exports._initEvent = function() {
	this.$container.on('mousedown touchstart', function() {
		this.triggerClick(event)
		return false;
	}.bind(this))

	this.$container.on(animationend, function(event) {
		this.animCallback(event);
		return false;
	}.bind(this));
	// depend._bind.call(this);
}
 