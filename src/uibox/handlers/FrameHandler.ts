import { fabric } from 'fabric'
// import { SCALE_FACTOR, ObjectType } from '../common/constants'
import BaseHandler from './BaseHandler'
// import { loadImageFromURL } from '../utils/image-loader'
import { HandlerOptions } from '../common/interfaces'
import { FrameOptions } from '../objects'
import { FRAME_INIT_WIDTH, FRAME_INIT_HEIGHT } from '../common/constants'

function drewGrid(canvas) {
  const grid = 30
  const lineStroke = '#C5C9CB'
  for (let i = 0; i < canvas.width / grid; i++) {
    const lineX = new fabric.Line([0, i * grid, canvas.width, i * grid], {
      stroke: lineStroke,
      selectable: false,
      type: 'line',
    })
    const lineY = new fabric.Line([i * grid, 0, i * grid, canvas.width], {
      stroke: lineStroke,
      selectable: false,
      type: 'line',
    })
    canvas.add(lineX)
    canvas.add(lineY)
  }
}

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

function makeHollowRect2(startPoint, width, height) {
  const lineStroke = '#C5C9CB'
  const { x, y } = startPoint
  // L ${x} ${y + height} z
  var path = new fabric.Path(`M ${x} ${y} L ${x + width} ${y} L ${x + width} ${y + height} `)

  path.set({ fill: 'undefine', stroke: lineStroke, opacity: 0.5, evented: false, selectable: false })

  path.hasBorders = path.hasControls = false

  return path
}

function makeMaskRect(canvas) {
  return new fabric.Rect({
    width: canvas.width,
    height: canvas.height,
    name: 'Initial Frame bg',
    fill: 'yellow',
    hoverCursor: 'default',
    opacity: 0.1,
    evented: false,
  })
}

class FrameHandler extends BaseHandler {
  frame
  options
  sizeFormat
  backgroundimage

  constructor(props: HandlerOptions) {
    super(props)
    // this.options = defaultFrameOptions
    this.initialize()
  }

  initialize() {
    const maskRect = makeMaskRect(this.canvas)
    this.canvas.add(maskRect)

    const frame = new fabric.Frame({
      width: FRAME_INIT_WIDTH,
      height: FRAME_INIT_HEIGHT,
      id: '',
      name: 'Initial Frame',
      fill: '#ffffff',
      hoverCursor: 'default',
      // evented: false,
    })

    this.canvas.add(frame)
    frame.center()

    const hRect = makeHollowRect({ x: 20, y: 20 }, 600, 400)

    this.canvas.add(hRect)
    hRect.center()
    // line.center()

    // this.sizeFormat = this.context.defaultSizeFormat
    // const scaledSize = this.scaleDimension(this.sizeFormat)
    // const shadow = new fabric.Shadow({
    //   color: '#afafaf',
    //   blur: 2.5,
    // })
    // const frame = new fabric.Frame({ ...defaultFrameOptions, ...scaledSize, shadow })
    // this.canvas.add(frame)
    // frame.center()
    // this.options = Object.assign(this.options, scaledSize)
  }

  get = () => {
    return this.canvas.getObjects().find(object => object.type === 'Frame')
  }

  updateSize = (newSize: {width: number, height: number}) => {
    const frame = this.get()
    frame.set('width', newSize.width)
    frame.set('height', newSize.height)
    frame.center()
    // ? 什么作用
    // this.root.transactionHandler.save('frame:update')
  }

  update = options => {
    // this.sizeFormat = options
    // const frame = this.get()
    // const { width, height } = this.scaleDimension(this.sizeFormat)
    // this.options = Object.assign(this.options, { width, height, isPortrait: options.isPortrait })
    // frame.set('width', width)
    // frame.set('height', height)
    // frame.center()
    // this.context.setSizeFormat(options)
    // this.root.transactionHandler.save('frame:update')
    // this.root.gridHandler.draw()
  }

  setBackgroundColor = (color: string) => {
    const frame = this.get()
    frame.set('fill', color)
    this.canvas.renderAll()
  }

  setBackgroundImageURL = async url => {
    // this.removeBackgroundImage()
    // const frame = this.get()
    // const image = await loadImageFromURL(url)
    // const element = new fabric.BackgroundImage(image)
    // element.clipPath = frame
    // element.scaleToWidth(frame.width)
    // this.canvas.add(element)
    // element.center()
    // element.moveTo(1)
  }

  create = options => {
    // const shadow = new fabric.Shadow({
    //   color: '#afafaf',
    //   blur: 2.5,
    // })
    // this.sizeFormat = options
    // const scaledSize = this.scaleDimension(this.sizeFormat)
    // const frame = new fabric.Frame({ ...defaultFrameOptions, ...scaledSize, shadow })
    // this.canvas.add(frame)
    // frame.center()
    // this.options = Object.assign(this.options, scaledSize)
    // this.context.setSizeFormat(options)
  }

  getBackgroundImage = () => {
    // return this.canvas.getObjects().find(object => object.type === 'BackgroundImage')
  }

  removeBackgroundImage = () => {
    // const backgroundImage = this.getBackgroundImage()
    // if (backgroundImage) {
    //   this.canvas.remove(backgroundImage)
    // }
  }

  reset = () => {
    // const frame = this.get()
    // frame.set('fill', defaultFrameOptions.fill)
  }

  setSelectionBorder = () => {
    // const frame = this.root.frameHandler.get()
    // frame.setSelectionBorder()
  }

  getOptions = (): FrameOptions => {
    const frame = this.get()
    return frame.toJSON(this.root.propertiesToInclude)
  }

  scaleDimension = options => {
    // const { pixelHeight, pixelWidth, isPortrait } = options
    // const height = isPortrait ? pixelHeight * SCALE_FACTOR : pixelWidth * SCALE_FACTOR
    // const width = isPortrait ? pixelWidth * SCALE_FACTOR : pixelHeight * SCALE_FACTOR
    // return {
    //   height,
    //   width,
    // }
  }

  getFitRatio = () => {
    const canvasWidth = this.canvas.getWidth() - 32
    const canvasHeight = this.canvas.getHeight() - 32
    const options = this.getOptions()

    let scaleX = canvasWidth / options.width
    let scaleY = canvasHeight / options.height

    if (options.height >= options.width) {
      scaleX = scaleY
      if (canvasWidth < options.width * scaleX) {
        scaleX = scaleX * (canvasWidth / (options.width * scaleX))
      }
    } else {
      if (canvasHeight < options.height * scaleX) {
        scaleX = scaleX * (canvasHeight / (options.height * scaleX))
      }
    }
    return scaleX
  }
}

export default FrameHandler
