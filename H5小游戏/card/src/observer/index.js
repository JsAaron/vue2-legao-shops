/**
 * 触发器
 * @return {[type]} [description]
 */

function Observer(ctx) {
    this._ctx = ctx || this
}

var o = Observer.prototype

o.on = function(event, fn) {
    this._callback = this._callback || {};
    (this._callback[event] = this._callback[event] || [])
    .push(fn)
    return this
}

o.once = function(event, fn) {
    var self = this
    this._callback = this._callback || {}

    function on() {
        self.off(event, on)
        fn.apply(this, arguments)
    }

    on.fn = fn
    this.on(event, on)
    return this
}

/**
 * 检测对应事件是否存在
 * @return {[type]} [description]
 */
o.checkExists = function(event) {
    return this._callback[event]
}

o.off = function(event, fn) {
    this._callback = this._callback || {}

    // all
    if (!arguments.length) {
        this._callback = {}
        return this
    }

    // specific event
    var callbacks = this._callback[event]
    if (!callbacks) return this

    // remove all handlers
    if (arguments.length === 1) {
        delete this._callback[event]
        return this
    }

    // remove specific handler
    var cb
    for (var i = 0; i < callbacks.length; i++) {
        cb = callbacks[i]
        if (cb === fn || cb.fn === fn) {
            callbacks.splice(i, 1)
            break
        }
    }
    return this
}

o.notify = function(event, a, b, c, d) {
    this._callback = this._callback || {}
    var callbacks = this._callback[event]
    if (callbacks) {
        callbacks = callbacks.slice(0)
        for (var i = 0, len = callbacks.length; i < len; i++) {
            callbacks[i].call(this._ctx, a, b, c, d)
        }
    }

    return this
}

module.exports = Observer


