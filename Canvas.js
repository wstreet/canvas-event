import Event from './event-emitter.js'
import * as Shapes from './shape/index.js'
import { upperFirst } from './utils/index.js'

const eventList = [
  'click',
  'mousedown',
  'mouseup',
  // ...
]


class Canvas extends Event {
  defaultOpts = {}
  constructor(c) {
    super()
    this.canvas = c
    this.ctx = c.getContext('2d')

    this.children = []

    // 在canvas上监听eventList的事件
    this.initEvent()

  }


  initEvent() {
    eventList.forEach(eventName => {
      this.canvas.addEventListener(eventName, this.handleEvent)
    })
  }

  handleEvent = (event) => {

    // // shape emit event
    // this.children
    //   // TODO: 优化点，每个图形都需要判断事件发生的位置是否在自己的区域内
    //   .filter(shape => shape.isEventInRegion(event.x, event.y))
    //   .forEach(shape => shape.emit(event.type, event))

    // canvas emit event
    // this.emit(event.type, event)


    // shape emit event

    // 获取事件的当前点的信息
    // clientPoint and canvasPoint
    const pointInfo = this.getPointInfo(event);
    // 判断事件点  落在哪个图形中
    const shape = this.getShape(pointInfo.x, pointInfo.y);
    if (shape) {
      shape.emit(event.type, event)
    }
   
  }

  // 找到命中的shape
  getShape(x, y) {
    let shape = null;
    const children = this.children
    for (let i = children.length - 1; i >= 0; i--) {
      const child = children[i];
      // 具体判断方法在每个shape中实现，不同shape判断原理不同
      if (child.isHit(x, y)) {
        shape = child;
      }
      if (shape) {
        break;
      }
    }
    return shape;
  }

  getPointInfo(event) {
    const clientPoint = this.getClientByEvent(event)
    const point = this.getPointByClient(clientPoint.x, clientPoint.y)
    return {
      x: point.x,
      y: point.y,
      clientX: clientPoint.x,
      clientY: clientPoint.y,
    };
  }

  getClientByEvent(event) {
    return {
      x: event.clientX,
      y: event.clientY,
    };
  }

  // 基于canvas坐标的point
  getPointByClient(clientX, clientY) {
    const bbox = this.canvas.getBoundingClientRect();
    return {
      x: clientX - bbox.left,
      y: clientY - bbox.top,
    };
  }

  addChild(shape) {
    this.children.push(shape)
  }

  draw() {
    this.children.forEach(shape => shape.draw())
  }


  addShape(type, attrs) {
    const ShapeType = upperFirst(type)
    const Cons = Shapes[ShapeType]
    const shape = new Cons(attrs, this)
    this.addChild(shape)
    return shape
  }
}

export default Canvas