import { Box } from 'theme-ui'
import { Scrollbars } from 'react-custom-scrollbars'
import { tabItems } from './tabItems'
import PanelItemsListItem from './PanelsListItem'
import i18n from 'i18next'

interface Props {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
  activeTab: string
  panelOpen: boolean
  setPanelOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function PanelItems(props: Props) {
  const { setActiveTab, activeTab, setPanelOpen, panelOpen } = props
  return (
    <Box
      sx={{
        width: '70px',
        background: '#0e1419',
        color: '#fff',
        paddingTop: '0.4rem',
      }}
    >
      <Scrollbars
        renderThumbVertical={() => <div style={{ background: 'rgba(255,255,255,0.3)' }}></div>}
        autoHide
      >
        {tabItems.map(tabItem => (
          <PanelItemsListItem
            key={tabItem.icon}
            icon={tabItem.icon}
            label={i18n.t(`editor.panel.items.${tabItem.name}`)}
            name={tabItem.name}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
            setPanelOpen={setPanelOpen}
            panelOpen={panelOpen}
          />
        ))}
      </Scrollbars>
    </Box>
  )
}

export default PanelItems
