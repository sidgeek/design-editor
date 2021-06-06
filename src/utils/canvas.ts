import { fabric } from 'fabric'

export const CanvasObjects = {
  path: {
    create: (options: any) => Promise.resolve<fabric.Object>(new fabric.Path(options.path)),
  },
  image: {
    create: (options: any) => {
      return new Promise<fabric.Object>(resolve => {
        fabric.Image.fromURL(
          options.url,
          image => {
            resolve(image)
          },
          { crossOrigin: 'Anonymous' }
        )
      })
    },
  },
  svg: {
    create: (options: any) => {
      return new Promise<fabric.Object>(resolve => {
        fabric.loadSVGFromURL(options.url, (objects, options) => {
          const object = fabric.util.groupSVGElements(objects, options)
          resolve(object)
        })
      })
    },
  },
  textbox: {
    create: (options: any) => {
      const { text, ...textOptions } = options
      return Promise.resolve<fabric.Textbox>(new fabric.Textbox(text, textOptions))
    },
  },
}
