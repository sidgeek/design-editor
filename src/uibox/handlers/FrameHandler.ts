import { fabric } from 'fabric'
// import { SCALE_FACTOR, ObjectType } from '../common/constants'
import BaseHandler from './BaseHandler'
// import { loadImageFromURL } from '../utils/image-loader'
import { HandlerOptions } from '../common/interfaces'
import { FrameOptions } from '../objects'
import { FRAME_INIT_WIDTH, FRAME_INIT_HEIGHT, FRAME_BORDER_STROKE_WIDTH } from '../common/constants'
import ladybugImage from '@assets/images/ladybug.png'
import bg2Image from '@assets/images/bg2.png'

// const backImage = demoImage

function makeFrameBorder(width, height) {
  const lineStroke = 'black'
  const x = 0,
    y = 0
  const xEnd = x + width
  const yEnd = y + height

  const lineConfig = {
    stroke: lineStroke,
    type: 'line',
    strokeWidth: FRAME_BORDER_STROKE_WIDTH,
    strokeDashArray: [5, 5],
  }

  const groupConfig = {
    evented: false,
    selectable: false,
    name: 'FrameBorder',
    index: 999,
  }
  const lineXTop = new fabric.Line([x, y, xEnd, y], lineConfig)
  const lineXBottom = new fabric.Line([x, yEnd, xEnd, yEnd], lineConfig)
  const lineYLeft = new fabric.Line([x, y, x, yEnd], lineConfig)
  const lineYRight = new fabric.Line([xEnd, y, xEnd, yEnd], lineConfig)

  var group = new fabric.Group([lineXTop, lineXBottom, lineYLeft, lineYRight], groupConfig)

  return group
}

const rectStr = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg">
  <rect width="3000" height="3000"
  style="fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)"/>
</svg>`

// fabric.Object.prototype.objectCaching = false

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
    // load frameMask
    // const frameMask = new fabric.FrameMask({
    //   width: this.canvas.width,
    //   height: this.canvas.height,
    //   id: 'frameMask',
    //   name: 'Initial Frame Mask',
    //   fill: 'yellow',
    //   hoverCursor: 'default',
    // })
    // this.canvas.add(frameMask)

    // load frame
    const frame = new fabric.Frame({
      width: FRAME_INIT_WIDTH,
      height: FRAME_INIT_HEIGHT,
      id: '',
      name: 'Initial Frame',
      fill: '#ffffff',
      hoverCursor: 'default',
    })
    this.canvas.add(frame)
    frame.center()

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

  getMask = () => {
    return this.canvas.getObjects().find(object => object.type === 'FrameMask')
  }

  get = () => {
    return this.canvas.getObjects().find(object => object.type === 'Frame')
  }

  getBorder = () => {
    return this.canvas.getObjects().find(object => object.name === 'FrameBorder')
  }

  updateSize = (newSize: { width: number; height: number }) => {
    const frame = this.get()
    frame.set('width', newSize.width)
    frame.set('height', newSize.height)
    frame.center()
    // ? 什么作用
    // this.root.transactionHandler.save('frame:update')
  }

  addFrameBorder = (newSize: { width: number; height: number }) => {
    const frameBorder = makeFrameBorder(newSize.width, newSize.height)
    this.canvas.add(frameBorder)
    frameBorder.center()

    var center = this.canvas.getCenter()

    var clipPath = new fabric.Group(
      [
        new fabric.Rect({ width: 500, height: 1000, left: -1500 }),
        new fabric.Rect({ width: 500, height: 1000, left: 1000 }),
      ],
      // { left: center.left, top: center.top }
    )


    let self = this

    fabric.loadSVGFromString(rectStr, function (objects, options) {
      // Group elements to fabric.PathGroup (more than 1 elements) or
      // to fabric.Path
      var loadedObject = fabric.util.groupSVGElements(objects, options)
      // self.canvas.add(loadedObject)
      // loadedObject.center().setCoords()

      self.canvas.setOverlayImage(loadedObject as any, self.canvas.renderAll.bind(self.canvas), {
        clipPath,
        top: center.top,
        left: center.left,
        originX: 'center',
        originY: 'center',
      })

      // self.canvas.renderAll()
    })

    // this.canvas.setOverlayImage(backImage, this.canvas.renderAll.bind(this.canvas), {
    //   // clipPath,
    //   width: 5000,
    //   height: 5000,
    //   // top: center.top,
    //   // left: center.left,
    //   // originX: 'center',
    //   // originY: 'center',
    // })

    // this.canvas.add(
    //   new fabric.FrameBorder({
    //     width: 500,
    //     height: 500,
    //     id: '',
    //     name: 'any',
    //     stroke: '#333',
    //     strokeWidth: 40,
    //   })
    // )
  }

  updateMaskSize = (newSize: { width: number; height: number }) => {
    // const frameMask = this.getMask()
    // frameMask.set('width', newSize.width)
    // frameMask.set('height', newSize.height)
    // frameMask.center()
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
