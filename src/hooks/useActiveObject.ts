import { Context } from '@contexts/canvas'
import { useContext } from 'react'

function useActiveObject<T>() {
  const { activeObject } = useContext(Context)
  return (activeObject as unknown) as T
}

export default useActiveObject
