import { fabric } from 'fabric'
import { RootHandlerOptions } from '../common/interfaces'
import { PROPERTIES_TO_INCLUDE } from '../common/constants'
import CanvasHandler from './CanvasHandler'
import EventsHandler from './EventsHandler'
import FrameHandler from './FrameHandler'

class Handlers {
  public frameHandler: FrameHandler
  public eventsHandler: EventsHandler
  public canvasHandler: CanvasHandler

  public canvas: fabric.Canvas
  public propertiesToInclude: string[]
  constructor(props: RootHandlerOptions) {
    this.propertiesToInclude = PROPERTIES_TO_INCLUDE
    const handlerOptions = {
      root: this,
      canvas: props.canvas,
      context: props.context,
    }
    this.canvasHandler = new CanvasHandler(handlerOptions)
    this.frameHandler = new FrameHandler(handlerOptions)
  }

  destroy = () => {}
}

export default Handlers
