import { Box } from 'theme-ui'
import ImagesPanel from './ImagesPanel'
import MusicPanel from './MusicPanel'
import ObjectsPanel from './ObjectsPanel'
import TemplatesPanel from './TemplatesPanel'
import TextPanel from './TextPanel'
import VideosPanel from './VideosPanel'
import LayersPanel from './LayersPanel'
import { Scrollbars } from 'react-custom-scrollbars'
import classNames from 'classnames'

interface Props {
  panelOpen: boolean
  activeTab: string
}
function PanelItem({ panelOpen, activeTab }: Props) {
  const className = classNames({
    'panel-item-container': true,
    open: panelOpen,
  })

  return (
    <div className={className}>
      <Box sx={{ flex: 1 }}>
        <Scrollbars
          renderThumbVertical={() => <div style={{ background: 'rgba(255,255,255,0.3)' }}></div>}
          autoHide
        >
          {activeTab === 'images' && <ImagesPanel />}
          {activeTab === 'text' && <TextPanel />}
          {activeTab === 'objects' && <ObjectsPanel />}
          {activeTab === 'musics' && <MusicPanel />}
          {activeTab === 'templates' && <TemplatesPanel />}
          {activeTab === 'videos' && <VideosPanel />}
          {activeTab === 'layers' && <LayersPanel />}
        </Scrollbars>
      </Box>
    </div>
  )
}

export default PanelItem
