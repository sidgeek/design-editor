import { useCanvasContext } from '@/components/Canvas/hooks'
import { Flex } from '@chakra-ui/react'
function Slides() {
  const { canvasType } = useCanvasContext()
  return (
    <Flex
      display={canvasType === 'previews' ? 'block' : 'none'}
      flex={1}
      background="#ecf0f1"
      position={'absolute'}
      height="100%"
      width="100%"
    >
      Slides
    </Flex>
  )
}

export default Slides
