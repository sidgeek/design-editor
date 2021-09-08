import { Input } from 'theme-ui'
import { useCallback, useEffect, useState } from 'react'
import { getTemplateV2 } from '@services/han'
import { Layer } from '@common/interfaces'
import { getFontData, getImageData } from '@common/utils/fontConverHelper'

import { useHandlers } from '@/uibox'
import { FRAME_INIT_WIDTH, FRAME_INIT_HEIGHT } from '@/uibox/common/constants'
import useReference from '@common/hooks/useReference'

interface Size {
  width: number
  height: number
}

const getFitRatio = (targetSize: Size, canvasSize: Size) => {
  const ratio = canvasSize.width / targetSize.width
  const targetRatio = targetSize.width / targetSize.height
  const fitSize = { width: canvasSize.height * targetRatio, height: canvasSize.height }
  // console.log('>>> ratio:', canvasSize.width, targetSize.width)

  return { ratio, fitSize: targetSize }
}

function MusicPanel() {
  const handlers = useHandlers()
  const [exceptSize] = useState({ width: FRAME_INIT_WIDTH, height: FRAME_INIT_HEIGHT })
  const [realSize, setRealSize] = useState({ width: 0, height: 0 })

  const exceptSizeRef = useReference(exceptSize)
  const realSizeRef = useReference(realSize)

  const addFontToCanvas = useCallback(
    (data: Layer) => {
      const options = getFontData(data)
      // console.log('>>>> options', options)
      handlers.objectsHandler.create({ ...options })
    },
    [handlers]
  )

  const addImageToCanvas = useCallback(
    (data: Layer) => {
      const options = getImageData(data)
      handlers.objectsHandler.create({ ...options })
    },
    [handlers]
  )

  useEffect(() => {
    getTemplateV2().then(res => {
      const { data } = res
      const { layer: layers, head } = data

      setRealSize({ width: head.width, height: head.height })
      const canvasSize = handlers.canvasHandler.options

      const { ratio, fitSize } = getFitRatio(head, canvasSize)
      console.log('>>>> 123', ratio, fitSize)
      handlers.frameHandler.updateSize(fitSize)
      handlers.zoomHandler.zoomToRatio(ratio)

      setTimeout(() => {
        // const indexs = [2, 19, 20, 36]
        // const layerArr = indexs.map(index => layers[index])

        const layerArr = Object.values(layers)
        console.log('>>> layerArr', layerArr)
        layerArr.forEach(layer => {
          if (layer.is_font) {
            addFontToCanvas(layer)
          } else {
            addImageToCanvas(layer)
          }
        })
      }, 2000)
    })
  }, [addFontToCanvas, addImageToCanvas, handlers, exceptSizeRef, realSizeRef])

  return (
    <>
      <div style={{ padding: '2rem 2rem 1rem' }}>
        <Input style={{ background: '#fff' }} type="text" placeholder="Search music" />
      </div>
    </>
  )
}
export default MusicPanel
