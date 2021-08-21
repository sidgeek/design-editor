import { fabric } from 'fabric'

export class TextareaObject extends fabric.Textbox {
  static type = 'Textarea'

  initialize(options: TextareaOptions) {
    const { text, ...textOptions } = options
    //@ts-ignore
    super.initialize(text, textOptions)

    return this
  }
  toObject(propertiesToInclude = []) {
    return super.toObject(propertiesToInclude)
  }
  toJSON(propertiesToInclude = []) {
    return super.toObject(propertiesToInclude)
  }
  static fromObject(options: TextareaOptions, callback: Function) {
    return callback && callback(new fabric.Textarea(options))
  }
}

fabric.Textarea = fabric.util.createClass(TextareaObject, {
  type: TextareaObject.type,
})
fabric.Textarea.fromObject = TextareaObject.fromObject

export type TextareaOptions = fabric.ITextboxOptions & { text: string }

declare module 'fabric' {
  namespace fabric {
    class Textarea extends TextareaObject {
      constructor(options: TextareaOptions)
    }
  }
}
