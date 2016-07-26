/**
 * 销毁
 * @return {[type]} [description]
 */
exports.destroy = function() {
	this.$container.off();
	this.observer.off();
	this.$container.empty();
	this.$container = null;
}