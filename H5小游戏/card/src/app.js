'use strict';

var layerOpen =layer.open({
    type: 2,
    content: '数据加载中...'
});

//算法
var algorithm = CardGameConfig.algorithm;
var confCount = Object.keys(algorithm.conf);
var prizeRandom = CardGameConfig.prizeRandom;

//预加载图片
var pre = require('./preload');
pre.load(algorithm.conf, CardGameConfig.preloadimages, function() {
       require('./main');
       layer.close(layerOpen)
       layerOpen= null;
})