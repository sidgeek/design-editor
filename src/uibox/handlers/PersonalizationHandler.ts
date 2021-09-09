// @ts-nocheck
import { fabric } from 'fabric'
import { HandlerOptions } from '../common/interfaces'
import BaseHandler from './BaseHandler'
import { drawCircleIcon, drawVerticalLineIcon, drawHorizontalLineIcon, drawRotateIcon } from '../utils/drawer'
import {
  FontAttrType,
  getEnglishCharAdjustRatio,
  getFontAttrType,
  getPosXFixAlgorithm,
  hasEnglishFont,
  isChinese,
} from '@common/utils/fontHelper'

class PersonalizationHandler extends BaseHandler {
  constructor(props: HandlerOptions) {
    super(props)
    this.init()
  }

  initStartTextOrStrokeVertical() {
    // @ts-ignore
    CanvasRenderingContext2D.prototype.fillTextOrStrokeVertical = function (
      text: string,
      x: number,
      y: number,
      type: 'text' | 'stroke'
    ) {
      if (type !== 'text' && type !== 'stroke') {
        console.warn(`The type ${type} is not support!`)
        return
      }

      var context = this

      var arrText = text.split('')
      var arrWidth = arrText.map(function (letter) {
        return context.measureText(letter).width
      })

      var align = context.textAlign
      var baseline = context.textBaseline

      if (align === 'left') {
        x = x + Math.max.apply(null, arrWidth) / 2
      } else if (align === 'right') {
        x = x - Math.max.apply(null, arrWidth) / 2
      }

      // 保证因为字母的y值相同
      const hasEng = hasEnglishFont(text)
      const arrW = hasEng ? context.measureText('中').width : arrWidth[0]

      if (baseline === 'bottom' || baseline === 'alphabetic' || baseline === 'ideographic') {
        y = y - arrW / 2 + 1
      } else if (baseline === 'top' || baseline === 'hanging') {
        y = y + arrW / 2 + 1
      }

      context.textAlign = 'center'
      context.textBaseline = 'middle'

      const baseW = context.measureText('中').width
      // 记录前一个字符类型,用于修复位置
      var lastFontT: FontAttrType | null = null

      //修正y坐标
      y = y + baseW * 0.15

      // 开始逐字绘制
      arrText.forEach(function (letter, index) {
        const curFontT = getFontAttrType(letter)
        const fixAlgorithm = getPosXFixAlgorithm(lastFontT, curFontT, baseW)
        const fixWidth = index === 0 ? 0 : fixAlgorithm(arrWidth[index - 1], arrWidth[index])
        x = x - fixWidth

        if (isChinese(letter)) {
          context.save()
          context.translate(x, y)
          context.rotate((-90 * Math.PI) / 180)
          context.translate(-x, -y)
        }

        // 用于调整英文字符的位置
        const AdjustEngChar = baseW * getEnglishCharAdjustRatio(letter)

        if (type === 'text') {
          if (!isChinese(letter) && curFontT === FontAttrType.ENG_CHAR) {
            context.fillText(letter, x, y - AdjustEngChar)
          } else {
            context.fillText(letter, x, y)
          }
        } else if (type === 'stroke') {
          if (isChinese(letter) && curFontT === FontAttrType.ENG_CHAR) {
            context.fillText(letter, x, y - AdjustEngChar)
          } else {
            context.strokeText(letter, x, y)
          }
        }

        // 旋转坐标系还原成初始态
        if (isChinese(letter)) {
          context.restore()
        }

        lastFontT = curFontT

        // 确定下一个字符的纵坐标位置
        var letterWidth = arrWidth[index]
        x = x + letterWidth
      })

      // 水平垂直对齐方式还原
      context.textAlign = align
      context.textBaseline = baseline
    }

    // @ts-ignore
    fabric.Textbox.prototype.isVertical = false // 添加一个是否为竖排的标志
    // @ts-ignore
    fabric.Textbox.prototype.hasChinese = false // 添加一个是否包含中文字符的标志

    fabric.Text.prototype._renderChar = function (method, ctx, lineIndex, charIndex, _char, left, top) {
      var decl = this._getStyleDeclaration(lineIndex, charIndex),
        fullDecl = this.getCompleteStyleDeclaration(lineIndex, charIndex),
        shouldFill = method === 'fillText' && fullDecl.fill,
        shouldStroke = method === 'strokeText' && fullDecl.stroke && fullDecl.strokeWidth,
        fillOffsets,
        strokeOffsets

      if (!shouldStroke && !shouldFill) {
        return
      }
      ctx.save()

      // @ts-ignore
      shouldFill && (fillOffsets = this._setFillStyles(ctx, fullDecl))
      // @ts-ignore
      shouldStroke && (strokeOffsets = this._setStrokeStyles(ctx, fullDecl))

      // @ts-ignore
      ctx.font = this._getFontDeclaration(fullDecl)

      if (decl && decl.textBackgroundColor) {
        this._removeShadow(ctx)
      }
      if (decl && decl.deltaY) {
        top += decl.deltaY
      }

      // @ts-ignore
      const isChangeAction: boolean = this.isVertical && this.hasChinese

      if (shouldFill) {
        const fillLeft = left - fillOffsets.offsetX
        const fillTop = top - fillOffsets.offsetY

        if (isChangeAction) {
          // @ts-ignore
          ctx.fillTextOrStrokeVertical(_char, fillLeft, fillTop, 'text')
        } else {
          ctx.fillText(_char, fillLeft, fillTop)
        }
      }

      if (shouldStroke) {
        const strokeLeft = left - strokeOffsets.offsetX
        const strokeTop = top - strokeOffsets.offsetY

        if (isChangeAction) {
          // @ts-ignore
          ctx.fillTextOrStrokeVertical(_char, strokeLeft, strokeTop, 'stroke')
        } else {
          ctx.strokeText(_char, strokeLeft, strokeTop)
        }
      }

      ctx.restore()
    }
  }

