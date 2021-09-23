import { useCallback } from 'react'
import { useHandlers } from '@/uibox'
import { getFontData, getImageData } from '@common/utils/fontConverHelper'
import { Layer } from '@common/interfaces'

export const useGetCanvasOperator = () => {
  const handlers = useHandlers()

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

  const addTextToCanvas = useCallback(() => {
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
    return handlers.objectsHandler.create(options)
  }, [handlers])

  const getWorkAreaOptions = useCallback(() => {
    return handlers.frameHandler.getOptions()
  }, [handlers])

  return {
    addImageToCanvas,
    addFontToCanvas,
    addTextToCanvas,
    getWorkAreaOptions,
  }
}
