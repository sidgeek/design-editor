import { fabric } from 'fabric'
import { RootHandlerOptions } from '../common/interfaces'
import CanvasHandler from './CanvasHandler'
import EventsHandler from './EventsHandler'
import FrameHandler from './FrameHandler'

class Handlers {
  public frameHandler: FrameHandler
  public eventsHandler: EventsHandler
  public canvasHandler: CanvasHandler

  public canvas: fabric.Canvas

  constructor(props: RootHandlerOptions) {
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
