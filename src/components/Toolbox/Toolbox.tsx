import { useCanvasContext } from '@/hooks'
import DefaultToolbox from './DefaultToolbox/DefaultToolbox'
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

  return <div>{activeObjectType === 'textbox' ? <DefaultToolbox /> : <DefaultToolbox />}</div>
}

export default Toolbox
