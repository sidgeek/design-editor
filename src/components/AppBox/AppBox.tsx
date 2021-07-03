import { useEffect, useRef, FC } from 'react'
import { Flex } from 'theme-ui'
import ResizeObserver from 'resize-observer-polyfill'
import { useAppContext } from '@contexts/app/AppContext'

function AppBox({ children }) {
  const containerRef = useRef<HTMLDivElement>()
  const { isMobile, setIsMobile } = useAppContext()
  useEffect(() => {
    const containerWidth = containerRef.current.clientWidth
    updateMediaQuery(containerWidth)
    const resizeObserver = new ResizeObserver(entries => {
      const { width = containerWidth } = (entries[0] && entries[0].contentRect) || {}
      updateMediaQuery(width)
    })
    resizeObserver.observe(containerRef.current)
    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current)
      }
    }
  }, [])
  const updateMediaQuery = (value: number) => {
    if (!isMobile && value >= 800) {
      setIsMobile(false)
    } else if (!isMobile && value < 800) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  return (
    <Flex
      ref={containerRef}
      sx={{
        flex: 1,
        height: '100vh',
        width: '100vw',
      }}
    >
      {children}
    </Flex>
  )
}

export default AppBox
