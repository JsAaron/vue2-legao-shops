//////////
// 参数设置 //
//////////

var config = {

    //全屏
    fullscreen: true,

    //设置容器尺寸
    //如果设置，需要输入具体的px值
    layer: {
        'width' : "800",
        'top'   : 0,
        'left'  : 0
    }
}

var proportion = 900 / 1440;
if (config.fullscreen) {
    var width = document.documentElement.clientWidth;
    config.layer.width = width;
    config.layer.height = width * proportion
} else {
    config.layer.height = config.layer.width * proportion
}
