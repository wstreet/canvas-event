import Event from '../event-emitter.js'

class Rect extends Event {
    constructor(opts, canvas) {
        super()
        this.canvas = canvas
        this.config = opts
    }

    // 绘制rect方法
    draw() {
        const ctx = this.canvas.ctx
        const { x, y, width, height, fillStyle } = this.config
        ctx.fillStyle = fillStyle
        ctx.fillRect(x, y, width, height)
    }

    // canvas坐标系中的x和y
    isHit(cx, cy) {
        const { x, y, width, height } = this.config
        if (
            x < cx
            && cx < x + width
            && y < cy
            && cy < y + height
        ) {
            return true
        }
        return false
    }

}

export default Rect