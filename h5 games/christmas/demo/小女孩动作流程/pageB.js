/**
 * 第二副场景页面
 *
 */
function pageB(element, pageComplete) {

    //女孩
    var $girl = element.find(".girl");
    var animationEnd = "animationend webkitAnimationEnd"

    /**
     * 小女孩动作
     * @return {[type]} [description]
     */
    var girlAction = {
        //小女起立
        standUp: function() {
            var dfd = $.Deferred();
            //起立
            setTimeout(function(){
                $girl.addClass("girl-standUp");
            },200)
            //抛书
            setTimeout(function(){
                $girl.addClass("girl-throwBook");
                dfd.resolve()
            },500)
            return dfd;
        },
        //走路
        walk: function(callback) {
            var dfd = $.Deferred();
            //小女孩走路
            $girl.addClass("girl-walk");
            $girl.transition({
                "left": "4.5rem"
            }, 4000, "linear", function() {
                dfd.resolve()
            })
            return dfd;
        },
        //停止走路
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
            $girl.one(animationEnd, function() {
                callback();
            })
        },
        //泪奔
        weepWalk: function(callback) {
            $girl.addClass("girl-weep");
            $girl.transition({
                "left": "7rem"
            }, 1000, "linear", function() {
                $girl.addClass("walk-stop").removeClass("girl-weep")
                callback();
            })
        },
        //拥抱
        hug: function() {
            $girl.addClass("girl-hug").addClass("walk-run")
        }
    }
    

    girlAction
        .standUp()
        .then(function() {
            //女孩停止走路
            return girlAction.stopWalk();
        })
        .then(function() {
            //女孩走路
            return girlAction.walk();
        })
        .then(function(){
            //选择
            girlAction.choose(function() {
                //继续走路
                girlAction.weepWalk(function() {
                    //拥抱
                    girlAction.hug();
                })
            })

        })

}
