import { useEffect } from 'react'
import { fabric } from 'fabric'
import { useCanvasContext } from '@/hooks'
import { Flex } from '@chakra-ui/react'
import ContextMenu from '@components/ContextMenu'

import {
  useCustomizationHandler,
  useEventsHandler,
  useZoomHandler,
  useContainerHandler,
  useGuidelinesHandler,
  usePanningHandler,
} from '@/handlers'

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
      fireRightClick: true,
    })

    //@ts-ignore
    fabric.util.addListener(document.getElementsByClassName('upper-canvas')[0], 'contextmenu', function (e) {
      e.preventDefault()
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
    <Flex flex={1} position="relative">
      <ContextMenu />
      <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
        <div style={{ height: '100%' }} className="editor-canvas" ref={containerRef}>
          <canvas id="canvas"></canvas>
        </div>
      </div>
    </Flex>
  )
}

export default Canvas
