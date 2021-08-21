import { FabricWheelEvent, HandlerOptions } from '../common/interfaces'
import BaseHandler from './BaseHandler'
import { fabric } from 'fabric'
class EventsHandler extends BaseHandler {
  constructor(props: HandlerOptions) {
    super(props)
    this.enable()
  }

  enable = () => {
    this.canvas.on('mouse:wheel', this.onWheel)
  }

  disable = () => {
    this.canvas.off('mouse:wheel', this.onWheel)
  }

  handlePan = (event: any) => {
    const center = this.canvas.getCenter()
    console.log(center)
    const delta = event.e.deltaY
    const isShiftKey = event.e.shiftKey
    let pointX = 0
    let pointY = delta > 0 ? -30 : 30

    if (isShiftKey) {
      pointY = 0
      pointX = delta > 0 ? -30 : 30
    }
    const point = new fabric.Point(pointX, pointY)
    this.canvas.relativePan(point)
  }

  onWheel = (evt: unknown) => {}
}

export default EventsHandler
