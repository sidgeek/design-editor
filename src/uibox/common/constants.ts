export const PROPERTIES_TO_INCLUDE = ['id', 'name', 'description']
export const SCALE_FACTOR = 0.4
export const FONT_SCALE_FACTOR = 0.675

export const CANVAS_ZOOM_MAX_VALUE = 300
export const CANVAS_ZOOM_MIN_VALUE = 10

export const FRAME_INIT_WIDTH = 2000
export const FRAME_INIT_HEIGHT = 3000
export const FRAME_BORDER_STROKE_WIDTH = 5

export enum ObjectType {
  STATIC_VECTOR = 'StaticVector',
  STATIC_IMAGE = 'StaticImage',
  DYNAMIC_IMAGE = 'DynamicImage',
  TEXTAREA = 'Textarea',
}

export enum ObjectTypeAlt {
  STATIC_IMAGE = 'image:static',
  DYNAMIC_IMAGE = 'image:dynamic',
  TEXTAREA = 'Textarea',
}
