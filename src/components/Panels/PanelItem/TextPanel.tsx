import { Input, Box, Grid, Flex } from 'theme-ui'
import { useHandlers } from '@/uibox'

function TextPanel() {
  const handlers = useHandlers()

  const addHeading = () => {
    const options = {
      type: 'Textarea',
      width: 800,
      metadata: {
        fontWeight: 700,
        fontFamily: 'Lexend',
        textAlign: 'center',
        fontSize: 80,
        value: 'Add a heading',
      },
    }
    handlers.objectsHandler.create(options)
  }

  const addSubheading = () => {
    const options = {
      type: 'Textarea',
      width: 800,
      metadata: {
        value: 'Add a subheading',
        fontSize: 60,
        fontWeight: 500,
        fontFamily: 'Lexend',
        textAlign: 'center',
      },
    }
    handlers.objectsHandler.create(options)
  }

  const addTextBody = () => {
    const options = {
      type: 'Textarea',
      width: 800,
      metadata: {
        value: 'Add a little bit of body text',
        fontSize: 40,
        fontWeight: 300,
        fontFamily: 'Lexend',
        textAlign: 'center',
      },
    }
    handlers.objectsHandler.create(options)
  }
  return (
    <>
      <Box sx={{ padding: '2rem 2rem 1rem' }}>
        <Input style={{ background: '#fff', color: '#333' }} type="tel" placeholder="Search text" />
      </Box>
      <Box sx={{ padding: '0 2rem', color: '#fff', fontFamily: 'Lexend' }}>
        <Box sx={{ fontWeight: 600, fontSize: '0.84rem', padding: '0.8rem 0' }}>
          Click text to add to page
        </Box>
        <Grid sx={{ gridTemplateRows: '50px 50px 50px' }}>
          <Flex
            sx={{
              paddingLeft: '1rem',
              fontSize: '1.66rem',
              alignItems: 'center',
              background: 'rgba(255,255,255,0.1)',
              fontWeight: 700,
            }}
            onClick={addHeading}
          >
            Add a heading
          </Flex>
          <Flex
            sx={{
              paddingLeft: '1rem',
              fontSize: '1.12rem',
              alignItems: 'center',
              background: 'rgba(255,255,255,0.1)',
              fontWeight: 500,
            }}
            onClick={addSubheading}
          >
            Add a subheading
          </Flex>
          <Flex
            sx={{
              paddingLeft: '1rem',
              fontSize: '0.76rem',
              alignItems: 'center',
              background: 'rgba(255,255,255,0.1)',
              fontWeight: 300,
            }}
            onClick={addTextBody}
          >
            Add a litle bit of body text
          </Flex>
        </Grid>
      </Box>
    </>
  )
}
export default TextPanel
