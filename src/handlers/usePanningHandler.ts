import { useEffect } from 'react'
import { useCanvasContext } from '@/hooks'

function usePanningHandler() {
  const { canvas } = useCanvasContext()

  useEffect(() => {
    if (canvas) {
      canvas.on('mouse:down', function (opt) {
        const evt: any = opt.e
        if (evt.altKey === true) {
          this.isDragging = true
          this.selection = false
          this.lastPosX = evt.clientX
          this.lastPosY = evt.clientY
        }
      })
      canvas.on('mouse:move', function (opt) {
        if (this.isDragging) {
          const e: any = opt.e
          const vpt = this.viewportTransform
          vpt[4] += e.clientX - this.lastPosX
          vpt[5] += e.clientY - this.lastPosY
          this.requestRenderAll()
          this.lastPosX = e.clientX
          this.lastPosY = e.clientY
        }
      })
      canvas.on('mouse:up', function (opt) {
        this.setViewportTransform(this.viewportTransform)
        this.isDragging = false
        this.selection = true
      })
    }
  }, [canvas])
}

export default usePanningHandler
