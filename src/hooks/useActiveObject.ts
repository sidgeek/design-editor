import { Context } from '@contexts/canvas'
import { useContext } from 'react'

function useActiveObject() {
  const { activeObject } = useContext(Context)
  return activeObject
}

export default useActiveObject
