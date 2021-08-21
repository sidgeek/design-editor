import { fabric } from 'fabric'
import { HandlerOptions } from '../common/interfaces'
import BaseHandler from './BaseHandler'

class FrameHandler extends BaseHandler {
  constructor(props: HandlerOptions) {
    super(props)
    this.init()
  }
  init = () => {
    const frame = new fabric.Frame({
      id: 'id',
      name: 'Default Frame',
      width: 600,
      height: 400,
      fill: '#fff',
    })
    this.canvas.add(frame)
    frame.center()
  }
  get = () => {
    return this.canvas.getObjects().find(object => object.type === 'Frame')
  }
}

export default FrameHandler
