import { Flex } from '@chakra-ui/react'
import Navbar from '@/views/Editor/Navbar/Navbar'
import Panels from '@/views/Editor/Panels/Panels'
import FooterMenu from '@/views/Editor/FooterMenu/FooterMenu'
import Toolbox from '@/views/Editor/Toolbox/Toolbox'
import CanvasArea from '@/views/Editor/CanvasArea/CanvasArea'
import NotSupported from '@components/NotSupported'
import { useAppContext } from '@/contexts/AppContext'

function Editor() {
  const { isMobile } = useAppContext()

  return (
    <Flex flex={1} flexDirection="column">
      <Navbar />
      {isMobile === undefined ? (
        <div>Loading</div>
      ) : isMobile ? (
        <NotSupported />
      ) : (
        <Flex flex={1}>
          <Panels />
          <Flex flex={1} flexDirection="column">
            <Toolbox />
            <CanvasArea />
            <FooterMenu />
          </Flex>
        </Flex>
      )}
    </Flex>
  )
}

export default Editor
