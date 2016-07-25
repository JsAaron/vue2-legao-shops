
var animationend = 'webkitAnimationEnd oanimationend msAnimationEnd animationend';

/**
 * 原始布局
 * @return {[type]} [description]
 */
exports.nature = function(row, col) {
    var order = [];
    var i;
    var j;
    for (i = 0; i < col; i++) {
        for (j = 0; j < row; j++) {
            if (!order[i]) {
                order[i] = [];
            }
            order[i].push(j)
        }
    }
    return order;
}

/**
 * 根据长度随机
 * @param  {[type]} len [description]
 * @return {[type]}     [description]
 */
function calculate(len) {
   return Math.floor(Math.random() * len);
}

/**
 * 数组随机
 * @param  {[type]} num [description]
 * @return {[type]}     [description]
 */
function arrRandom(arr) {
    arr.sort(function() {
        return Math.random() > 0.5 ? -1 : 1;
    })
    return arr;
}

/**
 * 上下算法
 * @return {[type]} [description]
 */
function upToDown(randomOrder, originalOrder) {
    var beforeOrder;
    var order;
    for (var i = 0, len = originalOrder.length; i < len; i++) {
        randomOrder[i] = [];
        for (var j = 0, orderLen = originalOrder[i].length; j < orderLen; j++) {
            //随机数
            order = calculate(orderLen);
            //去重,保证唯一
            if (randomOrder[i].length > 0) {
                while (jQuery.inArray(order, randomOrder[i]) > -1) {
                    order = calculate(orderLen)
                }
            }
            randomOrder[i].push(order);
        }
    }
    for (i = 0; i < randomOrder.length; i++) {
        order = randomOrder[i];
        if (beforeOrder) {
            //保证不一致
            if (order.toString() == beforeOrder.toString()) {
                return upToDown(originalOrder, randomOrder)
            }
        }
        beforeOrder = order;
    }
}



/**
 * 完全随机
 * @return {[type]} [description]
 */
function completelyRandom(originalOrder,randomOrder){
    var arr = []
    //取出原始数
    for (var i = 0, len = originalOrder.length; i < len; i++) {
        for (var j = 0, orderLen = originalOrder[i].length; j < orderLen; j++) {
            arr.push(originalOrder[i][j])
        }
    }
    //随机一次
    arrRandom(arr)

    //合并到randomOrder
    for (i = 0, len = originalOrder.length; i < len; i++) {
        randomOrder[i] = [];
        for (var j = 0, orderLen = originalOrder[i].length; j < orderLen; j++) {
            randomOrder[i].push(arr[j + (i * orderLen)])
        }
    }
}


//随机算法
exports.random = function(originalOrder, algorithm) {
    var randomOrder = [];
    switch (algorithm) {
        case 1:
            upToDown(originalOrder, randomOrder)
            break
        case 2:
            completelyRandom(originalOrder, randomOrder)
            break;
    }
    return randomOrder;
}


//找到容器ul
exports.findContainer = function(event, appoint) {
    var elem, elementName;
    if (elem = event.target) {
        //指定元素
        if (appoint && appoint != elem.nodeName.toLowerCase()) {
            return;
        }
        while ((elem = elem['parentNode']) && elem.nodeType !== 9) {
            if (elem.nodeType === 1) {
                elementName = elem.nodeName.toLowerCase();
                if (elementName == 'ul') {
                    return elem;
                }
            }
        }
    }
}

exports.pushArray = function(obj, key, fn) {
    if (!obj[key]) {
        obj[key] = [];
    }
    fn(obj[key])
}

var once = false;
exports._bind = function() {
    this.$container.on('mousedown touchstart', function() {
        this.$container.off('mousedown touchstart')
        this.triggerClick(event)
        console.log(1)
        return false;
    }.bind(this))

    if (!once) {
        once = true;
        this.$container.on(animationend, function(event) {
            this.animCallback(event);
            return false;
        }.bind(this));
    }
}



