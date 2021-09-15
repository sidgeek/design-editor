import { useCallback, useEffect, useState } from 'react'
import { getTemplateV2 } from '@services/han'
import { Layer } from '@common/interfaces'
import { getFontData, getImageData } from '@common/utils/fontConverHelper'

import { useHandlers } from '@/uibox'
import { FRAME_INIT_WIDTH, FRAME_INIT_HEIGHT } from '@/uibox/common/constants'
import useReference from '@common/hooks/useReference'
import BgImage from '@/assets/images/bg2.png'
import { fabric } from 'fabric'

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
      handlers.zoomHandler.zoomToRatio(ratio)

      const canvas = handlers.canvasHandler.canvas

      // canvas.setOverlayImage(BgImage, canvas.renderAll.bind(canvas), {
      //   scaleX: 100,
      //   scaleY: 100,
      //   top: 0,
      //   left: 0,
      //   originX: 'left',
      //   originY: 'top',
      // })

      const clipPath = new fabric.Circle({
        radius: 200,
        top: -200, // 被裁切物件中心點為基準的 -200
        left: -200, // 被裁切物件中心點為基準的 -200
      })

      canvas.setOverlayImage(
        BgImage,
        function () {
          console.log('>>>> overlayImage:', canvas.overlayImage)
          // canvas.overlayImage && canvas.overlayImage.scaleToWidth(canvas.width)
          // canvas.overlayImage && canvas.overlayImage.scaleToWidth(300).scaleToHeight(700)
          canvas.renderAll()
        },
        {
          scaleX: 100,
          scaleY: 200,
          // top: -1000,
          // left: 0,
          originX: 'left',
          originY: 'top',
          opacity: 1,
          clipPath,
        }
      )

      const newCanvasSize = { width: canvasSize.width / ratio, height: canvasSize.height / ratio }

      handlers.frameHandler.updateSize(fitSize)
      handlers.frameHandler.updateMaskSize(newCanvasSize)
      handlers.frameHandler.addFrameBorder(fitSize)

      const layerArr = Object.values(layers)

      const getAddToCanvasFun = (layer: Layer) =>
        layer.is_font ? addFontToCanvas(layer) : addImageToCanvas(layer)

      await Promise.allSettled(layerArr.map(getAddToCanvasFun))

      const objectArr = handlers.objectsHandler.getObjects()

      const sortObjectArr = objectArr.sort((a: any, b: any) => a.index - b.index)

      sortObjectArr.forEach(object => {
        canvas.bringToFront(object)
      })
    })
  }, [addFontToCanvas, addImageToCanvas, handlers, exceptSizeRef])
}

export default useAddTemplateDataToCanvas
