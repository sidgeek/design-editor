import { useState } from 'react'

function LayersPanel() {
  const [layers] = useState([])

  return (
    <>
      <div style={{ padding: '2rem 2rem 1rem' }}>
        <div style={{ display: 'grid', gap: '0.6rem', color: 'rgba(255,255,255,0.1)' }}>
          {layers.map(layer => {
            return (
              <div
                style={{
                  color: '#ffffff',
                  background: 'rgba(255,255,255,0.1)',
                  height: '52px',
                  alignItems: 'center',
                  display: 'flex',
                  paddingLeft: '1rem',
                }}
              >
                {layer.type}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
export default LayersPanel
