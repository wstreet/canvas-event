import Event from '../event-emitter.js'

class Polygon extends Event {
    constructor(opts, canvas) {
        super()
        this.canvas = canvas
        this.config = opts
    }

    // 绘制多边形方法
    draw() {
        const ctx = this.canvas.ctx
        const { points, fillStyle } = this.config
        
        if (points.length < 2) {
          return;
        }
        ctx.beginPath();
        for (let i = 0; i < points.length; i++) {
          const point = points[i];
          if (i === 0) {
            ctx.moveTo(point[0], point[1]);
          } else {
            ctx.lineTo(point[0], point[1]);
          }
        }
        ctx.closePath();
        ctx.fillStyle = fillStyle
        ctx.fill()
    }


    // 判断点是否在多边形内
    // 题目：http://acm.hdu.edu.cn/showproblem.php?pid=1756
    // 答案：https://blog.csdn.net/WilliamSun0122/article/details/77994526
    isHit(cx, cy) {
      // 射线法
    }

}

export default Polygon