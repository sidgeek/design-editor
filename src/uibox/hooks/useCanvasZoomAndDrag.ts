import { useGetCanvasOperator } from '@common/hooks/useCanvasOperator'
import useReference from '@common/hooks/useReference'
import { useEffect, useState } from 'react'

export const useCanvasZoomAndDrag = () => {
  const { getCanvas } = useGetCanvasOperator()
  const canvas = getCanvas()

  const [isDragMode, setIsDragMode] = useState(false)
  const isDragModeRef = useReference(isDragMode)

  useEffect(() => {
    const self = canvas as any
    const handleMouseDown = (opt: any) => {
      var evt = opt.e
      if (isDragModeRef.current) {
        self.isDragging = true
        self.selection = false

        self.lastPosX = evt.clientX
        self.lastPosY = evt.clientY
      }
    }

    const handleMouseMove = (opt: any) => {
      if (self.isDragging) {
        var e = opt.e
        var vpt = self.viewportTransform as any
        vpt[4] += e.clientX - self.lastPosX
        vpt[5] += e.clientY - self.lastPosY

        self.requestRenderAll()

        self.lastPosX = e.clientX
        self.lastPosY = e.clientY
      }
    }

    const handleMouseUp = (opt: any) => {
      self.setViewportTransform(self.viewportTransform)

      self.isDragging = false
      self.selection = true
    }

    document.onkeydown = function (e) {
      switch (e.keyCode) {
        case 32:
          setIsDragMode(true)
          self.skipTargetFind = true
          self.defaultCursor = 'grab'
      }
    }

    document.onkeyup = function (e) {
      switch (e.keyCode) {
        case 32:
          self.skipTargetFind = false
          self.defaultCursor = 'default'
          setIsDragMode(false)
      }
    }

    if (canvas) {
      canvas.on('mouse:down', handleMouseDown)
      canvas.on('mouse:move', handleMouseMove)
      canvas.on('mouse:up', handleMouseUp)
    }

    return () => {
      if (canvas) {
        canvas.off('mouse:down', handleMouseDown)
        canvas.off('mouse:move', handleMouseMove)
        canvas.off('mouse:up', handleMouseUp)
      }
    }
  }, [canvas, isDragModeRef, setIsDragMode])
}
