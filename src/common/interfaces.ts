import { fabric } from 'fabric'

interface BaseObject {
  id: string
  name: string
  description?: string
}
export type FabricRect = fabric.Rect & BaseObject
export type FabricCircle = fabric.Circle & BaseObject
export type FabricTriangle = fabric.Triangle & BaseObject
export type FabricObject = fabric.Object & BaseObject
export type FabricObjects = FabricObject | FabricRect | FabricCircle | FabricTriangle

export type FabricRectOptions = fabric.IRectOptions & BaseObject
export type FabricCircleOptions = fabric.ICircleOptions & BaseObject
export type FabricTriangleOptions = fabric.ITriangleOptions & BaseObject
export type FabricObjectOptions = fabric.IObjectOptions & BaseObject

export type FabricObjectsOptions = FabricObjectOptions | FabricRect | FabricCircle | FabricTriangle

// CONTEXT TYPES

export type CanvasType = 'editor' | 'previews'
export type ToolboxType = 'textbox' | 'image' | 'previews' | 'default'
export type ContextMenuType = 'canvas' | 'object'
export interface ContextMenu {
  type: ContextMenuType
  visible: boolean
  top: number
  left: number
}

// template data
export type ColorType = 0 | 1 | 2 | 3 | 4
interface Transform {
  Angle: number
  MoveX: number
  MoveY: number
  Scale1: number
  Scale2: number
}
export interface Font {
  font_size: number
  font_name: string
  textAlign: 'center' | 'left' | 'right'
  line_height: number
  color_type: ColorType
  color: number[] | undefined
  text: string
  transform: Transform
  line_spacing: number
  show: object
  stroke: string
  strokeWidth: number
  writing_direction: 0 | 2 // 0: 横排, 2: 竖排
}
export interface Layer {
  bottom: number
  top: number
  right: number
  left: number
  font: Font
  is_font: boolean
  name: string
  opacity: number
  path: string
  index: number
}

interface Head {
  width: number
  height: number
  dpi: number
}
export interface TemplateData {
  others: {
    id: number
    created_at: number
    dispatch_status: number
    editor_uid: number
    height: number
    width: number
    is_display: number
    is_reject: number
    kewords: string
    path: string
    pid: number
    source: number
    status: number
    title: string
    update_at: number
  }
  data: {
    head: Head
    layer: { [key: number]: Layer }
  }
}
