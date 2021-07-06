import { FC, createContext, useState } from 'react'
import { fabric } from 'fabric'
import { ContextMenu, CanvasType } from '@common/interfaces'
interface CanvasContext {
  zoomRatio: number
  setZoomRatio: (value: number) => void
  canvas: fabric.Canvas | null
  setCanvas: (canvas: fabric.Canvas) => void
  activeObject: fabric.Object | null
  setActiveObject: (object: fabric.Object | null) => void
  contextMenu: ContextMenu
  setContextMenu: (option: ContextMenu) => void
  canvasType: CanvasType
  setCanvasType: (option: CanvasType) => void
}

export const Context = createContext<CanvasContext>({
  zoomRatio: 1,
  setZoomRatio: () => {},
  canvas: null,
  setCanvas: () => {},
  activeObject: null,
  setActiveObject: () => {},
  contextMenu: { top: 0, left: 0, visible: false, type: 'canvas' },
  setContextMenu: () => {},
  canvasType: 'editor',
  setCanvasType: () => {},
})

export const CanvasProvider: FC = ({ children }) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)
  const [activeObject, setActiveObject] = useState<fabric.Object | null>(null)
  const [zoomRatio, setZoomRatio] = useState(1)
  const [canvasType, setCanvasType] = useState<CanvasType>('editor')
  const [contextMenu, setContextMenu] = useState<ContextMenu>({
    top: 0,
    left: 0,
    visible: false,
    type: 'canvas',
  })

  const context = {
    canvas,
    setCanvas,
    activeObject,
    setActiveObject,
    zoomRatio,
    setZoomRatio,
    contextMenu,
    setContextMenu,
    canvasType,
    setCanvasType,
  }

  return <Context.Provider value={context}>{children}</Context.Provider>
}
