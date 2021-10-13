import { fabric } from 'fabric'
import objectToFabric from '../utils/objectToFabric'
import BaseHandler from './BaseHandler'

class ObjectHandler extends BaseHandler {
  clipboard
  isCut

  create = async (item, fontExtraAttrs?) => {
    const options = this.root.frameHandler.getOptions()
    const object: fabric.Object = await objectToFabric.run(item, options)

    // 添加对支持竖排功能的特殊处理
    if (fontExtraAttrs) {
      const { isContainChinese, isVertical } = fontExtraAttrs
      if (isVertical) {
        // @ts-ignore
        object.isVertical = true
      }
      // @ts-ignore
      object.hasChinese = isContainChinese
    }

    this.canvas.add(object)
  }

  /**
   * Get canvas object by id
   */
  getObject() {
    return this.canvas.getObjects()
  }

  /**
   * Get all canvas objects
   */
  getObjects() {
    return this.canvas.getObjects()
  }

  /**
   * Get active object
   */
  getActiveObject() {}

  moveVertical = value => {
    // const activeObject = this.canvas.getActiveObject()
    // const top = activeObject.top + value
    // this.updateActive({
    //   top: top,
    // })
  }

  moveHorizontal = value => {
    // const activeObject = this.canvas.getActiveObject()
    // const left = activeObject.left + value
    // this.updateActive({
    //   left: left,
    // })
  }

  updateLineHeight = value => {
    // const activeObject = this.canvas.getActiveObject()
    // if (activeObject.type === 'DynamicText') {
    //   const lineHeight = activeObject.lineHeight + value
    //   this.updateActive({
    //     lineHeight: lineHeight,
    //   })
    // }
  }

  updateCharSpacing = value => {
    // const activeObject = this.canvas.getActiveObject()
    // if (activeObject.type === 'DynamicText') {
    //   const charSpacing = activeObject.charSpacing + value
    //   this.updateActive({
    //     charSpacing: charSpacing,
    //   })
    // }
  }

  cut = () => {
    // this.copy()
    // this.isCut = true
    // this.remove()
  }

  copy = () => {
    // const activeObject = this.canvas.getActiveObject()
    // if (activeObject) {
    //   activeObject.clone(
    //     cloned => {
    //       this.clipboard = cloned
    //     },
    //     ['metadata', 'subtype']
    //   )
    // }
  }

  paste = () => {
    // const { isCut, clipboard } = this
    // const padding = isCut ? 0 : 10
    // if (!clipboard) {
    //   return false
    // }
    // clipboard.clone(
    //   clonedObj => {
    //     this.canvas.discardActiveObject()
    //     clonedObj.set({
    //       left: clonedObj.left + padding,
    //       top: clonedObj.top + padding,
    //       evented: true,
    //     })
    //     if (clonedObj.type === 'activeSelection') {
    //       // active selection needs a reference to the canvas.
    //       clonedObj.canvas = this.canvas
    //       clonedObj.forEachObject(obj => {
    //         this.canvas.add(obj)
    //       })
    //       clonedObj.setCoords()
    //     } else {
    //       this.canvas.add(clonedObj)
    //     }
    //     clipboard.top += padding
    //     clipboard.left += padding
    //     this.canvas.setActiveObject(clonedObj)
    //     this.canvas.requestRenderAll()
    //   },
    //   ['metadata', 'subtype']
    // )
    // this.isCut = false
  }

  remove = () => {
    // const activeObjects = this.canvas.getActiveObjects()
    // if (!activeObjects) {
    //   return
    // }
    // activeObjects.forEach(obj => {
    //   this.canvas.remove(obj)
    // })
    // this.canvas.discardActiveObject().renderAll()
  }

  selectAll = () => {
    // this.canvas.discardActiveObject()
    // const filteredObjects = this.canvas.getObjects().filter(object => {
    //   if (object.type === 'Frame') {
    //     return false
    //   } else if (!object.evented) {
    //     return false
    //   } else if (object.locked) {
    //     return false
    //   }
    //   return true
    // })
    // if (!filteredObjects.length) {
    //   return
    // }
    // if (filteredObjects.length === 1) {
    //   this.canvas.setActiveObject(filteredObjects[0])
    //   this.canvas.renderAll()
    //   return
    // }
    // const activeSelection = new fabric.ActiveSelection(filteredObjects, {
    //   canvas: this.canvas,
    //   ...this.activeSelectionOption,
    // })
    // this.canvas.setActiveObject(activeSelection)
    // this.canvas.renderAll()
  }
}

export default ObjectHandler
