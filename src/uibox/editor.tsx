import { fabric } from 'fabric'
import { useContext, useEffect, useRef } from 'react'
import { FabricCanvas } from './common/interfaces'
import { EditorContext } from './context'
import Handlers from './handlers'
import './objects'

function Editor() {
  const containerRef = useRef<HTMLDivElement>()
  const context = useContext(EditorContext)
  const { setHandlers } = context

  useEffect(() => {
    const { clientHeight, clientWidth } = containerRef.current

    const canvas = new fabric.Canvas('canvas', {
      backgroundColor: '#f6f7f9',
      height: clientHeight,
      width: clientWidth,
      preserveObjectStacking: true,
    }) as FabricCanvas
    const handlers = new Handlers({
      canvas: canvas,
      context: context,
    })
    setHandlers(handlers)
    context.setCanvas(canvas)

    const resizeObserver = new ResizeObserver(entries => {
      const { width = clientWidth, height = clientHeight } = (entries[0] && entries[0].contentRect) || {}
      handlers.canvasHandler.resize(width, height)
    })
    resizeObserver.observe(containerRef.current)
    return () => {
      handlers.destroy()
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current)
      }
    }
  }, [])
  return (
    <div ref={containerRef} style={{ flex: 1, position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
        }}
      >
        <canvas id="canvas"></canvas>
      </div>
    </div>
  )
}

export default Editor
