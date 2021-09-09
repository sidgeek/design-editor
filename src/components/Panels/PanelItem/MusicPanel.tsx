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

  const exceptSizeRef = useReference(exceptSize)

  const addFontToCanvas = useCallback(
    (data: Layer) => {
      const { options, isContainChinese, isVertical } = getFontData(data)
      return handlers.objectsHandler.create({ ...options }, { isContainChinese, isVertical })
    },
    [handlers]
  )

  const addImageToCanvas = useCallback(
    (data: Layer) => {
      const options = getImageData(data)
      return handlers.objectsHandler.create({ ...options })
    },
    [handlers]
  )

  useEffect(() => {
    getTemplateV2().then(res => {
      const { data } = res
      const { layer: layers, head } = data

      const canvasSize = handlers.canvasHandler.options

      const { ratio, fitSize } = getFitRatio(head, canvasSize)
      console.log('>>>> 123', ratio, fitSize)
      handlers.frameHandler.updateSize(fitSize)
      // handlers.zoomHandler.zoomToRatio(ratio)

      setTimeout(async () => {
        // const indexs = [2, 19, 20, 36]
        // const indexs = [20]
        // const layerArr = indexs.map(index => layers[index])

        const layerArr = Object.values(layers)
        const getAddToCanvasFun = (layer: Layer) =>
          layer.is_font ? addFontToCanvas(layer) : addImageToCanvas(layer)

        console.log('>>>>> 1')
        await Promise.allSettled(layerArr.map(getAddToCanvasFun))
        console.log('>>>>> 2')

        await new Promise(resolve => {
          setTimeout(() => resolve(true), 5000)
        })

        const canvas = handlers.canvasHandler.canvas
        const objectArr = handlers.objectsHandler.getObjects()

        console.log('>>>> canvas', canvas)
        console.log('>>>> objects', objectArr)

        objectArr.forEach(object => {
          console.log('>>>> object', object)
        })

        for (let i = 0; i < objectArr.length - 1; ++i) {
          const layer = objectArr[i]
          // @ts-ignore
          // console.log('>>>> layer:', layer.index, layer)
          // @ts-ignore
          if (layer.index) {
            // console.log('>>>> layer:', layer)
            canvas.bringToFront(layer)
          } else {
            canvas.bringForward(layer)
          }
        }

        // for (let i = objectArr.length - 1; i < 0; --i) {
        //   const layer = objectArr[i]
        //   canvas.bringToFront(layer)
        // }

        // canvas.bringToFront(objectArr[19])
      }, 0)
    })
  }, [addFontToCanvas, addImageToCanvas, handlers, exceptSizeRef])

  return (
    <>
      <div style={{ padding: '2rem 2rem 1rem' }}>
        <Input style={{ background: '#fff' }} type="text" placeholder="Search music" />
      </div>
    </>
  )
}
export default MusicPanel
