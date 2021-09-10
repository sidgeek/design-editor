import { Flex } from 'theme-ui'
import Editor from '@/uibox'

function CanvasArea(props) {
  return (
    <Flex
      sx={{
        flex: 1,
        position: 'relative',
      }}
    >
      <Editor {...props}/>
    </Flex>
  )
}

export default CanvasArea
