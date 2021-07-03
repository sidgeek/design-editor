import { Flex } from 'theme-ui'
function Loading() {
  return (
    <Flex
      sx={{
        background: '#0e1419',
        color: 'rgba(255,255,255,0.7)',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        textAlign: 'center',
        paddingBottom: '1rem',
      }}
    >
      Loading...
    </Flex>
  )
}
export default Loading
