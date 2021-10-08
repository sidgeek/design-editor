import { useEffect, useState } from 'react'
import { fabric } from 'fabric'
import { ILineOptions } from 'fabric/fabric-impl'
import { useGetCanvasOperator } from '@common/hooks/useCanvasOperator'
import useReference from '@common/hooks/useReference'

export const drawObjectBorderFrame = (canvas: any, item: any) => {
  const bound = item.getBoundingRect()
  const ctx = canvas.getContext()
  ctx.strokeStyle = '#34D8FF'
  ctx.lineWidth = 1.5
  ctx.strokeRect(bound.left, bound.top, bound.width, bound.height)
}

interface Bound {
  left: number
  top: number
  width: number
  height: number
}

export function useGuidelinesHandler() {
  const {
    getWorkAreaOptions,
    getWorkAreaObject,
    getCanvasSize,
    getCanvasObjects,
    getCanvas,
  } = useGetCanvasOperator()

  const [workAreaInitBound, setWorkAreaInitBound] = useState<Bound>({ left: 0, top: 0, width: 0, height: 0 })
  const workAreaInitBoundRef = useReference(workAreaInitBound)

  useEffect(() => {
    
  }, [])

  useEffect(() => {
    const canvas = getCanvas()
    if (canvas) {
      setTimeout(() => {
        const woBound = getWorkAreaObject().getBoundingRect()
        setWorkAreaInitBound(woBound)
      }, 2000)

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
          wF: baseOption.width,
          hF: baseOption.height,
          tF: baseOption.top,
          lF: baseOption.left,
        }
      }

      const drawVerticalLine = (coords: ILineOptions) => {
        const [cX1, cY1, cY2] = [coords.x1! + 0.5, coords.y1!, coords.y2!]
        const [y1, y2] = cY1 > cY2 ? [cY2, cY1] : [cY1, cY2]
        const x1 = cX1

        drawLine(x1, y1, x1, y2)
      }

      const drawHorizontalLine = (coords: ILineOptions) => {
        const [cX1, cX2, cY1] = [coords.x1!, coords.x2!, coords.y1! + 0.5]
        const [x1, x2] = cX1 > cX2 ? [cX2, cX1] : [cX1, cX2]
        const y1 = cY1

        drawLine(x1, y1, x2, y1)
      }

      const getPatchTopAndLeft = () => {
        const { lF, tF, wF, hF } = getBaseParam()
        const canvasSize = getCanvasSize()
        const initWoBound = workAreaInitBoundRef.current
        const woBound = getWorkAreaObject().getBoundingRect()

        const diff = {
          left: woBound.left - initWoBound.left,
          top: woBound.top - initWoBound.top,
        }
        const patchLeft = (canvasSize.width - wF * zoom) / 2 + diff.left
        const patchTop = (canvasSize.height - hF * zoom) / 2 + diff.top

        return { lF, tF, patchLeft, patchTop }
      }

      const drawLine = (x1: number, y1: number, x2: number, y2: number) => {
        ctx.save()
        ctx.lineWidth = aligningLineWidth
        ctx.strokeStyle = aligningLineColor

        const { lF, tF, patchLeft, patchTop } = getPatchTopAndLeft()

        ctx.beginPath()
        if (viewportTransform) {
          const vM = 0
          const hM = 0
          const [rX1, rY1] = [(x1 - lF + hM) * zoom, (y1 - tF + vM) * zoom]
          const [rX2, rY2] = [(x2 - lF + hM) * zoom, (y2 - tF + vM) * zoom]

          ctx.moveTo(rX1 + patchLeft, rY1 + patchTop)
          ctx.lineTo(rX2 + patchLeft, rY2 + patchTop)
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

      canvas.on('mouse:down', function () {
        viewportTransform = canvas.viewportTransform
        zoom = canvas.getZoom()
      })

      canvas.on('object:moving', function (e) {
        let activeObject = e.target
        if (!activeObject || !viewportTransform) return

        let canvasObjects = getCanvasObjects()
        // let canvasObjects = canvas.getObjects()

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
        // canvas.clearContext(ctx)
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
  }, [
    getCanvas,
    getWorkAreaOptions,
    getCanvasSize,
    getCanvasObjects,
    getWorkAreaObject,
    setWorkAreaInitBound,
    workAreaInitBoundRef,
  ])
}
