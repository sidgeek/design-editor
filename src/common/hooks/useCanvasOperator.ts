import { useCallback } from 'react'
import { useHandlers } from '@/uibox'
import { getFontData, getImageData } from '@common/utils/fontConverHelper'
import { Layer } from '@common/interfaces'
import { useEditorContext } from '@/uibox'

export const useGetCanvasOperator = () => {
  const handlers = useHandlers()
  const { canvas } = useEditorContext()

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

  const getObjectByType = useCallback(
    (type: string) => {
      const objects = handlers.objectsHandler.getObjects()
      return objects.find(obj => obj.type === type)
    },
    [handlers]
  )

  const getCanvasSize = useCallback(() => {
    const canvas = handlers.objectsHandler.canvas
    return { width: canvas.width, height: canvas.height }
  }, [handlers])

  const getCanvasObjects = useCallback(() => {
    return handlers.objectsHandler.getObjects().filter(object => !object.type.startsWith('Frame'))
  }, [handlers])

  const getCanvas = useCallback(() => {
    return canvas
  }, [canvas])

  return {
    addImageToCanvas,
    addFontToCanvas,
    addTextToCanvas,
    getWorkAreaOptions,
    getObjectByType,
    getCanvasSize,
    getCanvas,
    getCanvasObjects,
  }
}
