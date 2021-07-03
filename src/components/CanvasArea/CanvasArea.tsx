import { Flex } from 'theme-ui'
import Canvas from '@components/Canvas'
import Slides from '@components/Slides'
function CanvasArea() {
  return (
    <Flex
      sx={{
        flex: 1,
        position: 'relative',
      }}
    >
      <Canvas />
      {/* <Slides /> */}
    </Flex>
  )
}

export default CanvasArea
