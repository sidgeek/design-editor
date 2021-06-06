import { useCanvasContext } from '@/hooks'
import DefaultToolbox from './DefaultToolbox/DefaultToolbox'
import TextToolbox from './TextToolbox/TextToolbox'
import PreviewsToolbox from './PreviewsToolbox'

function Toolbox() {
  const { activeObject, canvasType } = useCanvasContext()

  if (canvasType === 'previews') {
    return <PreviewsToolbox />
  }
  if (!activeObject) {
    return <DefaultToolbox />
  }
  const activeObjectType = activeObject.type

  return <div>{activeObjectType === 'textbox' ? <TextToolbox /> : <DefaultToolbox />}</div>
}

export default Toolbox
