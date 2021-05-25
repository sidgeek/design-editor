import { useEffect, useRef, useState } from 'react'
import Navbar from '@components/Editor/Navbar/Navbar'
import Panels from '@components/Editor/Panels/Panels'
import FooterMenu from '@components/Editor/FooterMenu/FooterMenu'
import Toolbox from '@components/Editor/Toolbox/Toolbox'
import CanvasArea from '@components/Editor/CanvasArea/CanvasArea'
import ResizeObserver from 'resize-observer-polyfill'
import NotSupported from '../NotSupported'
import './Editor.scss'

function Editor() {
  const containerRef = useRef<HTMLDivElement>()
  const [isMobile, setIsMobile] = useState<boolean | undefined>()
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
    <div ref={containerRef} className="editor">
      <Navbar />
      {isMobile === undefined ? (
        <div>Loading</div>
      ) : isMobile ? (
        <NotSupported />
      ) : (
        <div className="section-two">
          <Panels />
          <div className="section-three">
            <Toolbox />
            <CanvasArea />
            <FooterMenu />
          </div>
        </div>
      )}
    </div>
  )
}

export default Editor
