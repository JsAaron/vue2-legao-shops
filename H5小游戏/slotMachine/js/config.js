/**
 * 游戏配置
 * @type {Object}
 */
slotGames.conf = {
    /**
     * //游戏最大可玩次数
     * @type {Number}
     */
    count: 3,
    /**
     * 游戏具体配置
     * @type {Array}
     */
    games: {
        /**
         * 通过css的方式增加一个svg定义的渐变效果
         * 让图片产生模糊
         * @type {Boolean}
         */
        fade: false,
        /**
         * 模式
         * 0 常规修改magin-top的方式
         * 1 css3 transform模式
         * 如果不选,默认会根据支持度切换
         * @type {Number}
         */
        mode: 1,
        /**
         * 一个周期滚动的时间
         * @type {Number}
         */
        duration: 500,
        /**
         * 图片的地址，生成对应的列表，按照图片顺序排列
         * @type {Array}
         */
        imgUrl: [
            [
                "./images/slotMachine/roll/1.png",
                "./images/slotMachine/roll/2.png",
                "./images/slotMachine/roll/4.png",
                "./images/slotMachine/roll/3.png"
            ],
            [
                "./images/slotMachine/roll/4.png",
                "./images/slotMachine/roll/2.png",
                "./images/slotMachine/roll/1.png",
                "./images/slotMachine/roll/3.png"
            ],
            [
                "./images/slotMachine/roll/3.png",
                "./images/slotMachine/roll/2.png",
                "./images/slotMachine/roll/1.png",
                "./images/slotMachine/roll/4.png"
            ]
        ],
        /**
         * 初始化显示第几张图片
         * 0 是默认第一张,按照games.photo是索引排序
         * @type {Number}
         */
        active: 0,
        /**
         * 圈数
         * @type {Number}
         */
        rotate: 10
    },


    /**
     * mp3地址
     * @type {Object}
     */
    mp3Url: {
        /**
         * 开始摇奖
         * @type {String}
         */
        play: 'music/play.WAV',
        /**
         * 结尾音频
         * @type {String}
         */
        end:'music/through.mp3'
    },

    /**
     * 每次执行游戏需要发送的请求
     * res.state
     *   res.state = true  //进入正确页面
     *   res.state = false //进入错误页面
     *
     * res.active 
     *   可以设置游戏停留的图片停留的目标图片
     *   从1开始索引
     *
     * res.active 
     *    设置奖品的编号
     * 
     * @return {[type]} [description]
     */
    request: function(res) {

        function GetRandomNum(Min, Max) {
            var Range = Max - Min;
            var Rand = Math.random();
            return (Min + Math.round(Rand * Range));
        }

        //模拟异步ajax请求
        //修改状态
        setTimeout(function() {

            res.state = false;
            res.active = [1, 3, 3] //返回每一组正确的图片索引
            res.prize = GetRandomNum(1, 10); //奖品编号


            // res.state =  GetRandomNum(1, 2) == 1 ? true : false //显示中奖页面
            // res.active   = GetRandomNum(1, 3)   //老虎机中奖图片1,2,3 
            // res.prize    = GetRandomNum(1, 10); //奖品编号
            console.log(res)
        }, 1000)
    },

    /**
     * 预加载图片
     * @type {Array}
     */
    preloadimages: [
        "./images/slotMachine/homepage-bg.png",
        "./images/slotMachine/help.png",
        "./images/slotMachine/introduce.png",
        "./images/slotMachine/enter.png",
        "./images/slotMachine/help-back.png",
        "./images/slotMachine/game-result-bg.png",
        "./images/slotMachine/game-result-none-bg.png",
        "./images/slotMachine/result/paper.png",
        "./images/slotMachine/result/envelope-bg.png",
        "./images/slotMachine/result/help-monkey.png",
        "./images/slotMachine/result/gem.png",


        "./images/slotMachine/result/sign-a.png",
        "./images/slotMachine/result/sign-b.png",
        "./images/slotMachine/result/sign-c.png",


        "./images/slotMachine/roll/1.png",
        "./images/slotMachine/roll/2.png",
        "./images/slotMachine/roll/4.png",
        "./images/slotMachine/roll/3.png",

        "./images/slotMachine/result/monkey-left.png",
        "./images/slotMachine/result/monkey-middle.png",
        "./images/slotMachine/result/monkey-right.png"
    ]
}
