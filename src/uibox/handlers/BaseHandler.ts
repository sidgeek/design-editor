import { HandlerOptions } from '../common/interfaces'
import Handlers from '.'

class BaseHandler {
  public canvas: fabric.Canvas
  public root: Handlers
  constructor({ canvas, root }: HandlerOptions) {
    this.canvas = canvas
    this.root = root
  }
}
export default BaseHandler
