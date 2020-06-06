import Event from './Event.js'
import Rect from './Rect.js'

const eventList = [
  'click',
  'mousemove',
  // ...
]


class Canvas extends Event {
  defaultOpts = {}
  constructor(c) {
    super()
    this.canvas = c
    this.ctx = c.getContext('2d')
     
    this.children = []
    this.initEvent()
    
  }

  initEvent() {
    eventList.forEach(eventName => {
      this.canvas.addEventListener(eventName, this.handleEvent)
    })
  }

  handleEvent = (event) => {
    this.children
    .filter(shape => shape.isEventInRegion(event.x, event.y))
    .forEach(shape => shape.emit(event.type, event))
  }

  addChild(shape) {
    this.children.push(shape)
  }

  draw() {
    this.children.forEach(shape => shape.draw())
  }
  
  rect(config) {
    const rect = new Rect(config, this)
    this.addChild(rect)
    return rect
  }
}

export default Canvas