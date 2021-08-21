import { Flex } from 'theme-ui'
import Editor from '@/uibox'

function CanvasArea() {
  return (
    <Flex
      sx={{
        flex: 1,
        position: 'relative',
      }}
    >
      <Editor />
    </Flex>
  )
}

export default CanvasArea
