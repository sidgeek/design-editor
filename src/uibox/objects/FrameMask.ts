import { fabric } from 'fabric'

export class FrameMaskObject extends fabric.Rect {
  static type = 'FrameMask'
  initialize(options: FrameMaskOptions) {
    super.initialize({
      ...options,
      selectable: false,
      hasControls: false,
      lockMovementY: true,
      lockMovementX: true,
      strokeWidth: 0,
      padding: 0,
      opacity: 0.1,
      evented: false,
    })
    return this
  }

  toObject(propertiesToInclude: string[] = []) {
    return super.toObject(propertiesToInclude)
  }
  toJSON(propertiesToInclude: string[] = []) {
    return super.toObject(propertiesToInclude)
  }
  static fromObject(options: FrameMaskOptions) {
    return new fabric.Frame(options)
  }
}

fabric.FrameMask = fabric.util.createClass(FrameMaskObject, {
  type: FrameMaskObject.type,
})
fabric.FrameMask.fromObject = FrameMaskObject.fromObject

export interface FrameMaskOptions extends fabric.IRectOptions {
  id: string
  name: string
  description?: string
}

declare module 'fabric' {
  namespace fabric {
    class FrameMask extends FrameMaskObject {
      constructor(options: FrameMaskOptions)
    }
  }
}
