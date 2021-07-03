import { Flex, IconButton, Input } from 'theme-ui'
import { useState } from 'react'
import { useCanvasContext } from '@/hooks'
import { DownloadIcon, LogoIcon, GithubIcon } from './NavbarIcons'

function Navbar() {
  const { canvas } = useCanvasContext()
  const [templateName, setTemplateName] = useState('My First Design')
  const downloadImage = () => {
    //@ts-ignore
    const workarea = canvas.getObjects().find(obj => obj.id === 'workarea')
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
