import { hasChineseFont } from './fontHelper'
import convert from 'color-convert'
import { isArray } from 'lodash-es'

import { Layer, ColorType } from '@common/interfaces'

const rounding = (decimal: number) => {
  return Math.round(decimal * 100) / 100
}

const getColorData = (colorArr: number[] | undefined, type: ColorType): string => {
  if (!isArray(colorArr)) {
    return '#000'
  }

  if (type === 2) {
    const validArr = colorArr.slice(1).map(item => item * 100)
    if (validArr.length < 4) {
      console.error('***** must have four data')
      return '#000'
    }
    return '#' + convert['cmyk']?.hex(validArr as any)
  } else {
    return `rgba(${colorArr.slice(1).map(item => item * 255)},${colorArr[0]})`
  }
}

export const convertFontDataToFTextBoxData = (data: Layer) => {
  const { font, index, left, right, top, opacity } = data
  const {
    font_size,
    textAlign = 'center',
    line_height,
    color_type,
    color,
    text,
    writing_direction,
    transform,
    line_spacing = 0,
    show = {},
    stroke = '#fff',
    strokeWidth = 0,
  } = font

  const fill = getColorData(color, color_type)

  const { Angle = 0, Scale1 = 1, Scale2 = 1 } = transform
  const lineHeight = line_height > 10 ? 1.2 : line_height || 1
  const isVertical = writing_direction === 2
  const isContainChinese = hasChineseFont(text)

  // 对竖排做的定制化默认调整
  const fixLeft = isVertical ? right : left
  const fixAngle = isVertical ? Angle + 90 : Angle
  const fixTextAlign = isVertical ? 'left' : textAlign

  let font_name = font.font_name
  if (!font_name.includes('font')) {
    font_name = 'font130'
  }

  const textOptions = {
    left: fixLeft,
    top: top | 0,
    fontSize: font_size | 0,
    textAlign: fixTextAlign,
    centeredRotation: true,
    lineHeight,
    zIndex: index || 26,
    index: index,
    angle: fixAngle,
    fill: fill,
    fontFamily: font_name,
    charSpacing: line_spacing,
    scaleY: rounding(Scale1),
    scaleX: rounding(Scale2),
    name: data.name,
    opacity: opacity > 1 ? opacity / 255 : opacity,
    show,
    stroke,
    strokeWidth,
  }

  let fText = text && text.trim()
  fText = fText.replace('\u0000', '')
  fText = fText && fText.replace('\n', '\r')

  return { textOptions, text: fText, isVertical, isContainChinese }
}

export const getFontData = (layer: Layer) => {
  const { font, left, right, top } = layer
  const { font_size, textAlign = 'center', text } = font

  let fText = text && text.trim()
  fText = fText.replace('\u0000', '')
  fText = fText && fText.replace('\n', '\r')

  const options = {
    type: 'Textarea',
    width: right - left,
    left,
    top,
    metadata: {
      fontWeight: 700,
      fontFamily: 'Lexend',
      textAlign,
      fontSize: font_size,
      value: fText,
    },
  }

  return options
}

export const getImageData = (layer: Layer) => {
  const { left, right, top, url } = layer

  const options = {
    type: 'StaticImage',
    width: right - left,
    left,
    top,
    metadata: {
      src: url,
    },
  }

  return options
}
