import { Flex, IconButton, Input } from 'theme-ui'
import { fabric } from 'fabric'
import { useState } from 'react'
import { DownloadIcon, LogoIcon, GithubIcon } from './NavbarIcons'
import { useEditorContext } from '@/uibox'
import { useGetCanvasOperator } from '@common/hooks/useCanvasOperator'

const getRelativeOffset = (workAreaObj: any, canvas: any) => {
  const curBound = workAreaObj.getBoundingRect()
  const { left, top, height, width } = curBound

  const initTop = (canvas.height - height) / 2
  const initLeft = (canvas.width - width) / 2

  const x = Math.round(((left - initLeft) * 1000) / 1000)
  const y = Math.round(((top - initTop) * 1000) / 1000)

  return { x, y }
}

function Navbar() {
  const { canvas } = useEditorContext()
  const [templateName, setTemplateName] = useState('My First Design')
  const { getWorkAreaObject } = useGetCanvasOperator()

  const adjustCanvas = (isChange: boolean, offset: any, oldZoomRatio?: number) => {
    const [x, y] = isChange ? [-offset.x, -offset.y] : [offset.x, offset.y]
    const deltaPoint = new fabric.Point(x, y)
    const ratio = isChange ? 1 : oldZoomRatio

    const centerP = new fabric.Point(canvas.getWidth() / 2, canvas.getHeight() / 2)

    if (offset) {
      canvas.relativePan(deltaPoint)
      canvas.zoomToPoint(centerP, ratio)
    } else {
      canvas.zoomToPoint(centerP, ratio)
      canvas.relativePan(deltaPoint)
    }
  }

  const downloadImage = () => {
    const workarea = getWorkAreaObject()
    const oldZoomRatio = canvas.getZoom()

    const offset = getRelativeOffset(workarea, canvas)

    adjustCanvas(true, offset)

    const data = canvas?.toDataURL({
      multiplier: 3,
      top: workarea.top,
      left: workarea.left,
      height: workarea.height,
      width: workarea.width,
    })

    if (data) {
      const a = document.createElement('a')
      a.href = data
      a.download = 'drawing.png'
      a.click()
    }

    adjustCanvas(false, offset, oldZoomRatio)
  }

  return (
    <Flex
      sx={{
        fontFamily: 'Mukta',
        height: '60px',
        background: 'linear-gradient(90deg, #00c4cc, #7d2ae8)',
        justifyContent: 'space-between',
        color: '#fff',
        padding: '0 1rem',
      }}
    >
      <Flex sx={{ alignItems: 'center' }}>
        <LogoIcon height="36px" />
      </Flex>

      <Flex sx={{ alignItems: 'center' }}>
        <Input
          sx={{ textAlign: 'center', border: 'none', outline: 0 }}
          value={templateName}
          onChange={e => setTemplateName(e.target.value)}
          placeholder="New template"
        />
      </Flex>
      <Flex sx={{ alignItems: 'center' }}>
        <IconButton>
          <DownloadIcon style={{ color: '#fff' }} onClick={downloadImage} />
        </IconButton>
        <a
          style={{ color: '#fff', outline: 'none', marginLeft: '1rem' }}
          href="https://github.com/xorb/react-design-editor"
        >
          <IconButton>
            <GithubIcon />
          </IconButton>
        </a>
      </Flex>
    </Flex>
  )
}

export default Navbar
