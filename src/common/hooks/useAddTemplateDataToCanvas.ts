import { useEffect, useState } from 'react'
import { getTemplateData } from '@services/han'
import { Layer } from '@common/interfaces'

import { useHandlers } from '@/uibox'
import { FRAME_INIT_WIDTH, FRAME_INIT_HEIGHT } from '@/uibox/common/constants'
import useReference from '@common/hooks/useReference'
import { useGetCanvasOperator } from './useCanvasOperator'
// import BgImage from '@/assets/images/bg2.png'

interface Size {
  width: number
  height: number
}

// need to be change
const getFitRatio = (targetSize: Size, canvasSize: Size) => {
  const ratio = Math.floor((canvasSize.height / targetSize.height) * 100)
  return { ratio: ratio / 100, fitSize: targetSize }
}

const useAddTemplateDataToCanvas = () => {
  const handlers = useHandlers()
  const [exceptSize] = useState({ width: FRAME_INIT_WIDTH, height: FRAME_INIT_HEIGHT })
  const exceptSizeRef = useReference(exceptSize)

  const { addFontToCanvas, addImageToCanvas, addTextToCanvas } = useGetCanvasOperator()

  useEffect(() => {
    if (!handlers) {
      return
    }

    getTemplateData('74452').then(async res => {
      const { data } = res
      const { layer: layers, head } = data

      const canvasSize = handlers.canvasHandler.options

      const { ratio, fitSize } = getFitRatio(head, canvasSize)
      handlers.zoomHandler.zoomToRatio(ratio)

      const canvas = handlers.canvasHandler.canvas

      const newCanvasSize = { width: canvasSize.width / ratio, height: canvasSize.height / ratio }

      handlers.frameHandler.updateSize(fitSize)
      handlers.frameHandler.updateMaskSize(newCanvasSize)
      handlers.frameHandler.addFrameBorder(fitSize)

      const layerArr = Object.values(layers)
      const filterArr = layerArr.filter(layer => layer.index !== -2)

      const getAddToCanvasFun = (layer: Layer) =>
        layer.is_font ? addFontToCanvas(layer) : addImageToCanvas(layer)

      await Promise.allSettled(filterArr.map(getAddToCanvasFun))
      await addTextToCanvas()

      const objectArr = handlers.objectsHandler.getObjects()

      const sortObjectArr = objectArr.sort((a: any, b: any) => a.index - b.index)

      sortObjectArr.forEach(object => {
        canvas.bringToFront(object)
      })
    })
  }, [addFontToCanvas, addImageToCanvas, addTextToCanvas, handlers, exceptSizeRef])
}

export default useAddTemplateDataToCanvas
