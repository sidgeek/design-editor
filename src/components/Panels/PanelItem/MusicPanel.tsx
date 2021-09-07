import { Input } from 'theme-ui'
import { useCallback, useEffect } from 'react'
import { getTemplateV2 } from '@services/han'
import { Layer } from '@common/interfaces'
import { getFontData } from '@common/utils/fontConverHelper'

import { useHandlers } from '@/uibox'

function MusicPanel() {
  const handlers = useHandlers()

  const addFont = useCallback(
    (data: Layer) => {
      const options = getFontData(data)
      console.log('>>>> options', options)
      handlers.objectsHandler.create(options)
    },
    [handlers]
  )

  useEffect(() => {
    getTemplateV2().then(res => {
      // const { data, others } = res
      const { data } = res
      const layers = data.layer
      // console.log('>>>> layers', layers)
      const layer = layers[7]
      console.log('>>>> layer', layer)
      if (layer.is_font) {
        addFont(layer)
      }
    })
  }, [addFont])

  return (
    <>
      <div style={{ padding: '2rem 2rem 1rem' }}>
        <Input style={{ background: '#fff' }} type="text" placeholder="Search music" />
      </div>
    </>
  )
}
export default MusicPanel
