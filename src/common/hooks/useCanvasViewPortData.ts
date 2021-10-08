import { useCallback, useEffect, useState } from 'react'
import { useEditorContext } from '@/uibox'

export const useCanvasViewPortData = () => {
  const { canvas } = useEditorContext()
  const [viewPort, setViewPort] = useState({ zoom: -1, top: -1, left: -1, height: -1, width: -1 })
  const updateViewPortData = useCallback(() => {
    const zoom = canvas.getZoom().toFixed(2)
    const vptTop = Math.round(canvas.viewportTransform[5])
    const vptLeft = Math.round(canvas.viewportTransform[4])
    const height = Math.round(canvas.height)
    const width = Math.round(canvas.width)

    setViewPort({
      zoom: zoom as any,
      top: vptTop,
      left: vptLeft,
      height,
      width,
    })

    // const centerHorizontalLine = this.centerLine_horizontal;
    // const centerVerticalLine = this.centerLine_vertical;

    // const alignmentHorizontalLine = this.alignmentLines_horizontal;
    // const alignmentVerticalLine = this.alignmentLines_vertical;
  }, [canvas])

  useEffect(() => {
    if (!canvas) return

    canvas.on('after:render', () => {
      updateViewPortData()
    })

    canvas.on('mouse:wheel', () => {
      updateViewPortData()
    })
  }, [canvas, updateViewPortData])

  return { viewPort }
}
