import { IEditorContext } from '../context/editor'
import Handlers from '../handlers'

export interface FabricWheelEvent {
  e: WheelEvent
  target?: Object | undefined
  subTargets?: Object[] | undefined
  button?: number | undefined
  isClick?: boolean | undefined
  pointer?: fabric.IPoint | undefined
  absolutePointer?: fabric.IPoint | undefined
  transform?:
    | {
        corner: string
        original: Object
        originX: string
        originY: string
        width: number
      }
    | undefined
}

export interface HandlerOptions {
  root: Handlers
  context: IEditorContext
  canvas: fabric.Canvas
}

export interface RootHandlerOptions {
  context: IEditorContext
  canvas: fabric.Canvas
}

export interface EditorOptions {
  id: string
  context: any
}

export interface CanvasOptions {
  width: number
  height: number
}
