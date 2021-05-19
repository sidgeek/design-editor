import { useEffect } from 'react'
import { useCanvasContext } from '@components/Canvas/hooks'
import { fabric } from 'fabric'
import {
  useCustomizationHandler,
  useEventsHandler,
  useZoomHandler,
  useContainerHandler,
  useGuidelinesHandler,
  usePanningHandler,
} from '@components/Canvas/handlers'

function Canvas() {
  const containerRef = useContainerHandler()
  const { setCanvas } = useCanvasContext()
  useCustomizationHandler()
  useGuidelinesHandler()
  useEventsHandler()
  useZoomHandler()
  usePanningHandler()
  useEffect(() => {
    const initialHeigh = containerRef.current.clientHeight
    const initialWidth = containerRef.current.clientWidth

    const canvas = new fabric.Canvas('canvas', {
      backgroundColor: '#ecf0f1',
      height: initialHeigh,
      width: initialWidth,
    })

    setCanvas(canvas)
    const workarea = new fabric.Rect({
      //@ts-ignore
      id: 'workarea',
      width: 600,
      height: 400,
      absolutePositioned: true,
      fill: '#ffffff',
      selectable: false,
      hoverCursor: 'default',
    })

    canvas.add(workarea)

    workarea.center()
  }, [])
  return (
    <div style={{ flex: 1, display: 'flex', position: 'relative' }}>
      <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
        <div style={{ height: '100%' }} className="editor-canvas" ref={containerRef}>
          <canvas id="canvas"></canvas>
        </div>
      </div>
    </div>
  )
}

export default Canvas
