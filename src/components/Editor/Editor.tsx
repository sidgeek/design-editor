import { Flex } from 'theme-ui'
import Navbar from '@components/Navbar/Navbar'
import Panels from '@components/Panels/Panels'
import Toolbox from '@components/Toolbox/Toolbox'
import CanvasArea from '@components/CanvasArea/CanvasArea'
import NotSupported from '@components/NotSupported'
import { useAppContext } from '@contexts/app/AppContext'
import Footer from '@components/Footer'

function Editor() {
  const { isMobile } = useAppContext()

  return (
    <Flex sx={{ flex: 1, flexDirection: 'column' }}>
      <Navbar />
      {isMobile === undefined ? (
        <div>Loading</div>
      ) : isMobile ? (
        <NotSupported />
      ) : (
        <Flex sx={{ flex: 1 }}>
          <Panels />
          <Flex
            sx={{
              flex: 1,
              flexDirection: 'column',
            }}
          >
            <Toolbox />
            <CanvasArea />
            <Footer />
          </Flex>
        </Flex>
      )}
    </Flex>
  )
}

export default Editor
