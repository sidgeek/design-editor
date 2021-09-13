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

  // return { ratio, fitSize: targetSize }
  return { ratio, fitSize }
}

const useAddTemplateDataToCanvas = () => {
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
    if (!handlers) {
      return
    }

    getTemplateV2('74452').then(async res => {
      const { data } = res
      const { layer: layers, head } = data

      const canvasSize = handlers.canvasHandler.options

      const { ratio, fitSize } = getFitRatio(head, canvasSize)
      console.log('>>>> 123', ratio, fitSize)
      handlers.frameHandler.updateSize(fitSize)
      // handlers.zoomHandler.zoomToRatio(ratio)

      // const layerArr = Object.values(layers)
      const layerArr = []

      // const layerArr = Object.values(layers).filter(e => e.index === 1)
      console.log('>>>> layerArr', layerArr)

      const getAddToCanvasFun = (layer: Layer) =>
        layer.is_font ? addFontToCanvas(layer) : addImageToCanvas(layer)

      await Promise.allSettled(layerArr.map(getAddToCanvasFun))

      const canvas = handlers.canvasHandler.canvas
      const objectArr = handlers.objectsHandler.getObjects()
      // console.log('>>>> objectArr', objectArr)

      const sortObjectArr = objectArr.sort((a: any, b: any) => a.index - b.index)

      sortObjectArr.forEach(object => {
        canvas.bringToFront(object)
      })
    })
  }, [addFontToCanvas, addImageToCanvas, handlers, exceptSizeRef])
}

export default useAddTemplateDataToCanvas
