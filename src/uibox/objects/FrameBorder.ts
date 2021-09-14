import { fabric } from 'fabric'

function makeHollowRect(startPoint, width, height) {
  const lineStroke = 'black'
  const { x, y } = startPoint
  const xEnd = x + width
  const yEnd = y + height

  const lineConfig = {
    stroke: lineStroke,
    type: 'line',
    strokeDashArray: [5, 5],
  }

  const groupConfig = {
    evented: false,
    selectable: false,
  }
  const lineXTop = new fabric.Line([x, y, xEnd, y], lineConfig)
  const lineXBottom = new fabric.Line([x, yEnd, xEnd, yEnd], lineConfig)
  const lineYLeft = new fabric.Line([x, y, x, yEnd], lineConfig)
  const lineYRight = new fabric.Line([xEnd, y, xEnd, yEnd], lineConfig)

  var group = new fabric.Group([lineXTop, lineXBottom, lineYLeft, lineYRight], groupConfig)

  return group
}

export class FrameBorderObject extends fabric.Object {
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
  _render(ctx) {

    const hRect = makeHollowRect({ x: 0, y: 0 }, 600, 400)
    // console.log('>>> render ...', ctx)
    // console.log('>>> render ...', this.width, this.height)
    // this.callSuper('_render', ctx)
    // ctx.font = '20px Helvetica'
    // ctx.fillStyle = '#333'
    // ctx.fillText(this.get('label'), -this.width / 2 + 5, -this.height / 2 + 20)
  },
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
