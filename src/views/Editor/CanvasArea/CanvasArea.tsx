import { Flex } from '@chakra-ui/react'
import Canvas from '@components/Canvas'
import Slides from '@views/Editor/Slides'
function CanvasArea() {
  return (
    <Flex flex={1} position={'relative'}>
      <Canvas />
      <Slides />
    </Flex>
  )
}

export default CanvasArea