  init() {
    this.initStartTextOrStrokeVertical()

    fabric.Object.prototype.transparentCorners = false
    fabric.Object.prototype.cornerColor = '#20bf6b'
    fabric.Object.prototype.cornerStyle = 'circle'
    fabric.Object.prototype.borderColor = '#7f66f1'
    fabric.Object.prototype.cornerSize = 12
    fabric.Object.prototype.borderScaleFactor = 2.4
    fabric.Object.prototype.borderOpacityWhenMoving = 0

    fabric.Object.prototype.controls.tr = new fabric.Control({
      x: 0.5,
      y: -0.5,
      actionHandler: fabric.controlsUtils.scalingEqually,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionName: fabric.controlsUtils.scaleOrSkewActionName,
      render: drawCircleIcon,
      cornerSize: 28,
      withConnection: true,
    })

    fabric.Object.prototype.controls.tl = new fabric.Control({
      x: -0.5,
      y: -0.5,
      actionHandler: fabric.controlsUtils.scalingEqually,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionName: fabric.controlsUtils.scaleOrSkewActionName,
      render: drawCircleIcon,
      cornerSize: 28,
      withConnection: true,
    })

    fabric.Object.prototype.controls.bl = new fabric.Control({
      x: -0.5,
      y: 0.5,
      actionHandler: fabric.controlsUtils.scalingEqually,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionName: fabric.controlsUtils.scaleOrSkewActionName,
      render: drawCircleIcon,
      cornerSize: 28,
      withConnection: true,
    })

    fabric.Object.prototype.controls.br = new fabric.Control({
      x: 0.5,
      y: 0.5,
      actionHandler: fabric.controlsUtils.scalingEqually,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionName: fabric.controlsUtils.scaleOrSkewActionName,
      render: drawCircleIcon,
      cornerSize: 28,
      withConnection: true,
    })

    fabric.Object.prototype.controls.ml = new fabric.Control({
      x: -0.5,
      y: 0,
      actionHandler: fabric.controlsUtils.scalingXOrSkewingY,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionName: fabric.controlsUtils.scaleOrSkewActionName,
      render: drawVerticalLineIcon,
      cornerSize: 28,
      withConnection: true,
    })

    fabric.Object.prototype.controls.mt = new fabric.Control({
      x: 0,
      y: -0.5,
      actionHandler: fabric.controlsUtils.scalingYOrSkewingX,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionName: fabric.controlsUtils.scaleOrSkewActionName,
      render: drawHorizontalLineIcon,
      cornerSize: 28,
      withConnection: true,
    })

    fabric.Object.prototype.controls.mb = new fabric.Control({
      x: 0,
      y: 0.5,
      actionHandler: fabric.controlsUtils.scalingYOrSkewingX,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionName: fabric.controlsUtils.scaleOrSkewActionName,
      render: drawHorizontalLineIcon,
      cornerSize: 28,
      withConnection: true,
    })

    fabric.Object.prototype.controls.mr = new fabric.Control({
      x: 0.5,
      y: 0,
      actionHandler: fabric.controlsUtils.scalingXOrSkewingY,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionName: fabric.controlsUtils.scaleOrSkewActionName,
      render: drawVerticalLineIcon,
      cornerSize: 28,
      withConnection: true,
    })

    fabric.Object.prototype.controls.mtr = new fabric.Control({
      x: 0,
      y: -0.5,
      offsetY: -40,
      actionHandler: fabric.controlsUtils.rotationWithSnapping,
      cursorStyleHandler: fabric.controlsUtils.rotationStyleHandler,
      actionName: 'rotate',
      render: drawRotateIcon,
      cornerSize: 28,
      withConnection: false,
    })

    // Texbox controls
    fabric.Textbox.prototype.controls.tr = fabric.Object.prototype.controls.tr
    fabric.Textbox.prototype.controls.tl = fabric.Object.prototype.controls.tl
    fabric.Textbox.prototype.controls.bl = fabric.Object.prototype.controls.bl
    fabric.Textbox.prototype.controls.br = fabric.Object.prototype.controls.br

    fabric.Textbox.prototype.controls.mt = new fabric.Control({
      render: () => false,
    })

    fabric.Textbox.prototype.controls.mb = fabric.Textbox.prototype.controls.mt

    fabric.Textbox.prototype.controls.mr = new fabric.Control({
      x: 0.5,
      y: 0,
      actionHandler: fabric.controlsUtils.changeWidth,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionName: 'resizing',
      render: drawVerticalLineIcon,
      cornerSize: 28,
      withConnection: true,
    })

    fabric.Textbox.prototype.controls.ml = new fabric.Control({
      x: -0.5,
      y: 0,
      actionHandler: fabric.controlsUtils.changeWidth,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionName: 'resizing',
      render: drawVerticalLineIcon,
      cornerSize: 28,
      withConnection: true,
    })

    fabric.Textbox.prototype.controls.mtr = new fabric.Control({
      x: 0,
      y: -0.5,
      offsetY: -40,
      actionHandler: fabric.controlsUtils.rotationWithSnapping,
      cursorStyleHandler: fabric.controlsUtils.rotationStyleHandler,
      actionName: 'rotate',
      render: drawRotateIcon,
      cornerSize: 28,
      withConnection: false,
    })

    this.canvas.selectionColor = 'rgba(46, 204, 113, 0.15)'
    this.canvas.selectionBorderColor = 'rgb(39, 174, 96)'
    this.canvas.selectionLineWidth = 0.4
    this.canvas.on('selection:created', ev => {
      const objects = this.canvas.getActiveObjects()
      if (objects.length > 1) {
        ev.target.setControlsVisibility({
          mt: false,
          mb: false,
          mr: false,
          ml: false,
        })
        ev.target.borderDashArray = [7]
      }
    })
    this.canvas.on('mouse:over', event => {
      const target = event.target
      const activeObjects = this.canvas.getActiveObject()
      if (target && activeObjects !== target) {
        const bound = target.getBoundingRect()
        const ctx = this.canvas.getContext()
        ctx.strokeStyle = '#7f66f1'
        ctx.lineWidth = 2.75
        ctx.strokeRect(bound.left, bound.top, bound.width, bound.height)
      }
    })
  }
}

export default PersonalizationHandler
