import { fabric } from 'fabric'

export class FrameBorderObject extends fabric.Rect {
  static type = 'FrameBorder'
  initialize(options: FrameBorderOptions) {
    super.initialize({
      ...options,
      selectable: false,
      hasControls: false,
      lockMovementY: true,
      lockMovementX: true,
      strokeWidth: 0,
      padding: 0,
    })
    return this
  }

  toObject(propertiesToInclude: string[] = []) {
    return super.toObject(propertiesToInclude)
  }
  toJSON(propertiesToInclude: string[] = []) {
    return super.toObject(propertiesToInclude)
  }
  static fromObject(options: FrameBorderOptions) {
    return new fabric.Frame(options)
  }
}

fabric.FrameBorder = fabric.util.createClass(FrameBorderObject, {
  type: FrameBorderObject.type,
})
fabric.FrameBorder.fromObject = FrameBorderObject.fromObject

export interface FrameBorderOptions extends fabric.IRectOptions {
  id: string
  name: string
  description?: string
}

declare module 'fabric' {
  namespace fabric {
    class FrameBorder extends FrameBorderObject {
      constructor(options: FrameBorderOptions)
    }
  }
}
