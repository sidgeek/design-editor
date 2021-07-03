import { Flex } from 'theme-ui'
import Navbar from '@components/Navbar/Navbar'
import Panels from '@components/Panels/Panels'
// import FooterMenu from '@components/FooterMenu/FooterMenu'
import Toolbox from '@components/Toolbox/Toolbox'
import CanvasArea from '@components/CanvasArea/CanvasArea'
import NotSupported from '@components/NotSupported'
import { useAppContext } from '@contexts/app/AppContext'

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
            {/* <FooterMenu /> */}
          </Flex>
        </Flex>
      )}
    </Flex>
  )
}

export default Editor
