import { fabric } from 'fabric'
import { useContext, useEffect, useRef } from 'react'
import { FabricCanvas } from './common/interfaces'
import { EditorContext } from './context'
import Handlers from './handlers'
import './objects'
import useAddTemplateDataToCanvas from '@common/hooks/useAddTemplateDataToCanvas'
import useGuidelinesHandler from './hooks/useGuidelinesHandler'

function Editor() {
  const containerRef = useRef<HTMLDivElement>()
  const context = useContext(EditorContext)
  const { setHandlers } = context

  useEffect(() => {
    const container = containerRef.current
    const { clientHeight, clientWidth } = container

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
    resizeObserver.observe(container)
    return () => {
      handlers.destroy()
      if (container) {
        resizeObserver.unobserve(container)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useAddTemplateDataToCanvas()
  useGuidelinesHandler()
  return (
    <div ref={containerRef} style={{ flex: 1, position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          height: 800,
          width: 600,
        }}
      >
        <canvas
          id="canvas"
          style={{
            border: '1px solid red',
            // backgroundColor: '#000',
          }}
        ></canvas>
      </div>
    </div>
  )
}

export default Editor
