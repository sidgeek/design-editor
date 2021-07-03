import { useCanvasContext } from '@/hooks'
import { Flex } from 'theme-ui'
function Slides() {
  const { canvasType } = useCanvasContext()
  return (
    <Flex
      sx={{
        display: canvasType === 'previews' ? 'block' : 'none',
        flex: 1,
        background: '#ecf0f1',
        position: 'absolute',
        height: '100%',
        width: '100%',
      }}
    >
      Slides
    </Flex>
  )
}

export default Slides
