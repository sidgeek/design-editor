import { Flex } from 'theme-ui'
import { useState } from 'react'
import ClosePanel from './ClosePanel'
import PanelItemsList from './PanelsList/PanelsList'
import PanelItem from './PanelItem/PanelItem'
// import { useCanvasContext } from '@/hooks'

function Panels() {
  const [panelOpen, setPanelOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('templates')
  // const { canvasType } = useCanvasContext()
  const closePanel = () => {
    setPanelOpen(!panelOpen)
  }
  const isPanelOpen = panelOpen
  return (
    <Flex
      sx={{
        position: 'relative',
        background: '#29303a',
        boxShadow: '5px 0 5px -5px rgba(0, 0, 0, 0.5)',
        userSelect: 'none',
      }}
    >
      <PanelItemsList
        setPanelOpen={setPanelOpen}
        panelOpen={isPanelOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <PanelItem activeTab={activeTab} panelOpen={isPanelOpen} />
      <ClosePanel panelOpen={isPanelOpen} closePanel={closePanel} />
    </Flex>
  )
}

export default Panels
