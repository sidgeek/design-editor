import { useEffect } from 'react'
import { fabric } from 'fabric'
import { ILineOptions } from 'fabric/fabric-impl'
import { useEditorContext } from '.'

function useGuidelinesHandler() {
  const { canvas } = useEditorContext()
  useEffect(() => {
    if (canvas) {
      let ctx = canvas.getSelectionContext(),
        aligningLineOffset = 5,
        aligningLineMargin = 4,
        aligningLineWidth = 1,
        aligningLineColor = 'rgba(255, 121, 121,1.0)',
        viewportTransform = canvas.viewportTransform,
        zoom = 1

      const drawVerticalLine = (coords: ILineOptions) => {
        drawLine(
          coords.x1! + 0.5,
          coords.y1! > coords.y2! ? coords.y2! : coords.y1!,
          coords.x1! + 0.5,
          coords.y2! > coords.y1! ? coords.y2! : coords.y1!
        )
      }

      const drawLine = (x1: number, y1: number, x2: number, y2: number) => {
        ctx.save()
        ctx.lineWidth = aligningLineWidth
        ctx.strokeStyle = aligningLineColor
        ctx.beginPath()
        if (viewportTransform) {
          ctx.moveTo((x1 + viewportTransform[4]) * zoom, (y1 + viewportTransform[5]) * zoom)
          ctx.lineTo((x2 + viewportTransform[4]) * zoom, (y2 + viewportTransform[5]) * zoom)
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
          horizontalInTheRange = false,
          verticalInTheRange = false,
          transform = canvas.viewportTransform

        if (!transform) return

        // It should be trivial to DRY this up by encapsulating (repeating) creation of x1, x2, y1, and y2 into functions,
        // but we're not doing it here for perf. reasons -- as this a function that's invoked on every mouse move

        // console.log(">>>> moving");
        debugger

        for (let i = canvasObjects.length; i--; ) {
          if (canvasObjects[i] === activeObject) continue

          let objectCenter = canvasObjects[i].getCenterPoint(),
            objectLeft = objectCenter.x,
            objectTop = objectCenter.y,
            objectBoundingRect = canvasObjects[i].getBoundingRect(),
            objectHeight = objectBoundingRect.height / viewportTransform[3]

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
            console.log('>>> vLines:', x1, y1, y2, verticalLines)

            activeObject.setPositionByOrigin(
              new fabric.Point(objectLeft, activeObjectTop),
              'center',
              'center'
            )
          }
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
        // console.log(">>>> after render");

        for (let i = verticalLines.length; i--; ) {
          drawVerticalLine(verticalLines[i])
        }
        // for (let i = horizontalLines.length; i--; ) {
        //   drawHorizontalLine(horizontalLines[i])
        // }

        verticalLines.length = horizontalLines.length = 0
      })

      canvas.on('mouse:up', function () {
        // console.log(">>>> up");

        verticalLines.length = horizontalLines.length = 0
        canvas.renderAll()
      })
    }
  }, [canvas])
}

export default useGuidelinesHandler
