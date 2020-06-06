import Event from './Event.js'

class Rect extends Event {
    constructor(opts, canvas) {
        super()
        this.canvas = canvas
        this.config = opts
    }

    draw() {
        const ctx = this.canvas.ctx
        const { x, y, width, height, fillStyle } = this.config
        ctx.fillStyle = fillStyle
        ctx.fillRect(x, y, width, height)
    }

    isEventInRegion(clientX, clientY) {
        const point = this.getEventPosition(clientX, clientY);
        const { x, y, width, height } = this.config
        if (
            x < point.x 
            && point.x < x + width 
            && y < point.y 
            && point.y < y + height
            ) {
            return true
        }
        return false
    }

    getEventPosition(clientX, clientY) {
        const bbox = this.canvas.canvas.getBoundingClientRect();
        return {
            x: clientX - bbox.left,
            y: clientY - bbox.top
        }
    }

}

export default Rect