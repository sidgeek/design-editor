import { useEffect, useState } from 'react'
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
import { Box } from '@chakra-ui/react'
// import styled from ""
//@ts-ignore
fabric.util.addListener(document.getElementsByClassName('upper-canvas')[0], 'contextmenu', function (e) {
  e.preventDefault()
})

// const ContextMenuContainer = styled

function Canvas() {
  const containerRef = useContainerHandler()
  const { setCanvas } = useCanvasContext()
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    left: 0,
    top: 0,
  })
  useCustomizationHandler()
  useGuidelinesHandler()
  useEventsHandler()
  useZoomHandler()
  usePanningHandler()
  useEffect(() => {
    const initialHeigh = containerRef.current.clientHeight
    const initialWidth = containerRef.current.clientWidth
    //Disable context menu
    //@ts-ignore

    const canvas = new fabric.Canvas('canvas', {
      backgroundColor: '#ecf0f1',
      height: initialHeigh,
      width: initialWidth,
      fireRightClick: true,
    })

    //Disable context menu
    //@ts-ignore
    fabric.util.addListener(document.getElementsByClassName('upper-canvas')[0], 'contextmenu', function (e) {
      e.preventDefault()
    })

    canvas.on('mouse:down', e => {
      // console.log(e)
      //@ts-ignore
      e.e.preventDefault()
      // console.log(e)
      if (e.button === 3) {
        console.log(e)
        // @ts-ignore
        updateContextMenu({ ...contextMenu, visible: true, left: e.e.offsetX, top: e.e.offsetY })
      } else {
        updateContextMenu({ visible: false })
      }
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

  const updateContextMenu = updatedValues => {
    setContextMenu({ ...contextMenu, ...updatedValues })
  }
  return (
    <div style={{ flex: 1, display: 'flex', position: 'relative' }}>
      {contextMenu.visible && (
        <Box
          className="A"
          style={{
            position: 'absolute',
            left: `${contextMenu.left}px`,
            top: `${contextMenu.top}px`,
            zIndex: 9,
            width: '240px',
            pointerEvents: 'none',
          }}
        >
          <div>Feature 1</div>
          <div>Feature 2</div>
          <div>Feature 3</div>
        </Box>
      )}
      <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
        <div style={{ height: '100%' }} className="editor-canvas" ref={containerRef}>
          <canvas id="canvas"></canvas>
        </div>
      </div>
    </div>
  )
}

export default Canvas
