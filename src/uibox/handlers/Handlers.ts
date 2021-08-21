import { fabric } from 'fabric'
import { FabricCanvas, HandlerOptions, RootHandlerOptions } from '../common/interfaces'
import { PROPERTIES_TO_INCLUDE } from '../common/constants'
import CanvasHandler from './CanvasHandler'
import EventsHandler from './EventsHandler'
import FrameHandler from './FrameHandler'
import ObjectHandler from './ObjectsHandler'
import TransactionHandler from './TransactionHandler'
import ZoomHandler from './ZoomHandler'

class Handlers {
  public frameHandler: FrameHandler
  public eventsHandler: EventsHandler
  public canvasHandler: CanvasHandler
  public objectsHandler: ObjectHandler
  public transactionHandler: TransactionHandler
  public zoomHandler: ZoomHandler
  public canvas: FabricCanvas
  public propertiesToInclude: string[]
  constructor(props: RootHandlerOptions) {
    this.propertiesToInclude = PROPERTIES_TO_INCLUDE
    const handlerOptions: HandlerOptions = {
      root: this,
      canvas: props.canvas,
      context: props.context,
    }
    this.canvasHandler = new CanvasHandler(handlerOptions)
    this.frameHandler = new FrameHandler(handlerOptions)
    this.objectsHandler = new ObjectHandler(handlerOptions)
    this.transactionHandler = new TransactionHandler(handlerOptions)
    this.zoomHandler = new ZoomHandler(handlerOptions)
    this.eventsHandler = new EventsHandler(handlerOptions)
  }

  destroy = () => {}
}

export default Handlers
