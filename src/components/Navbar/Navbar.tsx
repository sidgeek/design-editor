import { Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { useCanvasContext } from '@/hooks'
import { DownloadIcon, LogoIcon, GithubIcon } from './NavbarIcons'
import { ButtonGroup, Input } from '@chakra-ui/react'

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
      fontFamily="Mukta"
      height="60px"
      background="linear-gradient(90deg, #00c4cc, #7d2ae8)"
      justifyContent="space-between"
      color="#fff"
      padding="0 1rem"
    >
      <Flex alignItems="center">
        <LogoIcon height="36px" />
      </Flex>
      <Flex alignItems="center">
        <Input
          value={templateName}
          onChange={e => setTemplateName(e.target.value)}
          textAlign="center"
          border="none"
          placeholder="Hello"
        />
      </Flex>
      <Flex alignItems="center">
        <ButtonGroup spacing={3}>
          <DownloadIcon style={{ color: '#fff' }} onClick={downloadImage} />
          <a style={{ color: '#fff', outline: 'none' }} href="https://github.com/xorb/react-design-editor">
            <GithubIcon />
          </a>
        </ButtonGroup>
      </Flex>
    </Flex>
  )
}

export default Navbar
