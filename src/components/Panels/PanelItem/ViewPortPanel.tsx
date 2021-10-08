import { useCanvasViewPortData } from '@common/hooks/useCanvasViewPortData'

function ViewPortPanel() {
  const { viewPort } = useCanvasViewPortData()
  const { zoom, top, left, height, width } = viewPort

  return (
    <div>
      <div style={{ color: 'white' }}>
        <div> zoom: {zoom}</div>
        <div> viewport top: {top}</div>
        <div> viewport left: {left}</div>
        <div> viewport height: {height}</div>
        <div> viewport width: {width}</div>
      </div>
      <div>
        <div> Alignment lines (green) {}</div>
        <div> Horizontal: {}</div>
        <div> Vertical: {}</div>
      </div>
      <div>
        <div> Canvas-center lines (purple) {}</div>
        <div> Horizontal: {}</div>
        <div> Vertical: {}</div>
      </div>
    </div>
  )
}
export default ViewPortPanel
