import { fabric } from 'fabric'
import { ObjectType, SCALE_FACTOR } from '../common/constants'
import { loadImageFromURL } from './image-loader'
import isNaN from 'lodash/isNaN'

class ObjectToFabric {
  async run(item, options) {
    let object
    switch (item.type) {
      case ObjectType.TEXTAREA:
        object = await this.staticText(item, options)
        break
      case ObjectType.STATIC_IMAGE:
        object = await this.staticImage(item, options)
        break
      case ObjectType.STATIC_VECTOR:
        object = await this.staticVector(item, options)
        break
    }

    return object
  }

  staticText(item, options) {
    return new Promise((resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item, options)
        const metadata = item.metadata
        const { textAlign, fontFamily, fontSize, fontWeight, charSpacing, lineheight, value } = metadata
        const textOptions = {
          ...baseOptions,
          text: value ? value : 'Default Text',
          ...(textAlign && { textAlign }),
          ...(fontFamily && { fontFamily }),
          ...(fontSize && { fontSize: SCALE_FACTOR * fontSize }),
          ...(fontWeight && { fontWeight }),
          ...(charSpacing && { charSpacing }),
          ...(lineheight && { lineheight }),
        }
        const element = new fabric.Textarea(textOptions)

        const { top, left, width, height } = element

        if (isNaN(top) || isNaN(left)) {
          element.set({
            top: options.top + options.height / 2 - height / 2,
            left: options.left + options.width / 2 - width / 2,
          })
        }

        resolve(element)
      } catch (err) {
        reject(err)
      }
    })
  }

  staticImage(item, options) {
    return new Promise(async (resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item, options)
        const src = item.metadata.src
        const image = await loadImageFromURL(src)

        const { width, height } = baseOptions
        if (!width || !height) {
          baseOptions.width = image.width
          baseOptions.height = image.height
        }

        const element = new fabric.StaticImage(image, baseOptions)

        const { top, left } = element

        if (isNaN(top) || isNaN(left)) {
          element.set({
            top: options.top,
            left: options.left,
          })
          element.scaleToWidth(320)
        }
        resolve(element)
      } catch (err) {
        reject(err)
      }
    })
  }

  staticVector(item, options) {
    return new Promise(async (resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item, options)
        const src = item.metadata.src

        fabric.loadSVGFromURL(src, (objects, opts) => {
          const { width, height, top, left } = baseOptions
          if (!width || !height) {
            baseOptions.width = opts.width
            baseOptions.height = opts.height
          }
          const object = fabric.util.groupSVGElements(objects, opts)

          if (isNaN(top) || isNaN(left)) {
            object.set({
              top: options.top,
              left: options.left,
            })
            object.scaleToWidth(320)
          }
          resolve(object)
        })
      } catch (err) {
        reject(err)
      }
    })
  }

  getBaseOptions(item, options) {
    const { left, top, width, height, scaleX, scaleY } = item
    let metadata = item.metadata ? item.metadata : {}
    const { fill, angle, originX, originY } = metadata
    let baseOptions = {
      angle: angle ? angle : 0,
      top: options.top + top * SCALE_FACTOR,
      left: options.left + left * SCALE_FACTOR,
      width: width * SCALE_FACTOR,
      height: height * SCALE_FACTOR,
      originX: originX || 'left',
      originY: originY || 'top',
      scaleX: scaleX || 1,
      scaleY: scaleY || 1,
      fill: fill || '#000000',
      metadata: metadata,
    }
    return baseOptions
  }
}

export default new ObjectToFabric()
