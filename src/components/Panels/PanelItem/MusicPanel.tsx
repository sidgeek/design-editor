import { Input } from 'theme-ui'
import { useEffect } from 'react'
import { getTemplateV2 } from '@services/han'

function MusicPanel() {
  useEffect(() => {
    getTemplateV2().then(res => {
      console.log('>>>> res', res)
    })
  }, [])

  return (
    <>
      <div style={{ padding: '2rem 2rem 1rem' }}>
        <Input style={{ background: '#fff' }} type="text" placeholder="Search music" />
      </div>
    </>
  )
}
export default MusicPanel
