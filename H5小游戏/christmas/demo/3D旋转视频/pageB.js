/**
 * 第二副场景页面
 *
 */
function pageB(element, pageComplete) {

    //3d旋转节点
    var $carousel = element.find("#carousel");

    //旋转木马对象
    var carousel = new Carousel($carousel, {
        imgUrls: [
            "http://img.mukewang.com/5662e29a0001905a14410901.png",
            "http://img.mukewang.com/5662e2960001f16314410901.png",
            "http://img.mukewang.com/5662e26f00010dea14410901.png"
        ],
        videoUrls: [
            "http://www.imooc.com/upload/media/qx-one.mp4",
            "http://www.imooc.com/upload/media/qx-two.mp4",
            "http://www.imooc.com/upload/media/qx-three.mp4"
        ]
    });

    var i = 0;
    $("button").on("click", function() {
        carousel.run(i++, function() {
            //播放视频
            carousel.palyVideo()
        })
    })


}
