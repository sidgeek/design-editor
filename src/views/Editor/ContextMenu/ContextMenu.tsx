import styled from '@emotion/styled'
import { useCoreHandler } from '@components/Canvas/handlers'
import { useCanvasContext } from '@components/Canvas/hooks'
import ContextMenuIcons from './ContextMenuIcons'

const ContextMenuContainer = styled.div<any>(
  {
    position: 'absolute',
    width: '200px',
    zIndex: 9,
    backgroundColor: '#fff',
    border: '1px solid rgba(64, 87, 109, 0.07)',
    boxShadow: '0 2px 8px rgba(53, 71, 90, 0.2)',
    borderRadius: '4px',
  },
  props => {
    return {
      display: props.visible ? 'block' : 'none',
      top: props.top ? props.top : 0,
      left: props.left ? props.left : 0,
    }
  }
)

function ContextMenu() {
  const { contextMenu, setContextMenu } = useCanvasContext()
  const { deleteObject, cloneOject } = useCoreHandler()
  return (
    <ContextMenuContainer
      top={contextMenu.top}
      left={contextMenu.left}
      visible={contextMenu.visible}
      onContextMenu={(e: Event) => e.preventDefault()}
    >
      <ContextMenuItem
        icon="copy"
        text="Clone"
        shortcut="Ctrl + C"
        onClick={() => {
          cloneOject()
          setContextMenu({ ...contextMenu, visible: false })
        }}
      />
      <ContextMenuItem
        shortcut="DEL"
        icon="delete"
        text="Delete"
        onClick={() => {
          deleteObject()
          setContextMenu({ ...contextMenu, visible: false })
        }}
      />
    </ContextMenuContainer>
  )
}

interface ContextMenuItemProps {
  text: string
  onClick: () => void
  icon: string
  shortcut: string
}
function ContextMenuItem(props: ContextMenuItemProps) {
  return (
    <ContextMenuItemContainer {...props}>
      <div>{ContextMenuIcons[props.icon as 'delete']}</div>
      <div style={{ fontSize: '0.94rem' }}>{props.text}</div>
      <div style={{ color: 'rgba(0,0,0,0.5)' }}>{props.shortcut}</div>
    </ContextMenuItemContainer>
  )
}

const ContextMenuItemContainer = styled.div({
  cursor: 'pointer',
  height: '40px',
  display: 'grid',
  gridTemplateColumns: '40px 1fr 60px',
  alignItems: 'center',
  padding: '0 0.8rem',
  ':hover': {
    background: 'rgba(0,0,0,0.06)',
  },
})

export default ContextMenu
