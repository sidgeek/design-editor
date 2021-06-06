import { useCanvasContext } from '@/hooks'
import { createRef, useEffect } from 'react'
import ResizeObserver from 'resize-observer-polyfill'
import useCoreHandler from './useCoreHandler'

function useContainerHandler() {
  const containerRef = createRef<HTMLDivElement>()
  const { resizeCanvas } = useCoreHandler()
  const { canvas } = useCanvasContext()

  useEffect(() => {
    const containerWidth = containerRef.current.clientWidth
    const containerHeight = containerRef.current.clientHeight
    resizeCanvas(containerWidth, containerHeight)
    const resizeObserver = new ResizeObserver(entries => {
      const { width = containerWidth, height = containerHeight } =
        (entries[0] && entries[0].contentRect) || {}
      resizeCanvas(width, height)
    })
    resizeObserver.observe(containerRef.current)
    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvas])

  return containerRef
}

export default useContainerHandler
