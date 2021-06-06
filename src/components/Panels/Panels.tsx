import { useState } from 'react'
import ClosePanel from './ClosePanel'
import PanelItemsList from './PanelsList/PanelsList'
import PanelItem from './PanelItem/PanelItem'
import { useCanvasContext } from '@/hooks'

import './Panels.scss'

function Panels() {
  const [panelOpen, setPanelOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('images')
  const { canvasType } = useCanvasContext()
  const closePanel = () => {
    setPanelOpen(!panelOpen)
  }
  const isPanelOpen = canvasType === 'editor' && panelOpen
  return (
    <div className="panels">
      <PanelItemsList
        setPanelOpen={setPanelOpen}
        panelOpen={isPanelOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <PanelItem activeTab={activeTab} panelOpen={isPanelOpen} />
      <ClosePanel panelOpen={isPanelOpen} closePanel={closePanel} />
    </div>
  )
}

export default Panels
