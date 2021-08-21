import { Box, Grid } from 'theme-ui'
// import { useCoreHandler } from '@/handlers'
// import { useCanvasContext } from '@/hooks'
import ContextMenuIcons from './ContextMenuIcons'

function ContextMenu() {
  // const { contextMenu, setContextMenu } = useCanvasContext()
  // const { deleteObject, cloneOject } = useCoreHandler()
  const contextMenu = {
    visible: false,
    top: 0,
    left: 0,
  }
  const setContextMenu = (params: any) => {}
  return (
    <Box
      sx={{
        position: 'absolute',
        width: '220px',
        zIndex: 9,
        backgroundColor: '#fff',
        border: '1px solid rgba(64, 87, 109, 0.07)',
        boxShadow: '0 2px 8px rgba(53, 71, 90, 0.2)',
        borderRadius: '4px',
        display: contextMenu.visible ? 'block' : 'none',
        top: contextMenu.top ? contextMenu.top : 0,
        left: contextMenu.left ? contextMenu.left : 0,
      }}
      // @ts-ignore
      onContextMenu={(e: Event) => e.preventDefault()}
    >
      <ContextMenuItem
        icon="copy"
        text="Clone"
        shortcut="Ctrl + C"
        onClick={() => {
          // cloneOject()
          setContextMenu({ ...contextMenu, visible: false })
        }}
      />
      <ContextMenuItem
        shortcut="DEL"
        icon="delete"
        text="Delete"
        onClick={() => {
          // deleteObject()
          setContextMenu({ ...contextMenu, visible: false })
        }}
      />
    </Box>
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
    <Grid
      sx={{
        cursor: 'pointer',
        height: '40px',
        display: 'grid',
        gridTemplateColumns: '40px 1fr 70px',
        alignItems: 'center',
        padding: '0 0.8rem',
        ':hover': {
          background: 'rgba(0,0,0,0.06)',
        },
      }}
    >
      <div>{ContextMenuIcons[props.icon as 'delete']}</div>
      <div style={{ fontSize: '0.94rem' }}>{props.text}</div>
      <div style={{ color: 'rgba(0,0,0,0.5)' }}>{props.shortcut}</div>
    </Grid>
  )
}

export default ContextMenu
