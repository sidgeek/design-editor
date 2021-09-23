import { useEffect } from 'react'
import { fabric } from 'fabric'
import { ILineOptions } from 'fabric/fabric-impl'
import { useEditorContext } from '.'
import { useGetCanvasOperator } from '@common/hooks/useCanvasOperator'

function useGuidelinesHandler() {
  const { canvas } = useEditorContext()
  const { getWorkAreaOptions } = useGetCanvasOperator()

  useEffect(() => {
    if (canvas) {
      let ctx = canvas.getSelectionContext(),
        aligningLineOffset = 5,
        aligningLineMargin = 4,
        aligningLineWidth = 1,
        aligningLineColor = 'rgba(255, 121, 121,1.0)',
        viewportTransform = canvas.viewportTransform,
        zoom = 1

      const getBaseParam = () => {
        const baseOption = getWorkAreaOptions()
        return {
          w: baseOption.width,
          h: baseOption.height,
          tF: baseOption.top,
          lF: baseOption.left,
        }
      }

      const drawVerticalLine = (coords: ILineOptions) => {
        const [cX1, cY1, cY2] = [coords.x1! + 0.5, coords.y1!, coords.y2!]
        const [y1, y2] = cY1 > cY2 ? [cY2, cY1] : [cY1, cY2]

        const baseParam = getBaseParam()
        const { lF, tF } = baseParam

        const FixNum = 0
        const cX1F = cX1.toFixed(FixNum)
        const cY1F = cY1.toFixed(FixNum)
        const cY2F = cY2.toFixed(FixNum)
        console.log(`>>>> draw vertical (${cX1F}, ${cY1F}) -> (${cX1F}, ${cY2F})`)

        const x1 = cX1 + lF

        // console.log('>>>> old x', cX1)
        drawLine(x1, y1 - tF, x1, y2 - tF, true)
      }

      const drawHorizontalLine = (coords: ILineOptions) => {
        // const [cX1, cX2, cY1] = [coords.x1!, coords.x2!, coords.y2! + 0.5]
        // const [x1, x2] = cX1 > cX2 ? [cX2, cX1] : [cX1, cX2]
        // const baseParam = getBaseParam()
        // const change = baseParam.l
        // drawLine(x1 - change, cY1, x2 - change, cY1, false)
      }

      const drawLine = (x1: number, y1: number, x2: number, y2: number, isVertical: boolean) => {
        // console.log('>>> dl:', y1.toFixed(2), y2.toFixed(2), (y2 - y1).toFixed(2))
        // console.log('>>> dl:', viewportTransform[4].toFixed(2), viewportTransform[5].toFixed(2))
        // console.log('>>> x1:', x1, x2)
        // console.log('>>> dl:', y1.toFixed(2), y2.toFixed(2), (y2 - y1).toFixed(2), viewportTransform[5])
        const [tY1, tY2] = [y1 * zoom, y2 * zoom]
        // const [tX1, tx2] = [x1 * zoom, x2 * zoom]
        const [tX1, tx2] = [x1, x2]
        // const [tY1, tY2] = [(y1 + viewportTransform[5]) * zoom, (y2 + viewportTransform[5]) * zoom]
        // console.log('>>> ty:', tY1.toFixed(2), tY2.toFixed(2), (tY2 - tY1).toFixed(2))

        ctx.save()
        ctx.lineWidth = aligningLineWidth
        ctx.strokeStyle = aligningLineColor
        ctx.beginPath()
        if (viewportTransform) {
          if (isVertical) {
            ctx.moveTo(tX1, tY1)
            ctx.lineTo(tx2, tY2)
          } else {
            ctx.moveTo((x1 + viewportTransform[4]) * zoom, (y1 + viewportTransform[5]) * zoom)
            ctx.lineTo((x2 + viewportTransform[4]) * zoom, (y2 + viewportTransform[5]) * zoom)
          }
        }
        ctx.stroke()
        ctx.restore()
      }

      const isInRange = (value1: number, value2: number) => {
        value1 = Math.round(value1)
        value2 = Math.round(value2)
        for (let i = value1 - aligningLineMargin, len = value1 + aligningLineMargin; i <= len; i++) {
          if (i === value2) {
            return true
          }
        }
        return false
      }

      let verticalLines: ILineOptions[] = [],
        horizontalLines: ILineOptions[] = []

      canvas.on('mouse:down', function () {
        // console.log(">>>> down");
        viewportTransform = canvas.viewportTransform
        zoom = canvas.getZoom()
      })

      canvas.on('object:moving', function (e) {
        // console.log(">>>> moving");

        let activeObject = e.target
        if (!activeObject || !viewportTransform) return

        let canvasObjects = canvas.getObjects()
        let activeObjectCenter = activeObject.getCenterPoint(),
          activeObjectLeft = activeObjectCenter.x,
          activeObjectTop = activeObjectCenter.y,
          activeObjectBoundingRect = activeObject.getBoundingRect(),
          activeObjectHeight = activeObjectBoundingRect.height / viewportTransform[3],
          activeObjectWidth = activeObjectBoundingRect.width / viewportTransform[0],
          horizontalInTheRange = false,
          verticalInTheRange = false,
          transform = canvas.viewportTransform

        if (!transform) return

        // It should be trivial to DRY this up by encapsulating (repeating) creation of x1, x2, y1, and y2 into functions,
        // but we're not doing it here for perf. reasons -- as this a function that's invoked on every mouse move

        for (let i = canvasObjects.length; i--; ) {
          if (canvasObjects[i] === activeObject) continue

          let objectCenter = canvasObjects[i].getCenterPoint(),
            objectLeft = objectCenter.x,
            objectTop = objectCenter.y,
            objectBoundingRect = canvasObjects[i].getBoundingRect(),
            objectHeight = objectBoundingRect.height / viewportTransform[3],
            objectWidth = objectBoundingRect.width / viewportTransform[0]

          // snap by the horizontal center line
          if (isInRange(objectLeft, activeObjectLeft)) {
            verticalInTheRange = true
            const x1 = objectLeft

            const y1 =
              objectTop < activeObjectTop
                ? objectTop - objectHeight / 2 - aligningLineOffset
                : objectTop + objectHeight / 2 + aligningLineOffset
            const y2 =
              activeObjectTop > objectTop
                ? activeObjectTop + activeObjectHeight / 2 + aligningLineOffset
                : activeObjectTop - activeObjectHeight / 2 - aligningLineOffset

            verticalLines.push({ x1, y1, y2 })

            activeObject.setPositionByOrigin(
              new fabric.Point(objectLeft, activeObjectTop),
              'center',
              'center'
            )
          }

          // // snap by the left edge
          // if (isInRange(objectLeft - objectWidth / 2, activeObjectLeft - activeObjectWidth / 2)) {
          //   verticalInTheRange = true
          //   verticalLines.push({
          //     x1: objectLeft - objectWidth / 2,
          //     y1:
          //       objectTop < activeObjectTop
          //         ? objectTop - objectHeight / 2 - aligningLineOffset
          //         : objectTop + objectHeight / 2 + aligningLineOffset,
          //     y2:
          //       activeObjectTop > objectTop
          //         ? activeObjectTop + activeObjectHeight / 2 + aligningLineOffset
          //         : activeObjectTop - activeObjectHeight / 2 - aligningLineOffset,
          //   })
          //   activeObject.setPositionByOrigin(
          //     new fabric.Point(objectLeft - objectWidth / 2 + activeObjectWidth / 2, activeObjectTop),
          //     'center',
          //     'center'
          //   )
          // }

          // // snap by the right edge
          // if (isInRange(objectLeft + objectWidth / 2, activeObjectLeft + activeObjectWidth / 2)) {
          //   verticalInTheRange = true
          //   verticalLines.push({
          //     x1: objectLeft + objectWidth / 2,
          //     y1:
          //       objectTop < activeObjectTop
          //         ? objectTop - objectHeight / 2 - aligningLineOffset
          //         : objectTop + objectHeight / 2 + aligningLineOffset,
          //     y2:
          //       activeObjectTop > objectTop
          //         ? activeObjectTop + activeObjectHeight / 2 + aligningLineOffset
          //         : activeObjectTop - activeObjectHeight / 2 - aligningLineOffset,
          //   })
          //   activeObject.setPositionByOrigin(
          //     new fabric.Point(objectLeft + objectWidth / 2 - activeObjectWidth / 2, activeObjectTop),
          //     'center',
          //     'center'
          //   )
          // }

          // // snap by the vertical center line
          // if (isInRange(objectTop, activeObjectTop)) {
          //   horizontalInTheRange = true
          //   horizontalLines.push({
          //     y1: objectTop,
          //     x1:
          //       objectLeft < activeObjectLeft
          //         ? objectLeft - objectWidth / 2 - aligningLineOffset
          //         : objectLeft + objectWidth / 2 + aligningLineOffset,
          //     x2:
          //       activeObjectLeft > objectLeft
          //         ? activeObjectLeft + activeObjectWidth / 2 + aligningLineOffset
          //         : activeObjectLeft - activeObjectWidth / 2 - aligningLineOffset,
          //   })
          //   activeObject.setPositionByOrigin(
          //     new fabric.Point(activeObjectLeft, objectTop),
          //     'center',
          //     'center'
          //   )
          // }

          // // snap by the top edge
          // if (isInRange(objectTop - objectHeight / 2, activeObjectTop - activeObjectHeight / 2)) {
          //   horizontalInTheRange = true
          //   horizontalLines.push({
          //     y1: objectTop - objectHeight / 2,
          //     x1:
          //       objectLeft < activeObjectLeft
          //         ? objectLeft - objectWidth / 2 - aligningLineOffset
          //         : objectLeft + objectWidth / 2 + aligningLineOffset,
          //     x2:
          //       activeObjectLeft > objectLeft
          //         ? activeObjectLeft + activeObjectWidth / 2 + aligningLineOffset
          //         : activeObjectLeft - activeObjectWidth / 2 - aligningLineOffset,
          //   })
          //   activeObject.setPositionByOrigin(
          //     new fabric.Point(activeObjectLeft, objectTop - objectHeight / 2 + activeObjectHeight / 2),
          //     'center',
          //     'center'
          //   )
          // }

          // // snap by the bottom edge
          // if (isInRange(objectTop + objectHeight / 2, activeObjectTop + activeObjectHeight / 2)) {
          //   horizontalInTheRange = true
          //   horizontalLines.push({
          //     y1: objectTop + objectHeight / 2,
          //     x1:
          //       objectLeft < activeObjectLeft
          //         ? objectLeft - objectWidth / 2 - aligningLineOffset
          //         : objectLeft + objectWidth / 2 + aligningLineOffset,
          //     x2:
          //       activeObjectLeft > objectLeft
          //         ? activeObjectLeft + activeObjectWidth / 2 + aligningLineOffset
          //         : activeObjectLeft - activeObjectWidth / 2 - aligningLineOffset,
          //   })
          //   activeObject.setPositionByOrigin(
          //     new fabric.Point(activeObjectLeft, objectTop + objectHeight / 2 - activeObjectHeight / 2),
          //     'center',
          //     'center'
          //   )
          // }
        }

        if (!horizontalInTheRange) {
          horizontalLines.length = 0
        }

        if (!verticalInTheRange) {
          verticalLines.length = 0
        }
      })

      canvas.on('before:render', function () {
        // console.log(">>>> before render");
        canvas.clearContext(ctx)
      })

      canvas.on('after:render', function () {
        for (let i = verticalLines.length; i--; ) {
          drawVerticalLine(verticalLines[i])
        }
        for (let i = horizontalLines.length; i--; ) {
          drawHorizontalLine(horizontalLines[i])
        }

        verticalLines.length = horizontalLines.length = 0
      })

      canvas.on('mouse:up', function () {
        verticalLines.length = horizontalLines.length = 0
        canvas.renderAll()
      })
    }
  }, [canvas, getWorkAreaOptions])
}

export default useGuidelinesHandler
