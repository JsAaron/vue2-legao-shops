/**
 * 游戏配置文件
 */

window.CardGameConfig = {

    /**
     * 游戏时间
     * 每关游戏超时的时间设置(单位ms)
     */
    limitTime: 30000,


    //每次游戏闯关次数
    //默认是3关
    limitCount: 3,


    //最多允许玩游戏的次数
    AllowPlayCount: 3,

    /**
     * 计分处理
     * 每次加多少
     * 每次减多少
     * @type {Object}
     */
    score: {
        add: 10,
        subtract: 3
    },

    /**
     * 内部调用接口
     * @type {Object}
     */
    innerCall: {

        /**
         * 是否校验手机号码的正确性
         * 11为数字，默认校验
         * @type {Boolean}
         */
        checkPhoneNumber: true,


        /**
         * 点击开始游戏调用
         * count 已经玩的游戏次数
         * nextGame 调用可以继续游戏
         * @return {[type]} [description]
         */
        startGame: function(count, nextGame) {
            //异步通过服务器查询游戏数据
            //如果可以继续游戏掉用nextGame

            //默认就是可以继续运行
            nextGame();
        },

        /**
         * 触发分享好友调用代码
         * @return {[phoneNumber]} [手机号码]
         */
        shareFriends: function(phoneNumber) {
            alert('触发分享好友config中调用代码，手机号码: ' + phoneNumber)
        },

        /**
         * 点击再玩一次
         * @return {[phoneNumber]} [手机号码]
         */
        playAgain: function(phoneNumber) {

        }
    },


    /**
     * 游戏算法配置
     * @type {Object}
     */
    algorithm: {

        /**
         * 生成的横竖宫格
         * 2*3  2列 3行  6宫格
         * @type {Object}
         */
        level: {
            col: 2,
            row: 3
        },

        /**
         * 声音配置
         * 默认启动
         * @type {Boolean}
         */
        music :true,


        /**
         * 设置游戏的总规则
         * 单个conf中可以覆盖
         * 1 {
         *   images:
         *   gap
         *   random
         * }
         * @type {Object}
         */
        rule: {
            //宫格图片之间的间距,单位PX
            gap: {
                left: 10,
                top: 30
            },
            //随机算法
            //0 不随机
            //1 上下随机
            //2 一顿乱搞
            //默认2
            random: 0
        },

        /**
         * 随机图片与算法位置的一些配置
         * 这里可以根据游戏设定的关数，单独给每一关游戏设置配置
         * 比如：
         *      gameCount = 3 默认有3个闯关
         *      通过如下配置给每一关配置单独的一些信息
         *      即有3关：对应3组配置(用自然数开始)
         *      conf = {
         *          1:{...},
         *          2:{...},
         *          3:{...}
         *      }
         *
         *************************************** 
         *  如果conf只有1个配置,将运用到全局
         **************************************
         * @type {Object}
         */
        conf: {
            1: {
                //图片
                images: {
                    //正面图
                    front: "images/front.jpg",
                    //背景图,随机分配
                    back: ["images/back1-1.jpg", "images/back1-2.jpg", "images/back1-3.jpg"],
                    //页面背景
                    content:"images/game-content1.jpg"
                }
            },
            2: {
                //图片
                images: {
                    //正面图
                    front: "images/front.jpg",
                    //背景图,随机分配
                    back: ["images/back2-1.jpg", "images/back1-2.jpg", "images/back2-3.jpg"],
                    //页面背景
                    content:"images/game-content2.jpg"
                }
            },
            3: {
                //图片
                images: {
                    //正面图
                    front: "images/front.jpg",
                    //背景图,随机分配
                    back: ["images/back3-1.jpg", "images/back3-2.jpg", "images/back3-3.jpg"],
                    //页面背景
                    content:"images/game-content3.jpg"
                }
            }
        }
    },
    //需要预加载的图片
    //conf中的images默认已经预加载的
    //这里是额外的配置
    preloadimages: [
        "images/lottery.jpg",
        "images/winning.jpg",
        "images/game-content1.jpg",
        "images/game-content2.jpg",
        "images/game-content3.jpg"
    ]

}
