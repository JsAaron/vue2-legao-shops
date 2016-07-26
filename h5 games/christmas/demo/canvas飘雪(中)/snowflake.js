/**
 * 雪花
 * canvas版
 */
$(function() {

    var snowElement = document.getElementById("snowflake")
    var canvasContext = snowElement.getContext("2d");
    var width  = config.clientWidth;
    var height = config.clientHeight;
    //canvas尺寸修正
    snowElement.width  = width;
    snowElement.height = height;
    //构建雪球的数量
    var snowNumber = 50;

    /**
     * 雪球类
     */
    function Snow() {
        this.radius = randomInRange(3, 10);
        //初始的x位置
        this.x = (Math.random() * width);
        this.y = (Math.random() * height);
        //滤镜
        this.alpha = randomInRange(0.5,1);
        //绘制雪球
        this.render();
    }

    /**
     * 绘制雪球
     * @param  {[type]} canvasContext [description]
     * @return {[type]}               [description]
     */
    Snow.prototype.render = function() {
        //清除路径
        //开始一个画布中的一条新路径（或者子路径的一个集合）
        canvasContext.beginPath();
        //用来填充路径的当前的颜色，白色的雪球
        canvasContext.fillStyle = "rgba(255, 255, 255, " + this.alpha + ")";
        //一个中心点和半径，为一个画布的当前子路径添加一条弧线
        //坐标，圆，沿着圆指定弧的开始点和结束点的一个角度
        //弧沿着圆周的逆时针方向（TRUE）还是顺时针方向（FALSE）遍历
        canvasContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        //关闭子路径
        canvasContext.closePath();
        //fill() 方法使用 fillStyle 属性所指定的颜色、渐变和模式来填充当前路径
        canvasContext.fill();
    }


    Snow.prototype.update = function() {
        this.y += this.speedY;
        if (this.y > this.snowSettings.maxY) {
            this.y -= this.snowSettings.maxY;
        }
        this.angle += this.speedX;
        if (this.angle > Math.PI * 2) {
            this.angle -= Math.PI * 2;
        }
        this.x = this.initialX + this.moveX * Math.sin(this.angle);
    }


    /**
     * 随机处理
     * @param  {[type]} min [description]
     * @param  {[type]} max [description]
     * @return {[type]}     [description]
     */
    function randomInRange(min, max) {
        var random = Math.random() * (max - min) + min;
        return random;
    }

    //构建雪球
    for (var i = 0; i < snowNumber; ++i) {
        new Snow();
    }

})
