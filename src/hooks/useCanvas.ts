import { Context } from '@contexts/canvas'
import { useContext } from 'react'

function useCanvasContext() {
  const { canvas } = useContext(Context)
  return canvas
}

export default useCanvasContext
