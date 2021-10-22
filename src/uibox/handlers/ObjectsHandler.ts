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
   * Get all canvas objects
   */
  getObjects() {
    return this.canvas.getObjects()
  }
}

export default ObjectHandler
