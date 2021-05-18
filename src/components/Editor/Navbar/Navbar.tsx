import { useCanvasContext } from '@/components/Canvas/hooks'
import { DownloadIcon, LogoIcon, GithubIcon } from './NavbarIcons'
import './Navbar.scss'

function Navbar() {
  const { canvas } = useCanvasContext()

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
    <div className="navbar">
      <div className="navbar-left">
        <LogoIcon />
      </div>
      <div className="navbar-action-items">
        <DownloadIcon onClick={downloadImage} />
        <a href="https://github.com/xorb/react-design-editor">
          <GithubIcon />
        </a>
      </div>
    </div>
  )
}

export default Navbar
