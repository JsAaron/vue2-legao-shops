/**
 * 第二副场景页面
 *
 */
function PageB(element, pageComplete) {

    var $element = element;
    //圣诞男孩
    var $boy = $element.find(".christmas-boy");
    //3d旋转
    var $carousel = $element.find("#carousel");
    //女孩
    var $girl = $element.find(".girl");
    //猫
    var $cat = $element.find(".cat");

    // 时间设置
    var setTime = {
        //男孩
        boy: {
            //走路时间
            walk: 4000,
        },
        //女孩
        girl: {
            //起身时间
            standUp: 200,
            //抛书
            throwBook: 300,
            //走路
            walk: 3000,
            //飞奔拥抱走路
            hugWalk: 1000,
        }
    }


    /**
     * 小女孩动作
     * @return {[type]} [description]
     */
    var girlAction = {
        //小女起立
        standUp: function() {
            var dfd = $.Deferred();
            //起立
            (function() {
                $girl.addClass("girl-standUp");
            }).defer(setTime.girl.standUp);
            //抛书
            (function() {
                $cat.addClass("cat-book");
                $girl.addClass("girl-throwBook");
                dfd.resolve()
            }).defer(setTime.girl.throwBook + setTime.girl.standUp);
            return dfd;
        },
        walk: function(callback) {
            var dfd = $.Deferred();
            //小女孩走路
            $girl.addClass("girl-walk");
            $girl.transition({
                "left": "4.5rem"
            }, setTime.girl.walk, "linear", function() {
                dfd.resolve()
            })
            return dfd;
        },
        stopWalk: function() {
            $girl.addClass("walk-stop")
                .removeClass("girl-standUp")
                .removeClass("girl-walk")
                .removeClass("girl-throwBook")
                .addClass("girl-stand")
        },
        //选择3d
        choose: function(callback) {
            $girl.addClass("girl-choose")
                .removeClass("walk-stop");
            $girl.one(support.animationEnd, function() {
                callback();
            })
        },
        reset: function() {
            $girl.removeClass("girl-choose");
        },
        hugWalk: function(callback) {
            $girl.addClass("girl-weep");
            $girl.transition({
                "left": "7rem"
            }, setTime.girl.hugWalk, "linear", function() {
                $girl.addClass("walk-stop").removeClass("girl-weep")
                callback();
            })
        },
        //拥抱
        hug: function() {
            $girl.addClass("girl-hug").addClass("walk-run")
        }
    }

    /**
     * 小男孩动作
     * @return {[type]} [description]
     */
    var boyAction = {
        //走路
        walk: function() {
            var dfd = $.Deferred();
            $boy.transition({
                "right": "4.5rem"
            }, setTime.boy.walk, "linear", function() {
                dfd.resolve()
            });
            return dfd;
        },
        //停止走路
        stopWalk: function() {
            $boy.removeClass("boy-walk");
            $boy.addClass("boy-stand");
        },
        //解开包裹
        unwrapp: function() {
            var dfd = $.Deferred();
            $boy.addClass("boy-unwrapp");
            $boy.removeClass("boy-stand");
            $boy.one(support.animationEnd, function() {
                dfd.resolve();
            })
            return dfd;
        },
        //继续走路
        runWalk: function() {
            $boy.addClass("walk-run");
        },
        //人物用拥抱
        //重叠问题处理
        hug: function() {
            $boy.addClass("boy-hug").one(support.animationEnd, function() {
                $(".christmas-boy-head").show()
            })
        },
        //脱衣动作
        //1-3
        strip: function(count) {
            $boy.addClass("boy-strip-" + count).removeClass("boy-unwrapp");
        }
    }

    //开始走路
    boyAction.walk()
        .then(function() {
            //停止走路
            boyAction.stopWalk();
        })
        .then(function() {
            //女孩起身
            return girlAction.standUp()
        })
        .then(function() {
            //女孩走路
            return girlAction.walk();
        })
        .then(function() {
            //女孩停止走路
            return girlAction.stopWalk();
        })
        .then(function() {
            //解开包裹
            return boyAction.unwrapp();
        })
        .then(function() {
            //3d旋转
            return rotation3d()
        })
        .then(function() {
            girlAction.hugWalk(function() {
                girlAction.hug();
                boyAction.hug();
                (function() {
                    //整个动作完成
                    pageComplete && pageComplete()
                }).defer(1000)
            })
        })


    /**
     * 3d旋转
     * @return {[type]} [description]
     */
    function rotation3d() {
        var dfd = $.Deferred();
        (function() {
            createGift(dfd);
        }).defer(500);
        return dfd;
    }


    function createGift(dfd) {
        //3d木马
        var carousel = createCarousel();
        //旋转起点
        var start = 1;
        //终点，旋转3次
        var end = carousel.numpics;
        //播放
        var play = function() {
            //获取礼物
            carouselGift(start, carousel, function() {
                ++start;
                next();
            });
        };
        //检测播放次数
        var next = function() {
            //只旋转3次
            if (start > end) {
                carousel.destroy();
                (function() {
                    dfd.resolve();
                }).defer(1000)
                return
            }
            (function() {
                play();
            }).defer(1000)
        };
        play();
    }



    /**
     * 获取礼物
     * @return {[type]} [description]
     */
    function carouselGift(count, carousel, complete) {
        //运行3次
        carousel.run(count);
        //小女孩选择动作
        girlAction.choose(function() {
            //选中视频
            carousel.selected(function() {
                // //小女孩动作还原
                // girlAction.reset();
                // //旋转动作还原
                // carousel.reset();
                // //脱衣动作
                // boyAction.strip(count);

                // setTimeout(function() {
                //     complete();
                // }, 1000)

                // 播放视频
                carousel.palyVideo({
                    //加载开始
                    load: function() {
                        //小女孩动作还原
                        girlAction.reset();
                        //旋转动作还原
                        carousel.reset();
                        //脱衣动作
                        boyAction.strip(count);
                    },
                    //完成
                    complete: function() {
                        complete();
                    }
                });
            });
        })
    }


    //创建3d旋转
    function createCarousel() {
        //3d旋转
        var carousel = new Carousel($carousel, {
            imgUrls: [
                "http://img.mukewang.com/5662e26f00010dea14410901.png",
                "http://img.mukewang.com/5662e2960001f16314410901.png",
                "http://img.mukewang.com/5662e29a0001905a14410901.png"
            ],
            videoUrls: [
                "http://www.imooc.com/upload/media/qx-one.mp4",
                "http://www.imooc.com/upload/media/qx-two.mp4",
                "http://www.imooc.com/upload/media/qx-three.mp4"
            ]
        });
        return carousel;
    }


}
