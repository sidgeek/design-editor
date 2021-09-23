import { useEffect } from 'react'
import { fabric } from 'fabric'
import { ILineOptions } from 'fabric/fabric-impl'
import { useEditorContext } from '.'
import { useGetCanvasOperator } from '@common/hooks/useCanvasOperator'

export const drawObjectBorderFrame = (canvas, item) => {
  const bound = item.getBoundingRect()
  const ctx = canvas.getContext()
  ctx.strokeStyle = '#34D8FF'
  ctx.lineWidth = 1.5
  ctx.strokeRect(bound.left, bound.top, bound.width, bound.height)
}

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
          tF: baseOption.top,
          lF: baseOption.left,
        }
      }

      const drawVerticalLine = (coords: ILineOptions) => {
        const [cX1, cY1, cY2] = [coords.x1! - 50, coords.y1!, coords.y2!]
        const [y1, y2] = cY1 > cY2 ? [cY2, cY1] : [cY1, cY2]
        const x1 = cX1

        const { lF, tF } = getBaseParam()

        const x1F = Math.floor(x1 - lF)
        const y1F = Math.floor(y1 - tF)
        const y2F = Math.floor(y2 - tF)
        console.log(`>> draw v (${x1F}, ${y1F}) -> (${x1F}, ${y2F}) ${tF} ${lF}`)

        drawLine(x1F, y1F, x1F, y2F, true)
      }

      const drawHorizontalLine = (coords: ILineOptions) => {
        const [cX1, cX2, cY1] = [coords.x1!, coords.x2!, coords.y1! + 50]
        const [x1, x2] = cX1 > cX2 ? [cX2, cX1] : [cX1, cX2]
        const y1 = cY1

        const { lF, tF } = getBaseParam()

        const x1F = Math.floor(x1 - lF)
        const x2F = Math.floor(x2 - lF)
        const y1F = Math.floor(y1 - tF)

        console.log(`>> draw h (${x1F}, ${y1F}) -> (${x2F}, ${y1F}) ${tF} ${lF}`)

        drawLine(x1F, y1F, x2F, y1F, false)
      }

      const drawLine = (x1: number, y1: number, x2: number, y2: number, isVertical: boolean) => {
        ctx.save()
        ctx.lineWidth = aligningLineWidth
        ctx.strokeStyle = aligningLineColor
        ctx.beginPath()
        if (viewportTransform) {
          if (isVertical) {
            const vM = 0
            const hM = viewportTransform[5]
            const [rX1, rY1] = [(x1 + hM) * zoom, (y1 + vM) * zoom]
            const [rX2, rY2] = [(x2 + hM) * zoom, (y2 + vM) * zoom]

            ctx.moveTo(rX1, rY1)
            ctx.lineTo(rX2, rY2)
          } else {
            const vM = 0
            const hM = viewportTransform[5]
            const [rX1, rY1] = [(x1 + hM) * zoom, (y1 + vM) * zoom]
            const [rX2, rY2] = [(x2 + hM) * zoom, (y2 + vM) * zoom]

            ctx.moveTo(rX1, rY1)
            ctx.lineTo(rX2, rY2)
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
        horizontalLines: ILineOptions[] = [],
        verticalObject: Map<number, fabric.Object> = new Map(),
        horizontalObject: Map<number, fabric.Object> = new Map()
      // horizontalObj = new Map()

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
          const item = canvasObjects[i]
          console.log('>>>> item:', item)
          if (item === activeObject) continue

          let objectCenter = item.getCenterPoint(),
            objectLeft = objectCenter.x,
            objectTop = objectCenter.y,
            objectBoundingRect = item.getBoundingRect(),
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
            if (!verticalObject.has(i)) {
              verticalObject.set(i, item)
            }
            // console.log('>>> vLines:', x1, y1.toFixed(0), y2.toFixed(0))

            activeObject.setPositionByOrigin(
              new fabric.Point(objectLeft, activeObjectTop),
              'center',
              'center'
            )
          }

          // snap by the left edge
          if (isInRange(objectLeft - objectWidth / 2, activeObjectLeft - activeObjectWidth / 2)) {
            verticalInTheRange = true
            verticalLines.push({
              x1: objectLeft - objectWidth / 2,
              y1:
                objectTop < activeObjectTop
                  ? objectTop - objectHeight / 2 - aligningLineOffset
                  : objectTop + objectHeight / 2 + aligningLineOffset,
              y2:
                activeObjectTop > objectTop
                  ? activeObjectTop + activeObjectHeight / 2 + aligningLineOffset
                  : activeObjectTop - activeObjectHeight / 2 - aligningLineOffset,
            })

            if (!verticalObject.has(i)) {
              verticalObject.set(i, item)
            }

            activeObject.setPositionByOrigin(
              new fabric.Point(objectLeft - objectWidth / 2 + activeObjectWidth / 2, activeObjectTop),
              'center',
              'center'
            )
          }

          // snap by the right edge
          if (isInRange(objectLeft + objectWidth / 2, activeObjectLeft + activeObjectWidth / 2)) {
            verticalInTheRange = true
            verticalLines.push({
              x1: objectLeft + objectWidth / 2,
              y1:
                objectTop < activeObjectTop
                  ? objectTop - objectHeight / 2 - aligningLineOffset
                  : objectTop + objectHeight / 2 + aligningLineOffset,
              y2:
                activeObjectTop > objectTop
                  ? activeObjectTop + activeObjectHeight / 2 + aligningLineOffset
                  : activeObjectTop - activeObjectHeight / 2 - aligningLineOffset,
            })

            if (!verticalObject.has(i)) {
              verticalObject.set(i, item)
            }

            activeObject.setPositionByOrigin(
              new fabric.Point(objectLeft + objectWidth / 2 - activeObjectWidth / 2, activeObjectTop),
              'center',
              'center'
            )
          }

          // snap by the vertical center line
          if (isInRange(objectTop, activeObjectTop)) {
            horizontalInTheRange = true
            const y1 = objectTop
            const x1 =
              objectLeft < activeObjectLeft
                ? objectLeft - objectWidth / 2 - aligningLineOffset
                : objectLeft + objectWidth / 2 + aligningLineOffset
            const x2 =
              activeObjectLeft > objectLeft
                ? activeObjectLeft + activeObjectWidth / 2 + aligningLineOffset
                : activeObjectLeft - activeObjectWidth / 2 - aligningLineOffset
            horizontalLines.push({ y1, x1, x2 })

            if (!horizontalObject.has(i)) {
              horizontalObject.set(i, item)
            }

            activeObject.setPositionByOrigin(
              new fabric.Point(activeObjectLeft, objectTop),
              'center',
              'center'
            )
          }

          // snap by the top edge
          if (isInRange(objectTop - objectHeight / 2, activeObjectTop - activeObjectHeight / 2)) {
            horizontalInTheRange = true
            horizontalLines.push({
              y1: objectTop - objectHeight / 2,
              x1:
                objectLeft < activeObjectLeft
                  ? objectLeft - objectWidth / 2 - aligningLineOffset
                  : objectLeft + objectWidth / 2 + aligningLineOffset,
              x2:
                activeObjectLeft > objectLeft
                  ? activeObjectLeft + activeObjectWidth / 2 + aligningLineOffset
                  : activeObjectLeft - activeObjectWidth / 2 - aligningLineOffset,
            })

            if (!horizontalObject.has(i)) {
              horizontalObject.set(i, item)
            }

            activeObject.setPositionByOrigin(
              new fabric.Point(activeObjectLeft, objectTop - objectHeight / 2 + activeObjectHeight / 2),
              'center',
              'center'
            )
          }

          // snap by the bottom edge
          if (isInRange(objectTop + objectHeight / 2, activeObjectTop + activeObjectHeight / 2)) {
            horizontalInTheRange = true
            horizontalLines.push({
              y1: objectTop + objectHeight / 2,
              x1:
                objectLeft < activeObjectLeft
                  ? objectLeft - objectWidth / 2 - aligningLineOffset
                  : objectLeft + objectWidth / 2 + aligningLineOffset,
              x2:
                activeObjectLeft > objectLeft
                  ? activeObjectLeft + activeObjectWidth / 2 + aligningLineOffset
                  : activeObjectLeft - activeObjectWidth / 2 - aligningLineOffset,
            })

            if (!horizontalObject.has(i)) {
              horizontalObject.set(i, item)
            }

            activeObject.setPositionByOrigin(
              new fabric.Point(activeObjectLeft, objectTop + objectHeight / 2 - activeObjectHeight / 2),
              'center',
              'center'
            )
          }
        }

        if (!horizontalInTheRange) {
          horizontalLines.length = 0
          horizontalObject.clear()
        }

        if (!verticalInTheRange) {
          verticalLines.length = 0
          verticalObject.clear()
        }
      })

      canvas.on('before:render', function () {
        canvas.clearContext(ctx)
      })

      canvas.on('after:render', function () {
        verticalObject.forEach(item => {
          drawObjectBorderFrame(canvas, item)
        })

        horizontalObject.forEach(item => {
          drawObjectBorderFrame(canvas, item)
        })

        for (let i = verticalLines.length; i--; ) {
          drawVerticalLine(verticalLines[i])
        }
        for (let i = horizontalLines.length; i--; ) {
          drawHorizontalLine(horizontalLines[i])
        }

        verticalLines.length = horizontalLines.length = 0
        verticalObject.clear()
        horizontalObject.clear()
      })

      canvas.on('mouse:up', function () {
        verticalLines.length = horizontalLines.length = 0
        verticalObject.clear()
        horizontalObject.clear()
        canvas.renderAll()
      })
    }
  }, [canvas, getWorkAreaOptions])
}

export default useGuidelinesHandler
