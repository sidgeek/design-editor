import styled from '@emotion/styled'

const Container = styled.div({
  background: '#0e1419',
  color: 'rgba(255,255,255,0.7)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  textAlign: 'center',
  paddingBottom: '1rem',
})
function NotSupported() {
  return (
    <Container>
      Your screen size is not supported <br />
      Try with a bigger one
    </Container>
  )
}
export default NotSupported
