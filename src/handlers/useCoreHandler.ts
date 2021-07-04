import { useCanvasContext } from '@/hooks'
import { useCallback } from 'react'
import { CanvasObjects } from '@utils/canvas'
import { propertiesToInclude } from '../constants/contants'

function useCoreHandler() {
  const { canvas, activeObject } = useCanvasContext()

  const resizeCanvas = useCallback(
    (nextWidth, nextHeight) => {
      if (canvas) {
        const diffWidth = nextWidth / 2 - canvas.width / 2
        const diffHeight = nextHeight / 2 - canvas.height / 2
        canvas.setWidth(nextWidth).setHeight(nextHeight)

        //@ts-ignore
        const workarea = canvas.getObjects().find(obj => obj.id === 'workarea')
        workarea.center()
        canvas.renderAll()

        canvas.forEachObject(obj => {
          // @ts-ignore
          if (obj.id !== 'workarea') {
            const left = obj.left + diffWidth
            const top = obj.top + diffHeight
            obj.set({
              left,
              top,
            })
          }
        })
        canvas.requestRenderAll()
      }
    },
    [canvas]
  )

  const resizeWorkarea = useCallback(
    (width: number, height: number) => {
      if (canvas) {
        //@ts-ignore
        const workarea = canvas.getObjects().find(obj => obj.id === 'workarea')
        workarea.set({
          width,
          height,
        })
        workarea.center()
        canvas.requestRenderAll()
      }
    },
    [canvas]
  )
  // Add objects to canvas
  const addObject = useCallback(
    async options => {
      const { type, ...textOptions } = options

      const element = await CanvasObjects[type].create(textOptions)
      if (element.type != 'textbox') {
        element.scaleToHeight(180)
      }

      //@ts-ignore
      const workarea = canvas.getObjects().find(obj => obj.id === 'workarea')
      canvas.add(element)
      element.center()

      element.clipPath = workarea
      canvas.renderAll()
    },
    [canvas]
  )

  /**
   * Clone the selected object
   */

  const cloneOject = useCallback(() => {
    if (canvas) {
      //@ts-ignore
      const workarea = canvas.getObjects().find(obj => obj.id === 'workarea')

      activeObject?.clone((clone: fabric.Object) => {
        clone.set({
          left: activeObject?.left! + 10,
          top: activeObject?.top! + 10,
        })
        clone.clipPath = workarea
        canvas.add(clone)
        canvas.setActiveObject(clone)
        canvas.requestRenderAll()
      })
    }
  }, [canvas, activeObject])

  const deleteObject = useCallback(() => {
    if (canvas && activeObject) {
      canvas.remove(activeObject as fabric.Object)
    }
  }, [canvas, activeObject])
  /**
   * Update selected object
   */
  const updateObject = useCallback(
    (key, value) => {
      if (canvas && activeObject) {
        activeObject.set(key, value)
        canvas.requestRenderAll()
      }
    },
    [canvas, activeObject]
  )

  // Update properties, optional set metadata if present
  const setProperty = useCallback(
    (property, value) => {
      if (activeObject) {
        activeObject.set(property, value)
        activeObject.setCoords()
        canvas.requestRenderAll()
      }
    },
    [activeObject, canvas]
  )

  const exportJSON = useCallback(() => {
    const json = canvas.toJSON(propertiesToInclude)
    return json
  }, [canvas])

  const loadJSON = useCallback(
    json => {
      if (canvas) {
        canvas.loadFromJSON(json, () => {
          canvas.requestRenderAll()
        })
      }
    },
    [canvas]
  )

  const setCanvasBackgroundColor = useCallback(
    color => {
      // @ts-ignore
      const workarea = canvas.getObjects().find(object => object.id === 'workarea')
      if (workarea) {
        workarea.set('fill', color)
        canvas.requestRenderAll()
      }
    },
    [canvas]
  )

  return {
    exportJSON,
    loadJSON,
    setCanvasBackgroundColor,
    addObject,
    setProperty,
    resizeCanvas,
    cloneOject,
    deleteObject,
    updateObject,
    resizeWorkarea,
  }
}

export default useCoreHandler
