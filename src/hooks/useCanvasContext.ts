import { Context } from '@contexts/canvas'
import { useContext } from 'react'

function useCanvasContext() {
  const {
    zoomRatio,
    setZoomRatio,
    setCanvas,
    canvas,
    activeObject,
    setActiveObject,
    contextMenu,
    setContextMenu,
    canvasType,
    setCanvasType,
  } = useContext(Context)
  return {
    zoomRatio,
    setZoomRatio,
    setCanvas,
    canvas,
    activeObject,
    setActiveObject,
    contextMenu,
    setContextMenu,
    canvasType,
    setCanvasType,
  }
}

export default useCanvasContext
